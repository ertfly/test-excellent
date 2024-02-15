<?php

namespace App\Http\Api;

use App\Helpers\FileHelper;
use App\Http\Requests\ProductImageForm;
use App\Models\ProductImages;
use Exception;

class ProductImagesController
{
    public function index(int $productId)
    {
        return ProductImages::select(
            'product_images.id',
            'product_images.file',
            'product_images.active'
        )
            ->where('product_images.product_id', $productId)
            ->orderBy('product_images.id', 'asc')
            ->paginate(10);
    }

    public function create(ProductImageForm $request)
    {
        $file = $request->get('file');
        if (!$file) {
            throw new Exception('Selecione uma imagem', 1);
        }

        $file = FileHelper::base64ToFile($file, storage_path('app/public/products/'), ['image/png'], 'Tipo de arquivo não suportado');
        if (!is_file(storage_path('app/public/products/' . $file))) {
            throw new Exception('Ocorreu um erro ao realizar o upload do arquivo, favor tentar novamente.');
        }

        $productImageActive = ProductImages::where('product_id', $request->get('productId'))
            ->where('active', true)
            ->first();


        $active = false;
        if (!$productImageActive) {
            $active = true;
        }

        $productImage = new ProductImages();
        $productImage->product_id = $request->get('productId');
        $productImage->file = $file;
        $productImage->active = $active;
        $productImage->save();

        return response()->json([
            'msg' => 'Imagem cadastrada com sucesso!'
        ]);
    }

    public function active(int $id)
    {
        $productImage = ProductImages::find($id);
        if (!$productImage) {
            throw new Exception('Imagem não encontrado', 2);
        }

        ProductImages::where('product_id', $productImage->product_id)
            ->update(['active' => false]);

        $productImage->active = true;
        $productImage->save();

        return response()->json(['msg' => 'Imagem definida com principal!']);
    }

    public function delete(int $id)
    {
        $productImage = ProductImages::find($id);
        if (!$productImage) {
            throw new Exception('Lançamento de estoque não encontrado', 2);
        }

        $lastImageNotActive = ProductImages::where('product_id', $productImage->product_id)
            ->where('active', false)
            ->orderBy('id', 'asc')
            ->first();

        @unlink(storage_path('app/public/products/' . $productImage->file));

        $productImage->delete();

        if ($lastImageNotActive) {
            $lastImageNotActive->active = true;
            $lastImageNotActive->save();
        }

        return response()->json(['msg' => 'Imagem excluída com sucesso!']);
    }
}
