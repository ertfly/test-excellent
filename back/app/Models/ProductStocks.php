<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductStocks extends Model
{
    protected $fillable = [
        'product_id',
        'description',
        'quantity',
        'balance',
        'active',
        'user_id'
    ];
}
