<div class="overlay-box">
  <h2>Connexion</h2>

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

  {{-- Formulaire de connexion --}}
  <form method="POST" action="{{ route('login') }}" class="connexion-form">
    @csrf
    <input type="email" name="email" placeholder="Adresse e-mail" required />
    <input type="password" name="password" placeholder="Mot de passe" required />
    <button type="submit" class="btn-connect">Se connecter</button>
  </form>

  <div class="divider">ou se connecter avec</div>

  <div class="social-login">
    <a href="#"><i class="bi bi-facebook"></i></a>
    <a href="#"><i class="bi bi-twitter-x"></i></a>
    <a href="#"><i class="bi bi-linkedin"></i></a>
    <a href="#"><i class="bi bi-reddit"></i></a>
  </div>

  <a href="#" class="link-to-inscription">Vous n’avez pas encore de compte ? S’inscrire</a>

  <button class="overlay-close" aria-label="Fermer l’overlay">&times;</button>
</div>