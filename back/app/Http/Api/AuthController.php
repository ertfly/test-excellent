<?php

namespace App\Http\Api;

use App\Helpers\JWTHelpers;
use App\Http\Requests\AuthPost;
use App\Models\Users;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class AuthController
{
    public function create(AuthPost $request)
    {
        $user = Users::select('id', 'name', 'pass')->where('email', $request->email)->first();

        if (!$user || !password_verify($request->get('pass'), $user->pass)) {
            throw new Exception('Usuário ou senha inválidos!');
        }

        $jwt = new JWTHelpers(getenv('APP_KEY'));
        $token = $jwt->encode([
            'id' => $user->id,
            'name' => $user->name,
        ]);

        setcookie('auth', $token, time() + 3600, '/', '', false, true);
        return response()->json([]);
    }

    public function view(Request $request)
    {
        $jwt = new JWTHelpers(getenv('APP_KEY'));
        $decoded = $jwt->decode($request->cookie('auth'));

        $logged = false;
        $name = '';
        if($decoded['id']){
            $logged = true;
            $name = $decoded['name'];
        }

        return [
            'logged' => $logged,
            'name' => $name,
        ];
    }
}
