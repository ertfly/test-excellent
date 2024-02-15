<?php

namespace Database\Seeders;

use App\Models\ProductStock;
use Illuminate\Database\Seeder;

class ProductStockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductStock::create([
            'product_id' => 1,
            'description' => 'Inserindo estoque',
            'quantity' => 10,
            'balance' => 10,
            'active' => true,
            'user_id' => 1
        ]);

        ProductStock::create([
            'product_id' => 2,
            'description' => 'Inserindo estoque',
            'quantity' => 10,
            'balance' => 10,
            'active' => true,
            'user_id' => 1
        ]);

        ProductStock::create([
            'product_id' => 3,
            'description' => 'Inserindo estoque',
            'quantity' => 10,
            'balance' => 10,
            'active' => true,
            'user_id' => 1
        ]);
    }
}
