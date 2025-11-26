<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function login()
    {
        return \Inertia\Inertia::render('Login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('username', 'password');

        if ($credentials['username'] === 'admin' && $credentials['password'] === 'password') {
            Session::put('is_admin', true);
            return redirect()->route('todos.index');
        }

        return back()->withErrors(['message' => 'Invalid credentials']);
    }

    public function logout()
    {
        Session::forget('is_admin');
        return redirect()->route('login');
    }
}
