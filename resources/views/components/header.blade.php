<header>
    <nav class="navbar navbar-expand-md px-4 d-flex justify-content-between align-items-center">
        <div class="logo">
            <a href="{{ url('/') }}">
                <img src="{{ asset('images/Logo.svg') }}" alt="Taskovia">
            </a>
        </div>
        <ul class="nav">
            <li class="nav-item"><a class="nav-link" href="{{ url('/fonctionnalites') }}">Fonctionnalités</a></li>
            <li class="nav-item"><a class="nav-link" href="{{ url('/tarif') }}">Tarif</a></li>
            <li class="nav-item"><a class="nav-link" href="{{ url('/contact') }}">Contact</a></li>
        </ul>
        <button type="button" class="nav-btn openConnect">C’est parti !</button>
    </nav>
</header>