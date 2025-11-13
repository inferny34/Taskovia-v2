// Fonction pour charger un overlay
function loadOverlay(route, offerType = null) {
  console.log("Chargement : " + route); // Test

  fetch(route)
    .then(response => {
      if (!response.ok) {
        throw new Error("Route introuvable : " + route);
      }
      return response.text();
    })
    .then(html => {
      const container = document.querySelector('.overlay-container');
      container.innerHTML = html;
      container.style.display = 'flex';
      // Si l'overlay contient un formulaire de connexion, on l'intercepte
      const loginForm = container.querySelector('.connexion-form');
      if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
          e.preventDefault();

          const formData = new FormData(loginForm);

          fetch('/login', {
            method: 'POST',
            headers: {
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
              'Accept': 'application/json'
            },
            body: formData
          })
          .then(async response => {
            if (response.ok) {
              // Connexion réussie
              window.location.href = '/dashboard';
            } else {
              // Erreur : on essaye d'afficher les messages si dispo
              const data = await response.json();
              alert(data.message || "Erreur de connexion.");
            }
          })
          .catch(error => {
            console.error("Erreur AJAX :", error);
            alert("Erreur inattendue.");
          });
        });
      }

      // Injecter le type d'offre dans l'overlay de paiement
      if (route.includes('/overlay/payment') && offerType) {
        const offerLabel = offerType === "pro" ? "Pro - 9,99€" : "Équipe - 4,99€";

        const offerSpan = container.querySelector('.offer-type');
        const offerInput = container.querySelector('.offer-input');

        if (offerSpan) offerSpan.textContent = offerLabel;
        if (offerInput) offerInput.value = offerType;

        // Gérer le submit simulé
        const form = container.querySelector('.payment-form');
        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Paiement envoyé pour l'offre : " + offerInput.value);
            closeOverlay();
          });
        }
      }

      // Bouton de fermeture
      const closeBtn = container.querySelector('.overlay-close');
      if (closeBtn) {
        closeBtn.onclick = closeOverlay;
      }

      // Fermeture en cliquant à l’extérieur
      container.onclick = function (e) {
        if (e.target === container) {
          closeOverlay();
        }
      };
    })
    .catch(error => {
      console.error("Erreur de chargement :", error);
    });
}

// Fermeture de l’overlay
function closeOverlay() {
  const container = document.querySelector('.overlay-container');
  container.innerHTML = '';
  container.style.display = 'none';
}

// Ouverture des overlays classiques (via routes Laravel)
document.querySelectorAll('.openConnect').forEach(btn => {
  btn.onclick = () => loadOverlay('/overlay/connect');
});

document.querySelectorAll('.openInscription').forEach(btn => {
  btn.onclick = () => loadOverlay('/overlay/inscription');
});

// Ouverture dynamique de l’overlay paiement avec offre
document.querySelectorAll('.OpenPayment').forEach(btn => {
  btn.onclick = () => {
    const offer = btn.dataset.offer || "pro"; // valeur par défaut
    loadOverlay(`/overlay/payment?offer=${offer}`, offer);
  };
});

//Créer un compte
document.addEventListener('click', function (e) {
  const target = e.target.closest('.link-to-inscription');
  if (target) {
    e.preventDefault();
    loadOverlay('/overlay/inscription');
  }
});

// Se connecter
document.addEventListener('click', function (e) {
  const target = e.target.closest('.link-to-connexion');
  if (target) {
    e.preventDefault();
    loadOverlay('/overlay/connect');
  }
});