<?php

namespace App\Http\Api;

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

        return [
            'token' => 'token',
        ];
    }
}
