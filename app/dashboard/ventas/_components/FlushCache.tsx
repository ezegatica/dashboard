'use client';
import React from 'react';
import { revalidateAll } from '../../../../lib/cache';

export default function FlushCacheButton() {
  return (
    // @ts-ignore TS2322 (Server actions)
    (<form action={revalidateAll}>
      <button
        type="submit"
        className="block rounded-md bg-orange-500 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
       Limpiar cache
      </button>
    </form>)
  );
}
