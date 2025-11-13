@extends('layouts.dashboard')

@section('content')
<div class="settings-container">
  <h1>Paramètres du profil</h1>

  {{-- Affichage de l'avatar actuel --}}
  <div class="avatar-section">
    <h2>Miniature actuelle</h2>
    <img src="{{ asset(Auth::user()->avatar ?? 'images/flaticon.png') }}" class="avatar" alt="Avatar"/>
  </div>

  {{-- Formulaire d’upload --}}
  <div class="upload-section">
    <h2>Importer une nouvelle miniature</h2>
    <form action="{{ route('user.avatar.upload') }}" method="POST" enctype="multipart/form-data">
      @csrf
      <input type="file" name="avatar" accept="image/*" required>
      <button type="submit">Sauvegarder</button>
    </form>
    @if(session('success'))
      <p class="success">{{ session('success') }}</p>
    @endif
  </div>

  {{-- Bouton retour --}}
  <a href="{{ route('dashboard') }}" class="btn-retour">← Retour au Dashboard</a>
</div>
@endsection