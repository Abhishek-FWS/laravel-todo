<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::latest()->get();
        return \Inertia\Inertia::render('Todos/Index', compact('todos'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
        ]);

        Todo::create([
            'title' => $request->title,
        ]);

        return back();
    }

    public function update(Todo $todo)
    {
        $todo->update([
            'is_completed' => !$todo->is_completed,
        ]);

        return back();
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return back();
    }
}
