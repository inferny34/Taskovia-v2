<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_id
 * @property string $nom
 * @property string $priorite
 * @property string $statut
 * @property string $echeance
 */
class Tache extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'nom', 'priorite', 'statut', 'echeance'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function fichiers()
    {
        return $this->hasMany(Fichier::class);
    }
}