<?php

namespace Database\Seeders;

use App\Models\Users;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = Users::create([
            'name' => 'Usuário de Teste',
            'email' => 'test@test.com',
            'pass' => password_hash('123', PASSWORD_DEFAULT),
        ]);
    }
}
