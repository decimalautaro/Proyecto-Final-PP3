import React, { useEffect, useState } from 'react';

const EjemploDeEfecto = () => {
  const [suma, setSuma] = useState(0);

  useEffect(() => {
    console.info('Se renderizó el componente');

    // devolver esto no es obligatorio
    return () => {
      console.info('El componente se desmontó OK');
    };
  }, []);

  useEffect(() => {
    console.info('la suma ha cambiado');
  }, [suma]);

  return (
    <>
      <h3>EjemploDeEfecto - Suma {suma}</h3>
      <button onClick={() => setSuma(suma + 1)}>Sumar</button>
    </>
  );
};

export default EjemploDeEfecto;
