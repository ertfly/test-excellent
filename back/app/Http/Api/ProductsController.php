<?php

namespace App\Http\Api;

use App\Helpers\NumberHelper;
use App\Http\Requests\ProductForm;
use App\Models\Products;
use Exception;

class ProductsController
{
    public function index()
    {
        return Products::select('id', 'name', 'price', 'created_at')->where('trash', false)->paginate(10);
    }

    public function create(ProductForm $request)
    {
        $product = new Products();
        $product->name = urldecode($request->name);
        $product->price = NumberHelper::toDecimal(urldecode($request->price), 2);
        $product->save();

        return response()->json(['msg' => 'Produto cadastrado com sucesso!']);
    }

    public function view(int $id)
    {
        $product = Products::find($id);
        if (!$product) {
            throw new Exception('Produto não encontrado', 2);
        }

        return [
            'name' => $product->name,
            'price' => number_format($product->price, 2, ',', '.'),
        ];
    }

    public function update(int $id, ProductForm $request)
    {
        $product = Products::find($id);
        if (!$product) {
            throw new Exception('Produto não encontrado', 2);
        }

        $product->name = urldecode($request->name);
        $product->price = NumberHelper::toDecimal(urldecode($request->price), 2);
        $product->save();

        return response()->json(['msg' => 'Produto atualizado com sucesso!']);
    }

    public function delete(int $id)
    {
        $product = Products::find($id);
        if (!$product) {
            throw new Exception('Produto não encontrado', 2);
        }

        $product->trash = true;
        $product->save();

        return response()->json(['msg' => 'Produto excluído com sucesso!']);
    }
}
