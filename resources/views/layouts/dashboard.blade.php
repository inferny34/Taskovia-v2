<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>

    <!-- Lien vers ton CSS -->
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    
    <!-- JQUERY -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
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

    <!-- Droite : Déconnexion -->
    <div class="navbar-right">
      <form class="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
        @csrf
      </form>
      <button class="btn-logout">Déconnexion</button>
    </div>
  </header>

  <main>
    @yield('content')
  </main>

  <script>const imageBasePath = "{{ asset('images/priorities') }}";</script>
  <script src="{{ asset('js/dashboard.js') }}"></script>
</body>
</html>