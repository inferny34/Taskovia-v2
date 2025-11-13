<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();

        $filename = 'avatar_' . $user->id . '.' . $request->avatar->extension();
        $path = $request->avatar->move(public_path('avatars'), $filename);

        $user->avatar = 'avatars/' . $filename;
        $user->save();

        return redirect()->back()->with('success', 'Miniature mise à jour avec succès !');
    }

    public function settings()
    {
        return view('parametre-appli');
    }
}