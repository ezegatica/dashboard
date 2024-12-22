'use client';

import React, { useMemo, useState } from 'react';
import { getShortenerURL } from '../../../../lib/urls';
import Toast from '../../../../components/Toast';

export default function CopyButton({ itemName }: { itemName: string }) {
  const [showToast, setShowToast] = useState(false)
  const fullUrl = useMemo(() => `${getShortenerURL()}/${itemName}`, [itemName])
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setShowToast(true)
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  return (
    <>
      <button
        type="button"
        onClick={copyToClipboard}
        className="disabled:opacity-50 disabled:cursor-default relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
      >
        Copiar
        <span className="sr-only">, {itemName}</span>
      </button>
      <Toast
        title="Enlace copiado"
        message="Copiado al portapapeles"
        onClose={() => setShowToast(false)}
        closeAfter={5000}
        show={showToast}
        variant="success"
      />
    </>
  );
}
