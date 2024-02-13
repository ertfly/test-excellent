<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Faker\Calculator\Ean;
use Illuminate\Http\Request;

class NoToken
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $result = $next($request)?->original;

            if(isset($result['validations'])){
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
                    'code' => 1,
                    'msg' => $e->getMessage(),
                ],
                'data' => null
            ];
        }
    }
}
