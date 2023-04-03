'use client';
import React, { useState } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import ModalWrapper from '@components/ModalWrapper';
import { uploadImage } from '../api';
import {useRouter} from 'next/navigation';

export default function AddImage({ token }: { token: string }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const onClick = () => {
    setOpen(true);
  };

  const onConfirm = async () => {
    if (!file) return;
    await uploadImage(token, file);
    
    setOpen(false);
    clearImage();
    router.refresh();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const onCancel = () => {
    clearImage();
    setOpen(false);
  };

  const clearImage = () => {
    setFile(undefined);
  };
  return (
    <>
      {/* Button */}
      <button
        type="button"
        onClick={onClick}
        className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Agregar imagen
      </button>
      {/* Modal */}
      <ModalWrapper
        open={open}
        setOpen={setOpen}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        <div>
          {!file ? (
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or JPEG
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={e => onChange(e)}
                />
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              {/* Add a overlay that when on hover, shows a delete button */}
              <div
                className="absolute top-5 right-5 z-10 flex items-center justify-center p-1 w-8 h-8 bg-red-600 rounded-full cursor-pointer"
                onClick={clearImage}
              >
                <TrashIcon color="white" />
              </div>
              <Image
                src={URL.createObjectURL(file)}
                alt="Imagen"
                width={500}
                height={500}
              />
            </div>
          )}
        </div>
      </ModalWrapper>
    </>
  );
}
