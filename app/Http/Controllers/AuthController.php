<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function inscription(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);

        return response()->json(['redirect' => route('dashboard')]);
    }

    public function connexion(Request $request)
    {
        if (Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['redirect' => route('dashboard')]);
        }

        return response()->json(['error' => 'Identifiants invalides.'], 401);
    }
}