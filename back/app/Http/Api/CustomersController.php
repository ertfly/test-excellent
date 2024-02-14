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
        $customer = new Customers();
        $customer->name = urldecode($request->name);
        $customer->save();

        return response()->json(['msg' => 'Cliente cadastrado com sucesso!']);
    }

    public function view(int $id)
    {
        $customer = Customers::find($id);
        if (!$customer) {
            throw new Exception('Cliente não encontrado', 2);
        }

        return [
            'name' => $customer->name,
        ];
    }

    public function update(int $id, CustomerForm $request)
    {
        $customer = Customers::find($id);
        if (!$customer) {
            throw new Exception('Cliente não encontrado', 2);
        }

        $customer->name = urldecode($request->name);
        $customer->save();

        return response()->json(['msg' => 'Cliente atualizado com sucesso!']);
    }

    public function delete(int $id){
        $customer = Customers::find($id);
        if (!$customer) {
            throw new Exception('Cliente não encontrado', 2);
        }

        $customer->trash = true;
        $customer->save();

        return response()->json(['msg' => 'Cliente excluído com sucesso!']);
    }
}
