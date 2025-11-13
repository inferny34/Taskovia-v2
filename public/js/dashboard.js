$(document).ready(function () {
  const csrfToken = $('meta[name="csrf-token"]').attr('content');

  function loadTasks() {
    console.log('Chargement des tâches...');
    $.ajax({
      url: '/taches',
      method: 'GET',
      success: data => {
        console.log('Données reçues:', data);
        const tbody = $('#tableau-taches tbody');
        tbody.empty();
  
        data.forEach(task => {
          // Vérifier si la tâche a des fichiers
          const fichiersHtml = task.fichiers && task.fichiers.length > 0
            ? task.fichiers.map(f => `<li><a href="/storage/${f.chemin}" target="_blank">${f.nom}</a></li>`).join('')
            : '';
  
          const row = `
            <tr data-id="${task.id}" data-priorite="${task.priorite}">
              <td>${task.nom}</td>
              <td class="statut" data-stat="${task.statut}">
                <i class="${getStatutIconClass(task.statut)}"></i>
              </td>
              <td class="priorite">${getPriorityIcon(task.priorite)}</td>
              <td class="echeance">${task.echeance}</td>
              <td class="fichiers"><ul>${fichiersHtml}</ul></td>
              <td>
                <button class="btn btn-sm btn-outline-primary btn-modify"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${task.id}"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          `;
          tbody.append(row);

        });
      },
      error: () => alert('Erreur de chargement des tâches')
    });
  }

  // Ajouter une nouvelle tâche avec fichiers
  $('#valider-tache').on('click', () => {
    const formData = new FormData();

    formData.append('nom', $('#tache-nom').val());
    formData.append('priorite', $('#tache-priorite').val());
    formData.append('statut', 'en_cours');
    formData.append('echeance', $('#tache-ech').val());

    const fichiers = $('#tache-fichiers')[0]?.files;
    if (fichiers && fichiers.length > 0) {
      for (let i = 0; i < fichiers.length; i++) {
        formData.append('fichiers[]', fichiers[i]);
      }
    }

    $.ajax({
      url: '/taches',
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': csrfToken },
      data: formData,
      processData: false, 
      contentType: false, 
      success: (task) => {
        let fichiersHtml = '';
      
        // Gestion des fichiers joints
        if (task.fichiers && task.fichiers.length > 0) {
          fichiersHtml = task.fichiers.map(fichier => `
            <li>
              <a href="/storage/${fichier.chemin}" target="_blank">${fichier.nom}</a>
            </li>
          `).join('');
        }
      
        const row = `
        <tr data-id="${task.id}">
          <td>${task.nom}</td>
          <td class="statut" data-stat="${task.statut}">
            <i class="${getStatutIconClass(task.statut)}"></i>
          </td>
          <td class="priorite">${getPriorityIcon(task.priorite)}</td>
          <td class="echeance">${task.echeance}</td>
          <td class="fichiers-joints"><ul>${fichiersHtml || ''}</ul></td>
          <td>
            <button class="btn btn-sm btn-outline-primary btn-modify"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${task.id}"><i class="bi bi-trash"></i></button>
          </td>
        </tr>`;
        
        $('table tbody').append(row);
        afficherNotification("Tâche ajoutée avec succès.", "success");

        // Réinitialiser les champs
        $('#tache-nom').val('');
        $('#tache-priorite').val('moyenne');
        $('#tache-ech').val('');
        $('#tache-fichiers').val(''); // ← reset fichiers
        $('#formulaire-ajout').removeClass('visible');
      },
      error: () => {
        afficherNotification("Erreur lors de l'ajout de la tâche.", "error");
      }
    });
  });

  // Modifier une tâche
  $('#save-modif').on('click', function () {

    const taskId = $('#modify-task-id').val();
    const newEcheance = $('#modify-ech').val();
    const newStatut = $('#modify-statut').val();
    const newPriorite = $('#modify-priorite').val();
    const newFichiers = $('#modify-fichiers')[0]?.files;

    // Valider les champs
    if (!taskId || !newEcheance || !newStatut || !newPriorite) {
      alert('Tous les champs doivent être remplis.');
      return;
    }
  
    const formData = new FormData();
    formData.append('_method', 'PUT'); // Ajout crucial pour que Laravel comprenne que c'est un PUT
    formData.append('echeance', newEcheance);
    formData.append('statut', newStatut);
    formData.append('priorite', newPriorite);
    formData.append('task_id', taskId);
  
    if (newFichiers && newFichiers.length > 0) {
      for (let i = 0; i < newFichiers.length; i++) {
        formData.append('fichiers[]', newFichiers[i]);
      }
    }
    
    // Envoi de la requête
    $.ajax({
      url: '/taches/' + taskId,
      type: 'POST',
      headers: { 'X-CSRF-TOKEN': csrfToken },
      data: formData,
      processData: false,
      contentType: false,
      success: () => {
        loadTasks();
        $('#modifyModal').css('display', 'none');
      },
      error: () => {
        alert('Erreur lors de la modification');
      },
      
    });
  });

  // Icône de statut
  function getStatutIconClass(statut) {
    switch (statut) {
      case 'en_attente':
        return 'bi bi-question-lg text-warning';
      case 'en_cours':
        return 'bi bi-gear-fill text-primary';
      case 'termine':
        return 'bi bi-check-circle text-success';
      case 'annule':
        return 'bi bi-x-circle text-danger';
      default:
        return 'bi bi-question-circle';
    }
  }

  // Icône de priorité
  function getPriorityIcon(priorite) {
    switch (priorite) {
      case 'haute':
        return `<img src="${imageBasePath}/haute.png" alt="Haute" class="priority-icon-img">`;
      case 'moyenne':
        return `<img src="${imageBasePath}/moyenne.png" alt="Moyenne" class="priority-icon-img">`;
      case 'basse':
        return `<img src="${imageBasePath}/basse.png" alt="basse" class="priority-icon-img">`;
      default:
        return '<i class="bi bi-question-circle-fill"></i>';
    }
  }

  // Initialiser l'affichage
  loadTasks();

    // Réaffichage du formulaire de création
    $('.btn-nouvelle').on('click', function () {
      $('#nouvelle-tache-form').toggle();
    });
  
    // Affichage du panneau d'options
    $('.btn-settings').on('click', function () {
      $('#options-overlay').toggleClass('show');
    });
  
    // Bouton déconnexion (redirige vers logout Laravel)
    $(document).ready(function () {
      $('.btn-logout').on('click', function (e) {
      e.preventDefault(); // Empêche le clic de rediriger ou recharger la page
      $('.logout-form').submit(); // Soumet le form caché via jQuery
      });
    });

    // Événement clic sur bouton modifier
    $(document).on('click', '.btn-modify', function () {
      console.log('Bouton de modification cliqué');
      const taskId = $(this).closest('tr').data('id');
      $('#modify-task-id').val(taskId);
      $('#modifyModal').css('display', 'flex'); // Afficher le modal personnalisé
    });

    // Modal de suppression
    let taskIdToDelete = null;

    // Quand on clique sur le bouton de suppression
    $(document).on('click', '.btn-delete', function () {
      taskIdToDelete = $(this).data('id'); // Récupère l'ID de la tâche depuis le bouton
      $('#confirmationModal').css('display', 'flex'); // Affiche le modal
    });

    // Bouton Annuler
    $('#btnCancel').on('click', function () {
      taskIdToDelete = null;
      $('#confirmationModal').hide(); // Ferme le modal
    });

    // Bouton Confirmer
    $('#btnConfirm').on('click', function () {
      if (!taskIdToDelete) return;

      $.ajax({
        url: '/taches/' + taskIdToDelete,
        method: 'DELETE',
        headers: { 'X-CSRF-TOKEN': csrfToken },
        success: function () {
          $('#confirmationModal').hide();
          taskIdToDelete = null;
          loadTasks(); // Recharge les tâches
        },
        error: function () {
          alert('Erreur lors de la suppression de la tâche.');
        }
      });
    });

    // Fermer le modal
    $('#cancel-modif').on('click', function() {
      $('#modifyModal').css('display', 'none');
    });

    // Tri des tâches
    function chargerTachesTriees(critere, ordre) {
      $.ajax({
        url: `/taches?tri=${critere}&ordre=${ordre}`,
        method: 'GET',
        success: (data) => {
          const tbody = $('#tableau-taches tbody');
          tbody.empty();
    
          data.forEach(task => {
            const fichiersHtml = task.fichiers && task.fichiers.length > 0
              ? task.fichiers.map(f =>
                  `<li><a href="/storage/${f.chemin}" target="_blank">${f.nom}</a></li>`
                ).join('')
              : '';
    
            const row = `
              <tr data-id="${task.id}">
                <td>${task.nom}</td>
                <td class="statut" data-stat="${task.statut}">
                  <i class="${getStatutIconClass(task.statut)}"></i>
                </td>
                <td class="priorite">${getPriorityIcon(task.priorite)}</td>
                <td class="echeance">${task.echeance}</td>
                <td class="fichiers"><ul>${fichiersHtml}</ul></td>
                <td>
                  <button class="btn btn-sm btn-outline-primary btn-modify"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${task.id}"><i class="bi bi-trash"></i></button>
                </td>
              </tr>`;
            tbody.append(row);
          });
        },
        error: () => alert('Erreur lors du tri des tâches.')
      });
    }
   
    // Fonction pour charger les tâches triées
    // Lorsqu'on change la priorité
    $('#priority').on('change', function () {
      const order = $(this).val();
      if (order) {
        chargerTachesTriees('priorite', order,);
      }
    });
    
    // Lorsqu'on change l’échéance
    $('#tri-ech').on('change', function () {
      const order = $(this).val();
      if (order) {
        chargerTachesTriees('echeance', order);
      }
    });

    // Recherche dynamique
    $('#search-projects').on('input', function () {
      const search = $(this).val().trim();
    
      fetch(`/taches?search=${encodeURIComponent(search)}`)
        .then(response => response.json())
        .then(data => {
          const tbody = $('table tbody');
          tbody.empty();
    
          data.forEach(task => {
            // Construction des fichiers joints (si présents)
            const fichiersHTML = (task.fichiers && task.fichiers.length > 0)
              ? task.fichiers.map(file =>
                  `<a href="/storage/${file.chemin}" target="_blank">${file.nom}</a>`
                ).join(', ')
              : '';
    
            // Construction de la ligne de tâche
            const row = `
              <tr data-id="${task.id}">
                <td>${task.nom}</td>
                <td class="statut" data-stat="${task.statut}">
                  <i class="${getStatutIconClass(task.statut)}"></i>
                </td>
                <td class="priorite">${getPriorityIcon(task.priorite)}</td>
                <td class="echeance">${task.echeance}</td>
                <td class="fichiers"><ul>${fichiersHTML}</ul></td>
                <td>
                  <button class="btn btn-sm btn-outline-primary btn-modify"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${task.id}"><i class="bi bi-trash"></i></button>
                </td>
              </tr>
            `;
            tbody.append(row);
          });
        });
    });

    // Modifier la photo de profil
    $(document).ready(function () {
      $('#avatar').on('change', function (e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = function (e) {
            $('#profile-img').attr('src', e.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    });

    // Fonction pour afficher une notification
    function afficherNotification(message, type = 'success') {
      const notif = $('#notification');
      notif.text(message);
      notif.removeClass('success error').addClass(type);
      notif.fadeIn(300);
  
      setTimeout(() => {
          notif.fadeOut(300);
      }, 3000);
  }

    // Afficher le modal de preview
    const modalInstance = new bootstrap.Modal(document.getElementById('filePreviewModal'));

    $(document).on('click', '.fichiers a', function (e) {
      e.preventDefault();

      const fileUrl = $(this).attr('href');
      const fileExt = fileUrl.split('.').pop().toLowerCase();
      const previewable = ['pdf', 'png', 'jpg', 'jpeg', 'webp'];

      const $iframe = $('#filePreview');
      const $image = $('#imagePreview');
      const $download = $('#downloadLink');
      const $message = $('#noPreviewMessage');

      // Réinitialiser tous les éléments
      $iframe.hide().attr('src', '');
      $image.hide().attr('src', '');
      $message.hide();

      $download.attr('href', fileUrl);

      if (fileExt === 'pdf') {
        $iframe.attr('src', fileUrl).show();
      } else if (['png', 'jpg', 'jpeg', 'webp'].includes(fileExt)) {
        $image.attr('src', fileUrl).show();
      } else {
        $message.show();
      }

      modalInstance.show();
    });

});