<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTacheRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization handled by middleware
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'sometimes|string|max:255',
            'priorite' => 'sometimes|in:haute,moyenne,basse',
            'statut' => 'sometimes|in:en_cours,en_attente,termine,annule',
            'echeance' => 'sometimes|date|after_or_equal:today',
            'fichiers.*' => [
                'sometimes',
                'file',
                'max:10240', // 10 MB max par fichier
                'mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png,webp,gif',
                'mimetypes:application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png,image/webp,image/gif',
                function ($attribute, $value, $fail) {
                    // Vérification anti-spoofing
                    $extension = strtolower($value->getClientOriginalExtension());
                    $mimeType = $value->getMimeType();

                    $allowedMimes = [
                        'pdf' => 'application/pdf',
                        'doc' => 'application/msword',
                        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'xls' => 'application/vnd.ms-excel',
                        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        'jpg' => 'image/jpeg',
                        'jpeg' => 'image/jpeg',
                        'png' => 'image/png',
                        'webp' => 'image/webp',
                        'gif' => 'image/gif',
                    ];

                    if (!isset($allowedMimes[$extension]) || $allowedMimes[$extension] !== $mimeType) {
                        $fail("Le fichier {$value->getClientOriginalName()} n'est pas valide (extension/type MIME incompatibles).");
                    }
                },
            ],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nom.string' => 'Le nom de la tâche doit être du texte.',
            'nom.max' => 'Le nom de la tâche ne peut pas dépasser 255 caractères.',
            'priorite.in' => 'La priorité doit être haute, moyenne ou basse.',
            'statut.in' => 'Le statut doit être en_cours, en_attente, termine ou annule.',
            'echeance.date' => 'L\'échéance doit être une date valide.',
            'echeance.after_or_equal' => 'L\'échéance ne peut pas être dans le passé.',
            'fichiers.*.file' => 'Le fichier uploadé n\'est pas valide.',
            'fichiers.*.max' => 'Chaque fichier ne peut pas dépasser 10 MB.',
            'fichiers.*.mimes' => 'Les fichiers doivent être de type: pdf, doc, docx, xls, xlsx, jpg, jpeg, png, webp, gif.',
        ];
    }
}
