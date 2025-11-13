<!DOCTYPE html>

<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Taskovia') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/reset.css') }}">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body class="@yield('body-class')">
    @include('components.header')

    <!-- Contenu principal -->
    <main>
        <!-- Bloc d'affichage des erreurs -->
        @if ($errors->any())
            <div class="container mt-3">
                <div class="alert alert-danger">
                    <ul class="mb-0">
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        @endif

        @yield('content')
    </main>

    @include('components.footer')

    <!-- Overlay -->
    <div class="overlay-container" style="display: none;">
        <div class="overlay-box"></div>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/overlay-loader.js') }}"></script>
</body>
</html>