<?php

namespace Database\Seeders;

use App\Models\Customers;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Customers::create([
            'name' => 'Cliente Teste',
        ]);
    }

}
