<?php

namespace Database\Seeders;

use App\Models\ProductStocks;
use Illuminate\Database\Seeder;

class ProductStockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductStocks::create([
            'product_id' => 1,
            'description' => 'Entrada de estoque',
            'quantity' => 10,
            'balance' => 10,
            'active' => true,
            'user_id' => 1
        ]);

        ProductStocks::create([
            'product_id' => 2,
            'description' => 'Entrada de estoque',
            'quantity' => 10,
            'balance' => 10,
            'active' => true,
            'user_id' => 1
        ]);

        ProductStocks::create([
            'product_id' => 3,
            'description' => 'Entrada de estoque',
            'quantity' => 10,
            'balance' => 10,
            'active' => true,
            'user_id' => 1
        ]);
    }
}
