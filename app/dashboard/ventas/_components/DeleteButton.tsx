"use client";

import React, { useState } from 'react';
import { items } from '@prisma/client';
import Modal from '@components/Modal';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ item }: { item: items }) {
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
        buttonText="Eliminar"
        title="Eliminar item"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      />
    </>
  );
}
