"use client";

import React, { useState } from 'react';
import { Item } from '@prisma/client';
import Modal from '@components/Modal';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ item }: { item: Item }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const onDelete = async () => {
    await fetch(`/api/ventas/item/${item.id}`, {
      method: 'DELETE'
    });
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="disabled:opacity-50 disabled:cursor-default relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Eliminar
        <span className="sr-only">, {item.nombre}</span>
      </button>
      <Modal
        onConfirm={onDelete}
        show={open}
        setShow={setOpen}
        variant="error"
        title="Eliminar item"
        text="¿Estás seguro de que quieres eliminar este item?"
      />
    </>
  );
}
