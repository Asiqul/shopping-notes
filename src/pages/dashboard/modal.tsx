import Button from '@/components/auth/button';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import Form from '@/components/auth/form';
import axios, { AxiosResponse } from 'axios';

export default function AddItem() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addNote = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('masuk');
    try {
      const response = (await axios.post(
        '/api/add-item',
        {
          item_name: name,
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      )) as AxiosResponse;
      setName('');
      setQuantity('');
      setIsOpen(false);
    } catch (error) {
      return error;
    }
    router.reload();
  };

  return (
    <>
      <Button name="baru" size="btn-md" onClick={() => setIsOpen(true)} />

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <form className="my-3 form-control" onSubmit={addNote}>
            <h3 className="font-bold text-center text-xl my-3">Tambahkan Catatan Baru</h3>
            <Form
              type="text"
              id="item_name"
              label="Nama Barang"
              placeholder="Masukkan Nama Barang"
              onChange={(e) => setName(e.target.value)}
            />
            <Form
              type="number"
              id="quantity"
              label="Jumlah Barang"
              placeholder="Masukkan Jumlah Barang"
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className="flex gap-1 justify-center my-2 w-full">
              <Button type="button" name="batal" size="btn-sm" variant="btn-error" onClick={() => setIsOpen(false)} />
              <Button type="submit" name="simpan" size="btn-sm" variant="btn-success" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
