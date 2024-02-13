<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;

class NoToken
{
    public function handle(Request $request, Closure $next)
    {
        try {
            return [
                'response' => [
                    'code' => 0,
                    'msg' => 'success'
                ],
                'data' => $next($request)?->original
            ];
        } catch (Exception $e) {
            return [
                'response' => [
                    'code' => 1,
                    'msg' => $e->getMessage(),
                ],
                'data' => null
            ];
        }
    }
}
