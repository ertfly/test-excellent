<?php

namespace App\Http\Api;

class TokenController
{
    public function create(){
        return [
            'token' => 'token-admin'
        ];
    }
}
