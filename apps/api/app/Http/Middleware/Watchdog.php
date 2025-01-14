<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Acl as ACL;

class Watchdog
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Get authenticated user
        $user = Auth::user();
        $acl = new ACL();
        // dd($acl->search_by_user($user->getAuthIdentifier()));

        // dd($request->method, $request->getPathInfo(), $request->bearerToken());

        return $next($request);
    }
}
