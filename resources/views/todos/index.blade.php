@extends('layout')

@section('content')
    <div class="bg-white p-6 rounded shadow">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-800">My Todos</h1>
            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button type="submit" class="text-sm text-red-500 hover:text-red-700 font-semibold">Logout</button>
            </form>
        </div>

        <form action="{{ route('todos.store') }}" method="POST" class="mb-6 flex gap-2">
            @csrf
            <input type="text" name="title"
                class="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a new task..." required>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition duration-200">Add</button>
        </form>

        <ul class="space-y-2">
            @forelse($todos as $todo)
                <li class="flex justify-between items-center bg-gray-50 p-3 rounded hover:bg-gray-100 transition duration-150">
                    <div class="flex items-center gap-3">
                        <form action="{{ route('todos.update', $todo) }}" method="POST" class="flex items-center">
                            @csrf
                            @method('PATCH')
                            <input type="checkbox" onchange="this.form.submit()"
                                class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer" {{ $todo->is_completed ? 'checked' : '' }}>
                        </form>
                        <span class="text-lg {{ $todo->is_completed ? 'line-through text-gray-400' : 'text-gray-700' }}">
                            {{ $todo->title }}
                        </span>
                    </div>
                    <form action="{{ route('todos.destroy', $todo) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="text-red-400 hover:text-red-600 font-bold text-xl px-2"
                            title="Delete">&times;</button>
                    </form>
                </li>
            @empty
                <li class="text-center text-gray-500 py-4">No todos yet. Add one above!</li>
            @endforelse
        </ul>
    </div>
@endsection