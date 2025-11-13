<!DOCTYPE html>
@php use Illuminate\Support\Facades\Auth; @endphp
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="csrf-token" content="{{ csrf_token() }}">
<title>Dashboard Taskovia</title>
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" />
<!-- JQUERY -->
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- CSS dashboard -->
<link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
<link rel="stylesheet" href="{{ asset('css/notifications.css') }}">
</head>
<body>
  <header class="navbar">
    <!-- Logo -->
    <div class="navbar-left">
      <img src="{{ asset('images/Logo.svg') }}" alt="Taskovia" class="logo-img" />
    </div>
  
    <!-- Centre : Avatar + Bonjour/Nom + Admin -->
    <div class="navbar-center">
      <img src="{{ asset(Auth::user()->avatar ?? 'images/flaticon.png') }}" class="avatar" alt="Avatar"/>
      <div class="user-block">
        <div class="bonjour">Bonjour,</div>
        <div class="nom">{{ Auth::user()->name }}</div>
      </div>
      <div class="role">Admin</div>
    </div>
  
    <!-- Droite : Paramètres + Déconnexion -->
    <div class="navbar-right">
      <a href="{{ route('user.settings') }}" class="btn-settings">
        <i class="bi bi-gear-fill"></i>
      </a>
      <form class="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
      @csrf
      </form>

      <!-- Bouton de déconnexion -->
      <button class="btn-logout">Déconnexion</button>
    </div>
  </header>

  <!-- Notification tâches validées ou erreurs -->
  <div id="notification" class=""></div>

  <!-- Barres d'actions -->
  <section class="actions-bar">
    <button class="btn-nouvelle">+ Nouvelle tâche</button>
    <div id="nouvelle-tache-form" style="display:none;">
      <input type="text" id="tache-nom" placeholder="Nom de la tâche" />
      
      <select id="tache-priorite">
        <option value="haute">Haute</option>
        <option value="moyenne">Moyenne</option>
        <option value="basse">Basse</option>
      </select>

      <input type="date" id="tache-ech" />

      <!-- Champ pour joindre des fichiers -->
      <input type="file" id="tache-fichiers" multiple />

      <button id="valider-tache">Ajouter</button>
    </div>

    <div class="search-box">
      <i class="bi bi-search"></i>
      <input type="text" placeholder="Rechercher..." id="search-projects" />
    </div>
  </section>

  <!-- Filtres -->
  <section class="filters">
    <div>Priorité :</div>
    <select name="priority" id="priority">
      <option value="">-- Tous --</option>
      <option value="asc">Haute à Basse</option>
      <option value="desc">Basse à Haute</option>
    </select>
    <div>Échéance :</div>
    <select name="tri-ech" id="tri-ech">
      <option value="">-- Tous --</option>
      <option value="asc">Plus proche</option>
      <option value="desc">Plus tard</option>
    </select>
  </section>

  <!-- Liste des tâches -->
  <section class="task-list">
    <table id="tableau-taches">
      <thead>
        <tr>
          <th>Tâche</th>
          <th>Statut</th>
          <th>Priorité</th>
          <th>Échéance</th>
          <th>Fichiers joints</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Contenu dynamique des tâches -->
      </tbody>
    </table>
  </section>

    <!-- Modal Supprimer -->
  <div id="confirmationModal" class="modal" style="display:none;">
    <div class="modal-content">
      <p>Voulez-vous vraiment supprimer cette tâche ?</p>
      <button id="btnCancel">Annuler</button>
      <button id="btnConfirm">Confirmer</button>
    </div>
  </div>

    <!-- Modal Modifier -->
  <div id="modifyModal" class="modal" style="display:none;">
    <div class="modal-content" style="max-width: 400px;">
      <h5>Modifier la tâche</h5>
      <input type="hidden" id="modify-task-id" />

      <label for="modify-ech">Échéance :</label>
      <input type="date" id="modify-ech" />

      <label for="modify-statut">Statut :</label>
      <select id="modify-statut">
        <option value="en_cours">En cours <span class="icon"><i class="bi bi-gear"></i></span></option>
        <option value="en_attente">En attente <span class="icon"><i class="bi bi-question"></i></span></option>
        <option value="termine">Terminé <span class="icon"><i class="bi bi-check-lg"></i></span></option>
        <option value="annule">Annulé <span class="icon"><i class="bi bi-x-lg"></i></span></option>
      </select>

      <label for="modify-priorite">Priorité :</label>
      <select id="modify-priorite">
        <option value="haute">Haute <i class="bi bi-arrow-up-circle" style="color:red"></i></option>
        <option value="moyenne">Moyenne <i class="bi bi-arrow-right-circle" style="color:orange"></i></option>
        <option value="basse">Basse <i class="bi bi-arrow-down-circle" style="color:blue"></i></option>
      </select>

      <!-- Champ pour modifier fichiers -->
      <label for="modify-fichiers" style="margin-top:10px;">Modifier fichiers :</label>
      <input type="file" id="modify-fichiers" multiple style="margin-top:5px; max-width:100%;"/>

      <div style="margin-top:10px; display:flex; justify-content: space-between;">
        <button id="save-modif" class="btn btn-primary btn-sm">Enregistrer</button>
        <button id="cancel-modif" class="btn btn-secondary btn-sm">Annuler</button>
      </div>
      <div style="margin-top:10px; font-size:0.9em; color:#555;">
        <p><strong>Explication des statuts :</strong></p>
        <p style="margin:0;"><i class="bi bi-gear-fill" style="margin-right:5px;"></i>En cours — La tâche est en traitement.</p>
        <p style="margin:0;"><i class="bi bi-question-lg" style="margin-right:5px;"></i>En attente — La tâche attend une action.</p>
        <p style="margin:0;"><i class="bi bi-check2-square" style="margin-right:5px;"></i>Terminé — La tâche est complétée.</p>
        <p style="margin:0;"><i class="bi bi-x-lg" style="margin-right:5px;"></i>Annulé — La tâche est annulée.</p>
      </div>
    </div>
  </div>

  <!-- Modal Aperçu du fichier -->
  <div class="modal fade" id="filePreviewModal" tabindex="-1" aria-labelledby="filePreviewModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title" id="filePreviewModalLabel">Aperçu du fichier</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
        </div>

        <div class="modal-body">
          <!-- Contenu de l'aperçu -->
          <iframe id="filePreview" style="border:none; display: none;"></iframe>
          <img id="imagePreview" style="max-width: 100%; max-height: 80vh; display: none;" />
          <p id="noPreviewMessage" style="display:none;">Fichier non prévisualisable.</p>
        </div>

        <div class="modal-footer">
          <a id="downloadLink" class="btn btn-primary" href="#" target="_blank" download>Télécharger</a>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
        </div>

      </div>
    </div>
  </div>



  <div id="overlay-parametres"></div>

  <form id="logout-form" method="POST" action="{{ route('logout') }}" style="display: none;">
  @csrf
  </form>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script>  const imageBasePath = "{{ asset('images') }}/";</script>
  <script src="{{ asset('js/dashboard.js') }}"></script>
</body>
</html>