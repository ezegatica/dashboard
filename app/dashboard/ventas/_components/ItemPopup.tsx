import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Item } from '@prisma/client';
import Spinner from '@components/Spinner';
import { useRouter } from 'next/navigation';

export default function ItemPopup({
  open,
  setOpen,
  item
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
  item?: Item;
}) {
  const router = useRouter();
  const [data, setData] = useState<
    Omit<Item, 'id' | 'updatedAt' | 'createdAt' | 'vendido'>
  >({
    nombre: item?.nombre || '',
    descripcion: item?.descripcion || '',
    short_descripcion: item?.short_descripcion || '',
    precio: item?.precio || 0,
    imagen: item?.imagen || [],
    slug: item?.slug || ''
  });
  const [loading, setLoading] = useState(false);
  const [imagenes, setImagenes] = useState<string>(
    item?.imagen.join('\n') || ''
  );

  const onChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const body = {
      ...data,
      imagen: imagenes.split('\n'),
      precio: Number(data.precio)
    };
    try {
      if (item) {
        // Update
        await fetch(`/api/ventas/item/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
      } else {
        // Create
        await fetch(`/api/ventas/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        setData({
          nombre: '',
          descripcion: '',
          short_descripcion: '',
          precio: 0,
          imagen: [],
          slug: ''
        });
      }
      // After update or create, refresh the page
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                  <form
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                    onSubmit={onSubmit}
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              {item ? 'Editar' : 'Nuevo'} item
                            </Dialog.Title>
                            <p className="text-sm text-gray-500">
                              {item
                                ? 'Edita un item existente'
                                : 'Crea un nuevo item'}{' '}
                              para mostrar en la tienda! Este se mostrará en el
                              listado de objetos y en la busqueda.
                            </p>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Divider container */}
                      <div className="space-y-6 py-6 sm:space-y-0 sm:divide-y sm:divide-gray-200 sm:py-0">
                        {/* Item Slug */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="nombre"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Item Slug
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <div className="mt-2 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
                                /p/
                              </span>
                              <input
                                type="text"
                                name="slug"
                                id="slug"
                                required
                                value={data.slug}
                                onChange={onChange}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="item-name"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Item name */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="nombre"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Nombre del producto
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="nombre"
                              id="nombre"
                              value={data.nombre}
                              onChange={onChange}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        {/* Item short descripcion */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="short_descripcion"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Descripcion corta
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="text"
                              name="short_descripcion"
                              id="short_descripcion"
                              value={data.short_descripcion}
                              onChange={onChange}
                              required
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        {/* Item descripcion */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="descripcion"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Descripcion
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                              id="descripcion"
                              name="descripcion"
                              required
                              onChange={onChange}
                              value={data.descripcion}
                              rows={5}
                              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        {/* Item Precio */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Precio
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              type="number"
                              name="precio"
                              value={data.precio}
                              onChange={onChange}
                              id="precio"
                              min={0}
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0"
                              aria-describedby="price-currency"
                            />
                          </div>
                        </div>

                        {/* Item images */}
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <div>
                            <label
                              htmlFor="imagen"
                              className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                            >
                              Imagenes (separadas por ENTER)
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <textarea
                              id="imagen"
                              name="imagen"
                              required
                              onChange={event =>
                                setImagenes(event.target.value)
                              }
                              value={imagenes}
                              rows={5}
                              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0 border-t border-gray-200 px-4 py-5 sm:px-6">
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="disabled:opacity-50 disabled:cursor-default inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {loading ? <Spinner size="small" /> : 'Create'}
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
