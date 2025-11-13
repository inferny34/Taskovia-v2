<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fichier extends Model
{
    use HasFactory;

    protected $fillable = ['tache_id', 'nom', 'chemin'];

    public function tache()
    {
        return $this->belongsTo(Tache::class);
    }
}
