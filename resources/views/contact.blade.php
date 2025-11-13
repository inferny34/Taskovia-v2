@extends('layouts.app')

@section('body-class', 'page-contact')

@section('content')
<main class="container mt-5">
    <h2>Contactez-nous</h2>
    <p>Vous avez des questions ou besoin d'aide ? Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.</p>

    <form>
        <div class="form-group">
            <label for="name">Nom</label>
            <input type="text" class="form-control" id="name" placeholder="Votre nom">
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="Votre e-mail">
        </div>
        <div class="form-group">
            <label for="message">Message</label>
            <textarea class="form-control" id="message" rows="4" placeholder="Votre message"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Envoyer</button>
    </form>
</main>

@endsection