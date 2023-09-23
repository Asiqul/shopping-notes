import Navbar from '@/components/navbar/navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Table from '@/components/table/table';
import axios, { AxiosResponse } from 'axios';
import AddItem from './modal';

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [isName, setIsName] = useState<string | null>('');
    const router = useRouter();

    const getNotes = async () => {
        try {
            const response = (await axios.get('/api/notes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            })) as AxiosResponse;
            setNotes(response.data);
        } catch (error) {
            return error;
        }
    };
    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            router.push('/login');
        }
        let name = localStorage.getItem('name');
        setIsName(name);
        getNotes();
    }, []);

    return (
        <>
            <Navbar name={isName} />
            <div className="pt-20">
                <div>
                    <AddItem />
                </div>
                <Table props={notes} />
            </div>
        </>
    );
}
