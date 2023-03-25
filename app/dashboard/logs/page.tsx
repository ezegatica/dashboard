import Link from 'next/link';
import React from 'react';

export default function LogsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-900 mt-2">
        Elije un tipo de logs para ver
      </h1>
      <p className="mt-2 text-sm text-gray-700">
        Los logs de errores y de salida del bot son extraidos de la consola del bot. Los logs de errores son los que el bot no pudo procesar y throweó algo y los logs de salida son los comandos que el bot ejecutó.
      </p>
    </div>
  );
}
