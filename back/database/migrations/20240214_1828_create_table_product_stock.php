<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_stock', function (Blueprint $table) {
            $table->id();
            $table->integer('product_id')->index('idx_product_stock_product_id');
            $table->string('description', 250)->index('idx_product_stock_description');
            $table->integer('quantity')->unsigned()->default(0);
            $table->integer('balance')->default(0);
            $table->boolean('active')->default(true)->index('idx_product_stock_active');
            $table->integer('user_id')->index('idx_product_stock_user_id');
            $table->boolean('trash')->default(false)->index('idx_product_stock_trash');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_stock');
    }
};
