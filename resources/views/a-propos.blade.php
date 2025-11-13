@extends('layouts.app')

@section('content')
<section class="about-section">
    <div class="container text-center">
        <h1 class="mb-4">À propos de Taskovia</h1>
    
        <div class="screenshot-wrapper mb-4">
          <img src="{{ asset('images/Dashboard.png') }}" alt="Présentation Taskovia" class="img-fluid shadow rounded">
        </div>
    
        <p class="lead mb-5">
          <strong>Taskovia</strong> est une application web collaborative de gestion de tâches, conçue pour simplifier le quotidien des utilisateurs comme des équipes.  
          Ce projet a été réalisé dans le cadre de ma formation de <strong>développeur web full stack</strong>, avec pour objectif : une interface intuitive, moderne et efficace.
        </p>
  
      <div class="row mb-5">
        <div class="col-md-6 order-md-2">
          <img src="{{ asset('images/ordi.jpg') }}" alt="Développement" class="img-fluid rounded shadow">
        </div>
        <div class="col-md-6 d-flex align-items-center">
          <div>
            <h3>Mon parcours</h3>
            <p>
              Je m'appelle <strong>Nicolas Roques</strong>, et je me reconvertis dans le développement web.  
              Taskovia m’a permis de mettre en pratique les compétences acquises, de la conception de base de données jusqu’à l’intégration dynamique avec <strong>Laravel</strong> et <strong>jQuery</strong>.
            </p>
          </div>
        </div>
      </div>
  
      <div class="row mb-5">
        <div class="col-md-12">
          <h3 class="text-center">Technologies utilisées</h3>
          <ul class="tech-list d-flex flex-wrap justify-content-center mt-3">
            <li>HTML5</li>
            <li>CSS3 / Bootstrap</li>
            <li>JavaScript / jQuery</li>
            <li>PHP / Laravel</li>
            <li>MySQL</li>
          </ul>
        </div>
      </div>
  
      <div class="quote text-center mt-5">
        <blockquote class="blockquote">
          <p class="mb-0">"La simplicité est la sophistication suprême."</p>
          <footer class="blockquote-footer">Léonard de Vinci</footer>
        </blockquote>
      </div>
    </div>
</section>

@endsection