"use client";

import React, { useState } from 'react';
import UrlPopup from './UrlPopup';

export default function AddButton() {
  const [show, setShow] = useState(false);
  const onClick = () => {
    setShow(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Agregar URL
      </button>
      <UrlPopup open={show} setOpen={setShow} />
    </>
  );
}
