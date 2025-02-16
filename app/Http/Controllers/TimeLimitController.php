<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TimeLimit;

class TimeLimitController extends Controller
{
    //
    public function store(Request $request)
    {
        $request->validate([
            'timeLimit' => 'required|integer',
        ]);

        
        // $timeLimit = TimeLimit::first();
        $timeLimit = TimeLimit::where('userid',$request->userid )->first(); 


        if ($timeLimit) {
            
            $timeLimit->limit = $request->timeLimit;
            $timeLimit->save();
        } else {
            
            $timeLimit = new TimeLimit();
            $timeLimit->limit = $request->timeLimit;
            $timeLimit->userid = $request->userid;
            $timeLimit->save();
        }
        
        $Timelimitquestion = TimeLimit::where('userid',$request->userid )->pluck('limit');

        
        return response()->json($Timelimitquestion);
    }
}
