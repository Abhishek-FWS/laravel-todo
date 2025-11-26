import React from 'react';
import { useForm, router } from '@inertiajs/react';
import { Card, CardHeader, CardBody, Input, Button, Checkbox, Chip } from "@heroui/react";

export default function Index({ todos }) {
    const { data, setData, post, processing, reset } = useForm({
        title: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/todos', {
            onSuccess: () => reset(),
        });
    };

    const toggleTodo = (todo) => {
        router.patch(`/todos/${todo.id}`);
    };

    const deleteTodo = (todo) => {
        router.delete(`/todos/${todo.id}`);
    };

    const logout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen p-4 pt-10 bg-default-50">
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="flex justify-between items-center px-2">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
                        <p className="text-default-500 text-sm mt-1">Manage your daily goals</p>
                    </div>
                    <Button
                        color="danger"
                        variant="light"
                        onPress={logout}
                    >
                        Logout
                    </Button>
                </div>

                <Card className="shadow-xl">
                    <CardBody className="p-4">
                        <form onSubmit={submit} className="flex gap-3">
                            <Input
                                placeholder="What needs to be done?"
                                value={data.title}
                                onValueChange={(val) => setData('title', val)}
                                size="lg"
                                variant="underlined"
                                color='secondary'
                            />
                            <Button
                                type="submit"
                                color="primary"
                                isLoading={processing}
                                size="lg"
                                className="font-semibold shadow-lg px-8"
                            >
                                Add
                            </Button>
                        </form>
                    </CardBody>
                </Card>

                <div className="space-y-3">
                    {todos.map((todo) => (
                        <Card
                            key={todo.id}
                            className={`transition-all duration-200 ${todo.is_completed ? 'opacity-60' : ''}`}
                        >
                            <CardBody className="flex flex-row items-center justify-between p-4">
                                <div className="flex items-center gap-4">
                                    <Checkbox
                                        isSelected={!!todo.is_completed}
                                        onValueChange={() => toggleTodo(todo)}
                                        color="success"
                                        size="lg"
                                    />
                                    <span className={`text-lg transition-all ${todo.is_completed ? 'line-through text-default-500' : ''}`}>
                                        {todo.title}
                                    </span>
                                </div>
                                <Button
                                    isIconOnly
                                    color="danger"
                                    variant="light"
                                    onPress={() => deleteTodo(todo)}
                                    className="min-w-8 w-8 h-8"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </Button>
                            </CardBody>
                        </Card>
                    ))}

                    {todos.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-default-500 text-lg">No tasks yet. Add one above!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
