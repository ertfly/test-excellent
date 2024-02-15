<?php

namespace Database\Seeders;

use App\Models\ProductImages;
use Illuminate\Database\Seeder;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductImages::create([
            'product_id' => 1,
            'file' => 'product-1.png',
            'active' => true,
        ]);

        ProductImages::create([
            'product_id' => 2,
            'file' => 'product-2.png',
            'active' => true,
        ]);

        ProductImages::create([
            'product_id' => 3,
            'file' => 'product-3.png',
            'active' => true,
        ]);
    }
}
