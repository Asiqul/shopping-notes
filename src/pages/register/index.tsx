import Button from '@/components/auth/button';
import Form from '@/components/auth/form';
import Options from '@/components/auth/options';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isAuth = () => {
    if (localStorage.getItem('userToken')) {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      (await axios.post('/api/register', {
        name,
        email,
        password,
      })) as AxiosResponse;
    } catch (error) {
      const axiosError = error as AxiosError;
      const response = axiosError.response as AxiosResponse;
      const message = response?.data;
      const err = message.message;
      setError(err);
      return error;
    }
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form className="card form-control shadow-md mx-3 max-w-2xl w-full" onSubmit={handleRegister}>
        <div className="card-body">
          <h5 className="card-title text-3xl justify-center mb-4">Daftar</h5>
          {error && <h1 className="text-center text-red-700">{error}</h1>}
          <Form
            type="text"
            placeholder="John Doe"
            id="name"
            label="Nama Lengkap :"
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button name="Daftar" type="submit" size="w-1/3" />
        </div>
        <div>
          <Options type="register" />
        </div>
      </form>
    </div>
  );
}
