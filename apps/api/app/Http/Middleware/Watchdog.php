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
        $user_id = Auth::user()->getAuthIdentifier();
        $acl = new ACL();
        $perms = $acl
            ->search_by_user($user_id, $request->getMethod(), $request->getPathInfo())
            ->first();
        if($perms->action == "allowed")
        {
            return $next($request);
        }
        return response()->json(['error' => 'Access to the resource was denined', 'status' => 403], 403);
    }
}
