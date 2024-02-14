<?php

namespace App\Http\Middleware;

use App\Helpers\JWTHelpers;
use Closure;
use Exception;
use Illuminate\Http\Request;

class WithToken
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $auth = $request->cookie('auth');
            if (!$auth) {
                throw new Exception('Sessão finalizada, acesse novamente!');
            }


            $jwt = new JWTHelpers(getenv('APP_KEY'));
            $decoded = $jwt->decode($auth);
            if (!($decoded['id'] ?? null)) {
                throw new Exception('Sessão finalizada, acesse novamente!');
            }

            $result = $next($request)?->original;
            if (isset($result['validations'])) {
                return [
                    'response' => [
                        'code' => 1,
                        'msg' => $result['validations']
                    ],
                    'data' => null
                ];
            }

            return [
                'response' => [
                    'code' => 0,
                    'msg' => 'success'
                ],
                'data' => $result
            ];
        } catch (Exception $e) {
            return [
                'response' => [
                    'code' => $e->getCode() < 1 ? 1 : $e->getCode(),
                    'msg' => $e->getMessage(),
                ],
                'data' => null
            ];
        }
    }
}
