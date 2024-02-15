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
        return ProductStocks::select(
            'product_stocks.id',
            'product_stocks.description',
            'product_stocks.quantity',
            'product_stocks.balance',
            'product_stocks.created_at',
            'product_stocks.active',
            'users.name as user_name'
        )
            ->where('product_stocks.product_id', $productId)
            ->join('users', 'users.id', '=', 'product_stocks.user_id')
            ->orderBy('product_stocks.id', 'desc')
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
        $productStock->product_id = $request->productId;
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

        if (!$productStock->active) {
            throw new Exception('Lançamento de estoque precisa ser o útimo para ser excluído', 2);
        }

        $productStock->delete();

        return response()->json(['msg' => 'Estoque excluído com sucesso!']);
    }
}
