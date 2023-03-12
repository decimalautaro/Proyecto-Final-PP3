import { FC, ReactNode } from 'react';

interface TarjetaDePruebaProps {
  children?: ReactNode;
}

const TarjetaDePrueba: FC<TarjetaDePruebaProps> = (props) => {
  return (
    <div>
      <h2>Tarjeta de prueba</h2>
      {props.children}
    </div>
  );
};

export default TarjetaDePrueba;
