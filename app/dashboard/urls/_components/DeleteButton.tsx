'use client';

import React, { useState } from 'react';
import Modal from '@components/Modal';
import { useRouter } from 'next/navigation';
import { deleteUrl } from '../actions';

export default function DeleteButton({ itemName }: { itemName: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const formRef = React.createRef<HTMLFormElement>();

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="disabled:opacity-50 disabled:cursor-default relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Eliminar
        <span className="sr-only">, {itemName}</span>
      </button>
      <form
        action={async () => {
          await deleteUrl(itemName);
          setOpen(false);
          router.refresh();
        }}
        ref={formRef}
      >
        <Modal
          show={open}
          setShow={setOpen}
          variant="error"
          title={`Eliminar URL '${itemName}'`}
          text="¿Estás seguro de que quieres eliminar este item?"
          onConfirm={() => {
            formRef.current?.requestSubmit();
          }}
        />
      </form>
    </>
  );
}
