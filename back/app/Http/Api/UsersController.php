<?php

namespace App\Http\Api;

use App\Http\Requests\UserPost;
use App\Http\Requests\UserPut;
use App\Models\Users;
use Exception;
use Illuminate\Http\Request;

class UsersController
{
    public function index()
    {
        return Users::select('id', 'name', 'email', 'created_at')->where('trash', false)->paginate(10);
    }

    public function create(UserPost $request)
    {
        $user = new Users();
        $user->name = urldecode($request->name);
        $user->email = urldecode($request->email);
        $user->pass = password_hash(urldecode($request->pass), PASSWORD_DEFAULT);
        $user->save();

        return response()->json(['msg' => 'Usuário cadastrado com sucesso!']);
    }

    public function view(int $id)
    {
        $user = Users::find($id);
        if (!$user) {
            throw new Exception('Usuário não encontrado', 2);
        }

        return [
            'name' => $user->name,
            'email' => $user->email,
        ];
    }

    public function update(int $id, UserPut $request)
    {
        $user = Users::find($id);
        if (!$user) {
            throw new Exception('Usuário não encontrado', 2);
        }

        $user->name = urldecode($request->name);
        $user->email = urldecode($request->email);

        if ($request->pass && $request->passConfirm) {
            if ($request->pass != $request->passConfirm) {
                throw new Exception('As senhas não conferem', 1);
            }
            $user->pass = password_hash(urldecode($request->pass), PASSWORD_DEFAULT);
        }
        $user->save();

        return response()->json(['msg' => 'Usuário atualizado com sucesso!']);
    }

    public function delete(int $id){
        $user = Users::find($id);
        if (!$user) {
            throw new Exception('Usuário não encontrado', 2);
        }

        $user->trash = true;
        $user->save();

        return response()->json(['msg' => 'Usuário excluído com sucesso!']);
    }
}
