'use client';

import { items } from '@prisma/client';
import React, { useState } from 'react';
import ItemPopup from './ItemPopup';

export default function EditButton({ item }: { item: items }) {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="disabled:opacity-50 disabled:cursor-default relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Editar<span className="sr-only">, {item.nombre}</span>
      </button>
      <ItemPopup open={show} setOpen={setShow} item={item} />
    </>
  );
}
