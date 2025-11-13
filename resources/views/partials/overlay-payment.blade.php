<div class="overlay-box">
  <h2>Paiement <span class="offer-type">Offre</span></h2>

  <form class="payment-form">
    <input type="hidden" name="offer" class="offer-input" value="">

    <div class="input-group">
      <i class="bi bi-person"></i>
      <input type="text" name="fullname" placeholder="Nom complet" required />
    </div>

    <div class="input-group">
      <i class="bi bi-credit-card"></i>
      <input type="text" name="card" placeholder="Numéro de carte" required />
    </div>

    <div class="input-row">
      <div class="input-group">
        <i class="bi bi-calendar"></i>
        <input type="text" name="expiry" placeholder="MM/AA" required />
      </div>
      <div class="input-group">
        <i class="bi bi-lock"></i>
        <input type="text" name="cvv" placeholder="CVC" required />
      </div>
    </div>

    <label class="checkbox-remember">
      <input type="checkbox" name="remember-card" />
      Se souvenir de la carte
    </label>

    <label class="checkbox-remember">
      <input type="checkbox" name="free-trial" />
      Essayer gratuitement pendant 30 jours (0€ ce mois-ci)
    </label>

    <button type="submit" class="btn-validate">Valider</button>
  </form>

  <button class="overlay-close" aria-label="Fermer l’overlay">&times;</button>
</div>