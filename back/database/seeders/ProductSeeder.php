<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Products::create([
            'name' => 'Produto 1',
            'price' => 150.0
        ]);

        Products::create([
            'name' => 'Produto 2',
            'price' => 150.0
        ]);

        Products::create([
            'name' => 'Produto 3',
            'price' => 150.0
        ]);
    }
}
