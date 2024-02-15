<?php

namespace App\Http\Api;

use App\Helpers\JWTHelper;
use App\Http\Requests\ProductStockForm;
use App\Models\ProductStocks;
use Exception;

class ProductStocksController
{
    public function index(int $productId)
    {
        return ProductStocks::select('id', 'name', 'price', 'created_at')
            ->where('trash', false)
            ->where('product_id', $productId)
            ->paginate(10);
    }

    public function create(ProductStockForm $request)
    {
        $quantity = intval($request->quantity);

        if (boolval($request->positive)) {
            $description = 'Entrada de estoque';
        } else {
            $quantity = $quantity * -1;
            $description = 'Saída de estoque';
        }

        $stockActive = ProductStocks::where('product_id', $request->productId)
            ->where('active', true)
            ->first();

        $balance = 0;
        if ($stockActive?->id) {
            $balance = $stockActive->balance;
        }

        $jwt = new JWTHelper(getenv('APP_KEY'));
        $decoded = $jwt->decode($request->cookie('auth'));

        $productStock = new ProductStocks();
        $productStock->description = $description;
        $productStock->quantity = $quantity;
        $productStock->balance = $balance + $quantity;
        $productStock->active = true;
        $productStock->user_id = $decoded['id'];
        $productStock->save();

        if ($stockActive?->id) {
            $stockActive->active = false;
            $stockActive->save();
        }

        return response()->json([
            'msg' => 'Estoque lançado com sucesso!'
        ]);
    }

    public function delete(int $id)
    {
        $productStock = ProductStocks::find($id);
        if (!$productStock) {
            throw new Exception('Lançamento de estoque não encontrado', 2);
        }

        $productStock->delete();

        return response()->json(['msg' => 'Estoque excluído com sucesso!']);
    }
}
