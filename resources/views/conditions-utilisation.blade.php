@extends('layouts.app')

@section('content')
<section>

    <h1>Conditions d'utilisation</h1>

    <br><br>

    <h2>1. Introduction</h2>
    <p>Bienvenue sur Taskovia. En accédant ou en utilisant notre plateforme, vous acceptez, sans réserve, les présentes conditions générales d’utilisation. Si vous n’acceptez pas ces termes, veuillez interrompre l’utilisation du site.</p>

    <h2>2. Acceptation des conditions</h2>
    <p>L’utilisation de Taskovia implique l’acceptation pleine et entière des présentes conditions. Celles-ci peuvent être modifiées à tout moment. La version en vigueur est toujours consultable sur cette page.</p>

    <h2>3. Accès au service</h2>
    <p>L’accès à la plateforme est réservé aux utilisateurs adultes légalement capables. Nous faisons notre maximum pour assurer un accès permanent, mais nous ne garantissons pas une disponibilité continue ou ininterrompue du service.</p>

    <h2>4. Obligations de l’utilisateur</h2>
    <p>Vous vous engagez à utiliser Taskovia dans le respect des lois en vigueur, sans publicité, spam ou contenu illégal. Il est interdit de tenter de pirater, manipuler ou perturber le fonctionnement du site.</p>

    <h2>5. Propriété intellectuelle</h2>
    <p>Tous les contenus, logos, images, et textes présents sur Taskovia sont protégés par des droits d’auteur. Toute reproduction, modification ou utilisation sans autorisation préalable est strictement interdite.</p>

    <h2>6. Données personnelles</h2>
    <p>Votre usage du site est soumis à notre Politique de Confidentialité, accessible <a href="{{ url('/politique-confidentialite') }}">ici</a>. En utilisant Taskovia, vous acceptez le traitement de vos données personnelles conformément à cette politique.</p>

    <h2>7. Responsabilité</h2>
    <p>Taskovia s’engage à faire ses meilleurs efforts pour assurer le bon fonctionnement du site, mais ne pourra être tenu responsable en cas de perte, erreur ou interruption. La plateforme est fournie "en l’état", sans garantie expresse ou implicite.</p>

    <h2>8. Responsabilité de l’utilisateur</h2>
    <p>Vous êtes responsable de votre utilisation et de votre bon comportement sur la plateforme. Toute activité illicite, abusive ou nuisible pourra entraîner la suspension ou la suppression de votre compte.</p>

    <h2>9. Liens externes</h2>
    <p>Taskovia peut contenir des liens vers des sites tiers. Nous déclinons toute responsabilité sur leur contenu ou leur conformité à la législation en vigueur.</p>

    <h2>10. Modification des conditions</h2>
    <p>Taskovia se réserve le droit de modifier ces conditions à tout moment. La version applicable est celle en ligne au moment de votre utilisation.</p>

    <h2>11. Loi applicable</h2>
    <p>Les présentes conditions sont régies par la loi [pays, exemple : française]. En cas de litige, compétence exclusive des tribunaux de [ville ou région].</p>

    <h2>12. Contact</h2>
    <p>Pour toute question ou réclamation, contactez-nous à la page <a href="{{ url('/contact') }}">Contact</a>.</p>

</section>

@endsection