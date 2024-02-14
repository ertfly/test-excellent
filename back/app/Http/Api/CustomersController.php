<?php

namespace App\Http\Api;

use App\Http\Requests\CustomerForm;
use App\Models\Customers;
use Exception;

class CustomersController
{
    public function index()
    {
        return Customers::select('id', 'name', 'created_at')->where('trash', false)->paginate(10);
    }

    public function create(CustomerForm $request)
    {
        $user = new Customers();
        $user->name = urldecode($request->name);
        $user->save();

        return response()->json(['msg' => 'Cliente cadastrado com sucesso!']);
    }

    public function view(int $id)
    {
        $user = Customers::find($id);
        if (!$user) {
            throw new Exception('Cliente não encontrado', 2);
        }

        return [
            'name' => $user->name,
        ];
    }

    public function update(int $id, CustomerForm $request)
    {
        $user = Customers::find($id);
        if (!$user) {
            throw new Exception('Cliente não encontrado', 2);
        }

        $user->name = urldecode($request->name);
        $user->save();

        return response()->json(['msg' => 'Cliente atualizado com sucesso!']);
    }

    public function delete(int $id){
        $user = Customers::find($id);
        if (!$user) {
            throw new Exception('Cliente não encontrado', 2);
        }

        $user->trash = true;
        $user->save();

        return response()->json(['msg' => 'Cliente excluído com sucesso!']);
    }
}
