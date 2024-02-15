<?php

namespace App\Helpers;

use Exception;
use Illuminate\Support\Facades\File;

class FileHelper
{
    public static function base64ToFile($fileEncoded, $pathDest, array $checkMimes, $errorMsg)
    {
        $mimeEncoded = substr($fileEncoded, 0, strpos($fileEncoded, ';'));
        $mimeEncoded = str_replace('data:', '', $mimeEncoded);

        if (!in_array($mimeEncoded, $checkMimes)) {
            throw new \Exception($errorMsg . ' (Solicitado: ' . $mimeEncoded . ', Disponível: ' . implode(', ', $checkMimes) . ')');
        }

        $decoded = substr($fileEncoded, strpos($fileEncoded, ',') + 1);
        $decoded = str_replace(' ', '+', $decoded);

        $extensions = array(
            'image/png' => 'png',
            'image/jpeg' => 'jpg',
            'image/jpg' => 'jpg',
            'application/pdf' => 'pdf',
            'video/mp4' => 'mp4',
        );
        if (!isset($extensions[$mimeEncoded])) {
            throw new Exception('Mimetype não disponível para upload');
        }
        $filename = md5(rand(11111, 99999)) . '_' . time() . '.' . $extensions[$mimeEncoded];
        @file_put_contents($pathDest . $filename, base64_decode($decoded));
        if (!is_file($pathDest . $filename)) {
            throw new \Exception('Ocorreu um erro ao realizar o upload do arquivo, favor tentar novamente.');
        }

        return $filename;
    }
}
