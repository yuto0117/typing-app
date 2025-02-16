<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Question;
use App\Models\TimeLimit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuestionController extends Controller
{
    //
    public function create()
    {
        $userId = Auth::id();
        $questions = Question::where('userid',$userId)->get();
        return Inertia::render('Questions/Create',['questions' => $questions]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'is_active' => 'required|boolean',
        ]);

        Question::create([
            'question' => $request->input('question'),
            'is_active' => $request->input('is_active'),
            'userid' => $request->input('userid'),
        ]);

        
        $questions = Question::where('userid',$request->input('userid'))->get();

        return response()->json($questions);
        // return redirect()->route('questions.create')->with('success', 'Question saved successfully!');
    }

    public function update(Request $request)
    {

        $id = $request->input('id');
        $question = $request->input('question');
        $is_active= $request->input('is_active');

        $questionRecord = Question::find($id);

        $questionRecord->question = $question;
        $questionRecord->is_active = $is_active;
        $questionRecord->save();
 
        $questions = Question::where('userid',$request->input('userid'))->get();;

        
        // $question =  Question::findOrFail($request->id);
        // $question->update($request->all());

        return response()->json($questions);
        // return redirect()->route('questions.create')->with('success', 'Question saved successfully!');
    }

    public function delete(Request $request)
    {

        $id = $request->input('id');
        $question = Question::find($id);
        $question->delete();
        
        $questions = Question::where('userid',$request->input('userid'))->get();

        return response()->json($questions);
       
    }
}
