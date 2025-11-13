<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('fichiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tache_id')->constrained('taches')->onDelete('cascade');
            $table->string('nom'); // nom du fichier ou son nom d'origine
            $table->string('chemin'); // chemin du fichier (dans /storage/app/...)
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fichiers');
    }
};
