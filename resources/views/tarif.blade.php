@extends('layouts.app')

@section('content')
<section class="pricing-section">
    <div class="container-fluid">
      <div class="pricing-wrapper">
  
        <!-- Carte Gratuit -->
        <div class="pricing-card">
          <h3>Gratuit</h3>
          <p class="subtitle">L'essentiel pour les débutants</p>
          <ul class="features">
            <li><i class="bi bi-check-circle-fill"></i> 1 Utilisateur</li>
            <li><i class="bi bi-check-circle-fill"></i> Jusqu’à 5 tâches</li>
            <li><i class="bi bi-x-circle-fill"></i> Pas de Partage ou collaboration</li>
            <li><i class="bi bi-x-circle-fill"></i> Pas de statistiques</li>
            <li><i class="bi bi-check-circle-fill"></i> Accès sécurisé</li>
          </ul>
          <div class="price">0€ / mois</div>
          <button class="openInscription">Utiliser gratuitement</button>
        </div>
  
        <!-- Carte Équipe -->
        <div class="pricing-card">
          <h3>Équipe</h3>
          <p class="subtitle">Idéal pour les petites équipes</p>
          <ul class="features">
            <li><i class="bi bi-check-circle-fill"></i> Jusqu’à 3 utilisateurs</li>
            <li><i class="bi bi-check-circle-fill"></i> Tâches illimitées</li>
            <li><i class="bi bi-check-circle-fill"></i> Partage et collaboration</li>
            <li><i class="bi bi-check-circle-fill"></i> Attribution des tâches</li>
            <li><i class="bi bi-x-circle-fill"></i> Statistiques avancées</li>
          </ul>
          <div class="price">4.99€ / mois</div>
          <button class="OpenPayment" data-offer="equipe">Profitez de l’offre</button>
        </div>
  
        <!-- Carte Pro -->
        <div class="pricing-card">
          <h3>Pro</h3>
          <p class="subtitle">Parfait pour les professionnels</p>
          <ul class="features">
            <li><i class="bi bi-check-circle-fill"></i> Utilisateurs illimités</li>
            <li><i class="bi bi-check-circle-fill"></i> Tâches illimitées</li>
            <li><i class="bi bi-check-circle-fill"></i> Gestion d’équipe avancée</li>
            <li><i class="bi bi-check-circle-fill"></i> Statistiques & rapports</li>
            <li><i class="bi bi-check-circle-fill"></i> Support prioritaire</li>
          </ul>
          <div class="price">9.99€ / mois</div>
          <button class="OpenPayment" data-offer="pro">Passer au Pro</button>
        </div>
  
      </div>
    </div>
  </section>

@endsection