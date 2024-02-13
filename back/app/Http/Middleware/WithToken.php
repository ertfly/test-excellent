<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;

class WithToken
{
    public function handle(Request $request, Closure $next)
    {
        try {
            if ($request->header('appKey') != 'CHAVEADMIN') {
                throw new Exception('Chave de integração inválida!');
            }

            if ($request->header('token') != 'token-admin') {
                throw new Exception('Token inválido!');
            }

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
