<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        \Log::info('IsAdmin middleware is running');
        if (auth()->check()) {
            \Log::info('User is authenticated');
            \Log::info('User role: ' . auth()->user()->role);
            if (auth()->user()->role === 'admin') {
                \Log::info('User is admin');
                return $next($request);
            } else {
                \Log::warning('User is not admin');
            }
        } else {
            \Log::warning('User is not authenticated');
        }

        abort(403, 'Accès refusé - Réservé aux administrateurs.');
    }
}