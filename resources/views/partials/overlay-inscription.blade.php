<div class="overlay-box">
  <h2>Créer un compte</h2>

  {{-- Affichage des erreurs --}}
  @if ($errors->any())
    <div class="alert alert-danger">
      <ul>
        @foreach ($errors->all() as $error)
          <li>{{ $error }}</li>
        @endforeach
      </ul>
    </div>
  @endif

  {{-- Formulaire d’inscription --}}
  <form method="POST" action="{{ route('register') }}" class="inscription-form">
    @csrf
    <input type="text" name="name" placeholder="Nom complet" required />
    <input type="email" name="email" placeholder="Adresse e-mail" required />
    <input type="password" name="password" placeholder="Mot de passe" required />
    <input type="password" name="password_confirmation" placeholder="Confirmer le mot de passe" required />
    <button type="submit" class="btn-connect">S’inscrire</button>
  </form>

  <div class="divider">ou s’inscrire avec</div>

  <div class="social-login">
    <a href="#"><i class="bi bi-facebook"></i></a>
    <a href="#"><i class="bi bi-twitter-x"></i></a>
    <a href="#"><i class="bi bi-linkedin"></i></a>
    <a href="#"><i class="bi bi-reddit"></i></a>
  </div>

  <a href="#" class="link-to-connexion">Vous avez déjà un compte ? Se connecter</a>

  <button class="overlay-close" aria-label="Fermer l’overlay">&times;</button>
</div>