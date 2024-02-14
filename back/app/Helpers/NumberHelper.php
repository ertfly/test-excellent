<?php

namespace App\Helpers;

class NumberHelper
{
    public static function toDecimal($number, $dec = 2)
    {
        $before = 0;
        $after = 0;
        if (preg_match("/[^\d\,\.]/", $number)) {
            return 0;
        }
        if (preg_match("/^[\d]{1,}$/", $number)) {
            $before = $number;
        }
        if (preg_match("/([0-9\,\.]{0,})\.([0-9]{1,})$/", $number, $match)) {
            $before = str_replace('.', '', str_replace(',', '', $match[1]));
            $after = $match[2];
        }

        if (preg_match("/([0-9\,\.]{0,})\,([0-9]{1,})$/", $number, $match)) {
            $before = str_replace('.', '', str_replace(',', '', $match[1]));
            $after = $match[2];
        }
        return number_format($before . '.' . $after, $dec, '.', '');
    }
}
