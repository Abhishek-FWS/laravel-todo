@extends('layout')

@section('content')
    <div class="bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        @if($errors->any())
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {{ $errors->first() }}
            </div>
        @endif
        <form action="{{ route('authenticate') }}" method="POST">
            @csrf
            <div class="mb-4">
                <label class="block mb-1 font-semibold">Username</label>
                <input type="text" name="username"
                    class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="admin" required>
            </div>
            <div class="mb-6">
                <label class="block mb-1 font-semibold">Password</label>
                <input type="password" name="password"
                    class="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="password" required>
            </div>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-200">Login</button>
        </form>
    </div>
@endsection