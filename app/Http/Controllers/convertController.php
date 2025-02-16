<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;
use Symfony\Component\Process\Process;

class convertController extends Controller
{
    public function convert(Request $request)
    {
        try{
       
            

            $kanjiArray = $request->input('texts');

            

            $kanjiArrayJson = json_encode($kanjiArray, JSON_UNESCAPED_UNICODE);
            
            $py_path = app_path();
            
            $command = "python $py_path\Python\kanji_to_romaji.py $kanjiArrayJson";
            

            exec($command , $outputs); 
               
            

            $flattenedArray = $outputs[0];

            $trimmedString = trim($flattenedArray, "[]");

            $elements = explode(',', $trimmedString);
        

            // $trimmedElements = array_map(function($element) {
            //     // シングルクォートとダブルクォートのいずれかで囲まれている場合
            //     if ((substr($element, 0, 1) === "'" && substr($element, -1) === "'") ||
            //         (substr($element, 0, 1) === '"' && substr($element, -1) === '"')) {
            //           $element = substr($element, 1, -1); // 外側のクォートを削除
            //     }
            //     return trim($element, " "); // 前後の空白とクォートを取り除く
            // }, $elements);

            $trimmedElements = array_map(function($element) {

                $element = trim($element, " ");

                return $element = substr($element, 1, -1); 

                }, $elements);

            return response()->json($trimmedElements);

        } catch (Exception $e) {
            Log::error('Error converting kanji: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }
}
