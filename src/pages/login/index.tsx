import Button from '@/components/auth/button';
import Form from '../../components/auth/form';
import Options from '@/components/auth/options';
import { useRouter } from 'next/router';
import { useState, useEffect, SyntheticEvent } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import jwt_decode from 'jwt-decode';

interface User {
    id: string;
    name: string;
    email: string;
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const isAuth = () => {
        if (localStorage.getItem('userToken')) {
            router.push('/dashboard');
        }
    };

    useEffect(() => {
        isAuth();
    }, []);

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = (await axios.post('/api/login', {
                email: email,
                password: password,
            })) as AxiosResponse;

            const token = response.data.token;
            const user: User = jwt_decode(token);

            localStorage.setItem('userToken', token);
            localStorage.setItem('name', user.name);
        } catch (error) {
            const axiosError = error as AxiosError;
            const response = axiosError.response as AxiosResponse;
            const message = response?.data;
            const err = message.message;
            setError(err);
            return error;
        }
        window.location.href = '/dashboard';
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <form className="card form-control shadow-md mx-3 max-w-2xl w-full" onSubmit={handleLogin}>
                <div className="card-body">
                    <h5 className="card-title text-3xl justify-center mb-4 text-blue-600">Masuk</h5>
                    {error && <h1 className="text-center text-red-700">{error}</h1>}
                    <Form
                        type="email"
                        placeholder="example@gmail.com"
                        id="email"
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form
                        type="password"
                        placeholder="********"
                        id="password"
                        label="Kata sandi"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <Button name="Masuk" type="submit" size="w-1/3" />
                </div>
                <div>
                    <Options type="login" />
                </div>
            </form>
        </div>
    );
}
