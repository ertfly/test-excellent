<?php

namespace App\Http\Api;

use App\Http\Requests\AuthPost;
use Exception;

class AuthController
{
    public function create(AuthPost $request)
    {
        return $request->all();
    }
}
