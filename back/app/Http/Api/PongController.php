<?php

namespace App\Http\Api;

use Exception;
use Faker\Calculator\Ean;

class PongController
{
    public function index(){
        return [
            'pong' => true
        ];
    }
}
