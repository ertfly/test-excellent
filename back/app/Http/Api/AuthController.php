<?php

namespace App\Http\Api;

use App\Helpers\JWTHelper;
use App\Http\Requests\AuthPost;
use App\Models\Users;
use Exception;
use Illuminate\Http\Request;

class AuthController
{
    public function create(AuthPost $request)
    {
        $user = Users::select('id', 'name', 'pass')->where('email', $request->email)->first();

        if (!$user || !password_verify($request->get('pass'), $user->pass)) {
            throw new Exception('Usuário ou senha inválidos!');
        }

        $jwt = new JWTHelper(getenv('APP_KEY'));
        $token = $jwt->encode([
            'id' => $user->id,
            'name' => $user->name,
        ]);

        setcookie('auth', $token, time() + 3600, '/', '', false, true);
        return response()->json([]);
    }

    public function view(Request $request)
    {

        $auth = $request->cookie('auth');

        $logged = false;
        $name = '';

        if ($auth) {
            $jwt = new JWTHelper(getenv('APP_KEY'));
            $decoded = $jwt->decode($auth);
            if (($decoded['id'] ?? null)) {
                $logged = true;
                $name = $decoded['name'];
            }
        }

        return [
            'logged' => $logged,
            'name' => $name,
        ];
    }

    public function delete()
    {
        setcookie('auth', null);
        return [];
    }
}
