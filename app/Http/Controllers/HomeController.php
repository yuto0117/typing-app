<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\TimeLimit;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class HomeController extends Controller
{
    //
    public function index()
    {
        $userId = Auth::id();
        $activeQuestions = Question::where('userid',$userId)->where('is_active', true)->pluck('question');
        $Timelimitquestion = TimeLimit::where('userid',$userId)->pluck('limit');
        return Inertia::render('Dashboard', ['activeQuestions' => $activeQuestions,'Timelimitquestion' => $Timelimitquestion]);
    }
}
