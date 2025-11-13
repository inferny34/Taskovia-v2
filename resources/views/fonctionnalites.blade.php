@extends('layouts.app')

@section('content')
<section class="intro">
    <div class="container">
    <h1>Découvrez les fonctionnalités qui simplifient votre gestion de projet</h1>
    <p>Simplifiez votre gestion de projet et atteignez vos objectifs avec Taskovia. Découvrez des outils intuitifs pour l'organisation, la collaboration et le suivi de vos tâches</p>
    <button type="button" class="openInscription">Démarrez gratuitement</button>
    </div>
</section>
<section class="fonction-1">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2>Gestion des tâches : </h2>
                <ul>
                    <li>Création et modification de tâches</li>
                    <li>Attribution des tâches</li>
                    <li>Définition des priorités et des échéances</li>
                    <li>Suivi de l'avancement des tâches</li>
                    <li>Gestion de statuts</li>
                </ul>
            </div>
            <div class="col-md-6">
                <img src="{{ asset('images/fonctionnalité-1.png') }}" alt="Image Fonctionnalités n°1">
            </div>
        </div>
    </div>
</section>
<section class="fonction-2">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img src="{{ asset('images/fonctionnalité-2.png') }}" alt="Image Fonctionnalités n°2">
            </div>
            <div class="col-md-6">
                <h2>Collaboration en équipe : </h2>
                <ul>
                    <li>Partage des tâches</li>
                    <li>Commentaires et discussions</li>
                    <li>Nofifications en temps réel</li>
                    <li>Gestion des membres de l'équipe</li>
                    <li>Partage de fichiers</li>
                </ul>
            </div>
        </div>
    </div>
</section>
<section class="fonction-3">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2>Gestion des projets : </h2>
                <ul>
                    <li>Création et modification des projets</li>
                    <li>Definition des objectifs et des jalons</li>
                    <li>Suivi de l'avancement des projets</li>
                    <li>Gestion des budgets</li>
                    <li>Rapport et statistiques</li>
                </ul>
            </div>
            <div class="col-md-6">
                <img src="{{ asset('images/fonctionnalité-3.png') }}" alt="Image Fonctionnalités n°3">
            </div>
        </div>
    </div>
</section>
<section class="fonction-4">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img src="{{ asset('images/fonctionnalité-4.png') }}" alt="Image Fonctionnalités n°4">
            </div>
            <div class="col-md-6">
                <h2>Organisation : </h2>
                <ul>
                    <li>Catégorisation des tâches et des projets</li>
                    <li>gestion des étiquettes et des tags</li>
                    <li>Calendrier et vue d'ensemble</li>
                    <li>Filtres et tris avancés</li>
                </ul>
            </div>
        </div>
    </div>
</section>

@endsection