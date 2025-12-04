<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tache;
use App\Models\Fichier;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Requests\StoreTacheRequest;
use App\Http\Requests\UpdateTacheRequest;

class TacheController extends Controller
{
    public function index(Request $request)
    {
        $query = Tache::where('user_id', auth()->id());

        // Recherche dynamique
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where('nom', 'like', "%$search%");
        }

        // Tri dynamique
        $sortBy = $request->get('tri', 'created_at');
        $order = $request->get('order', 'asc');

        // Vérifier si les paramètres de tri sont valides
        if (in_array($sortBy, ['priorite', 'echeance', 'nom', 'statut']) && in_array($order, ['asc', 'desc'])) {
            $query->orderBy($sortBy, $order);
        }

        $taches = $query->with('fichiers')->get();

        return response()->json($taches);
    }

    public function store(StoreTacheRequest $request)
    {
        try {
            // Création de la tâche avec données validées
            $tache = Tache::create([
                'nom' => $request->nom,
                'priorite' => $request->priorite,
                'statut' => 'en_cours',
                'echeance' => $request->echeance,
                'user_id' => auth()->id()
            ]);

            // Sauvegarde des fichiers s'il y en a
            if ($request->hasFile('fichiers')) {
                foreach ($request->file('fichiers') as $fichier) {
                    // Générer un nom unique pour éviter les collisions et améliorer la sécurité
                    $filename = Str::uuid() . '.' . $fichier->getClientOriginalExtension();
                    $path = $fichier->storeAs('uploads/taches', $filename, 'public');

                    Fichier::create([
                        'tache_id' => $tache->id,
                        'nom' => $fichier->getClientOriginalName(),
                        'chemin' => $path
                    ]);
                }
            }

            $tache->load('fichiers');
            return response()->json($tache, 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la création de la tâche: ' . $e->getMessage());
            return response()->json([
                'error' => 'Une erreur est survenue lors de la création de la tâche.'
            ], 500);
        }
    }

    public function update(UpdateTacheRequest $request, $id)
    {
        try {
            // Vérifier que la tâche appartient à l'utilisateur connecté
            $tache = Tache::where('id', $id)
                ->where('user_id', auth()->id())
                ->firstOrFail();

            // Mettre à jour la tâche avec les champs validés
            $tache->update($request->validated());

            // Si des fichiers sont envoyés, on supprime d'abord les anciens liés à cette tâche
            if ($request->hasFile('fichiers')) {
                foreach ($tache->fichiers as $ancienFichier) {
                    // Supprimer dans le stockage via le chemin stocké dans DB
                    Storage::disk('public')->delete($ancienFichier->chemin);
                    // Supprimer la ligne dans la base
                    $ancienFichier->delete();
                }

                // Ajouter les nouveaux fichiers avec noms uniques
                foreach ($request->file('fichiers') as $fichier) {
                    $filename = Str::uuid() . '.' . $fichier->getClientOriginalExtension();
                    $path = $fichier->storeAs('uploads/taches', $filename, 'public');

                    Fichier::create([
                        'tache_id' => $tache->id,
                        'nom' => $fichier->getClientOriginalName(),
                        'chemin' => $path
                    ]);
                }
            }
            // Si pas de fichiers, on ne touche pas aux fichiers existants

            $tache->load('fichiers');

            return response()->json($tache);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'Tâche non trouvée ou accès non autorisé.'
            ], 404);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de la mise à jour de la tâche: ' . $e->getMessage());
            return response()->json([
                'error' => 'Une erreur est survenue lors de la mise à jour de la tâche.'
            ], 500);
        }
    }

    public function destroy($id)
    {
        $tache = Tache::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $tache->delete();

        return response()->json(null, 204);
    }
}