<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tache;
use App\Models\Fichier;
use Illuminate\Support\Facades\Storage;

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

    // Récupérer les fichiers d’une tâche
    public function fichiers()
    {
        return $this->hasMany(Fichier::class);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'priorite' => 'required|in:haute,moyenne,basse',
            'echeance' => 'nullable|date',
            'fichiers.*' => 'file|max:10240' // chaque fichier ≤ 10 Mo
        ]);
    
        // Création de la tâche
        $tache = Tache::create([
            'nom' => $request->nom,
            'priorite' => $request->priorite,
            'statut' => 'en_cours',
            'echeance' => $request->echeance,
            'user_id' => auth()->id()
        ]);
    
        // Sauvegarde des fichiers s’il y en a
        if ($request->hasFile('fichiers')) {
            foreach ($request->file('fichiers') as $fichier) {
                $path = $fichier->store('uploads/taches', 'public');
    
                Fichier::create([
                    'tache_id' => $tache->id,
                    'nom' => $fichier->getClientOriginalName(),
                    'chemin' => $path
                ]);
            }
        }
        $tache->load('fichiers');
        return response()->json($tache, 201);
    }

    public function update(Request $request, $id)
    {
        $tache = Tache::where('id', $id)
                    ->where('user_id', auth()->id())
                    ->firstOrFail();

        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'priorite' => 'sometimes|in:haute,moyenne,basse',
            'statut' => 'sometimes|in:en_cours,en_attente,termine,annule',
            'echeance' => 'sometimes|date',
            'fichiers.*' => 'sometimes|file|max:10240'
        ]);

        // Mettre à jour la tâche avec les champs validés
        $tache->update($validated);

        // Si des fichiers sont envoyés, on supprime d’abord les anciens liés à cette tâche
        if ($request->hasFile('fichiers')) {
            foreach ($tache->fichiers as $ancienFichier) {
                // Supprimer dans le stockage via le chemin stocké dans DB
                \Storage::disk('public')->delete($ancienFichier->chemin);
                // Supprimer la ligne dans la base
                $ancienFichier->delete();
            }

            // Ajouter les nouveaux fichiers
            foreach ($request->file('fichiers') as $fichier) {
                $path = $fichier->store('uploads/taches', 'public');

                \App\Models\Fichier::create([
                    'tache_id' => $tache->id,
                    'nom' => $fichier->getClientOriginalName(),
                    'chemin' => $path
                ]);
            }
        }
        // Si pas de fichiers, on ne touche pas aux fichiers existants

        $tache->load('fichiers');

        return response()->json($tache);
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