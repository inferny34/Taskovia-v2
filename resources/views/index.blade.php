@extends('layouts.app')

@section('content')
<section class="hero">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img src="{{ asset('images/index-1.png') }}" alt="Image d'acceuil n°1">
            </div>
            <div class="col-md-6">
                <h2>Taskovia : Maîtrisez vos projets, collaborez en équipe, atteignez vos objectifs. Voila comment ça fonctionne</h2>
                <p>Organisez vos tâches, centralisez vos informations et suivez vos progrès en temps réel. Taskovia vous offre les outils dont vous avez besoin pour une gestion de projet efficace et une collaboration fluide.</p>
                <button type="button" class="openConnect">Démarrez gratuitement</button>
            </div>
        </div>
    </div>
</section>

<section class="features">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2>Gagnez en productivité et simplifiez votre gestion de projet avec Taskovia.</h2>
                <p>Dites adieu aux tâches éparpillées et aux informations perdues. Avec Taskovia, vous avez une vue d'ensemble claire de tous vos projets et pouvez collaborer avec votre équipe en toute simplicité.</p>
                <a href="{{ url('/tarif') }}" class="bouton">Essayez Taskovia dès maintenant</a>
            </div>
            <div class="col-md-6">
                <img src="{{ asset('images/index-2.png') }}" alt="Image d'acceuil n°2">
            </div>
        </div>
    </div>
</section>

<section class="transform">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img src="{{ asset('images/index-3.png') }}" alt="Image d'acceuil n°3">
            </div>
            <div class="col-md-6">
                <h2>Transformez votre façon de travailler avec Taskovia.</h2>
                <p>Taskovia est plus qu'une simple application de gestion de projet. C'est un outil puissant qui vous aide à organiser vos idées, à collaborer avec votre équipe et à concrétiser vos projets les plus ambitieux.</p>
                <a href="{{ url('/fonctionnalites') }}" class="bouton">Découvrez Taskovia</a>
            </div>
        </div>
    </div>
</section>

<section class="simple">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <h2>Taskovia : La gestion de projet simple et efficace.</h2>
                <p>Pas de complications, pas de fonctionnalités inutiles. On vous offre les outils essentiels pour organiser vos tâches, collaborer avec votre équipe et suivre vos progrès.</p>
                <a href="{{ url('/tarif') }}" class="bouton">c'est parti !</a>
            </div>
            <div class="col-md-6">
                <img src="{{ asset('images/index-4.png') }}" alt="Image d'acceuil n°4">
            </div>
        </div>
    </div>
</section>

@endsection