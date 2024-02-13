<?php

namespace App\Http\Api;

use App\Helpers\JWTHelpers;
use App\Http\Requests\AuthPost;
use App\Models\Users;
use Exception;

class AuthController
{
    public function create(AuthPost $request)
    {
        $user = Users::select('id', 'name', 'pass')->where('email', $request->email)->first();

        if (!$user || !password_verify($request->get('pass'), $user->pass)) {
            throw new Exception('Usuário ou senha inválidos!');
        }

        $jwt = new JWTHelpers(getenv('APP_KEY'));
        return [
            'token' => $jwt->encode([
                'id' => $user->id,
                'name' => $user->name,
            ]),
        ];
    }
}
