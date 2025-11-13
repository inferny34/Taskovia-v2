<footer>
    <div class="container-fluid">
        <div class="row footer-columns">
            <div class="col-md-3">
                <div class="logo">
                    <a href="{{ url('/') }}">
                        <img src="{{ asset('images/Logo.svg') }}" alt="Taskovia">
                    </a>
                </div>
                <p class="text-foot">Taskovia, la gestion de projet simplifiée.<br>Concrétisez vos projets, ensemble.</p>
                <ul class="social-icons">
                    <li><a href="#"><i class="bi bi-facebook"></i></a></li>
                    <li><a href="#"><i class="bi bi-twitter"></i></a></li>
                    <li><a href="#"><i class="bi bi-linkedin"></i></a></li>
                    <li><a href="#"><i class="bi bi-github"></i></a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <h3>Produit</h3>
                <ul class="foot-link">
                    <li><a href="{{ url('/fonctionnalites') }}">Fonctionnalités</a></li>
                    <li><a href="{{ url('/tarif') }}">Tarif</a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <h3>Entreprise</h3>
                <ul class="foot-link">
                    <li><a href="{{ url('/a-propos') }}">À propos</a></li>
                    <li><a href="{{ url('/contact') }}">Contact</a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <h3>Utile</h3>
                <ul class="foot-link">
                    <li><a href="{{ url('/conditions-utilisation') }}">Conditions d'utilisation</a></li>
                    <li><a href="{{ url('/politique-confidentialite') }}">Politique de confidentialité</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>