import React from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardHeader, CardBody, Input, Button } from "@heroui/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-default-50">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="flex flex-col gap-1 pb-0">
                    <h1 className="text-2xl font-bold text-center w-full">Admin Access</h1>
                    <p className="text-sm text-default-500 text-center w-full">Enter your credentials to continue</p>
                </CardHeader>
                <CardBody className="gap-6 p-8">
                    {errors.message && (
                        <div className="bg-danger-50 text-danger-600 px-4 py-2 rounded-lg text-sm border border-danger-200">
                            {errors.message}
                        </div>
                    )}

                    <form onSubmit={submit} className="flex flex-col gap-4">
                        <Input
                            label="Username"
                            placeholder="Enter your username"
                            value={data.username}
                            onValueChange={(val) => setData('username', val)}
                            isInvalid={!!errors.username}
                            errorMessage={errors.username}
                            variant="underlined"
                            color='secondary'
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onValueChange={(val) => setData('password', val)}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password}
                            variant="underlined"
                            color='secondary'
                        />

                        <Button
                            type="submit"
                            color="primary"
                            isLoading={processing}
                            className="w-full font-semibold shadow-lg"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}
