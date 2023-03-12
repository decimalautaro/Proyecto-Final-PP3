import { FC } from 'react';

interface MostrarTituloProps {
  value: string;
  subtitle?: string;
}

export const MostrarTitulo: FC<MostrarTituloProps> = ({ value, subtitle }) => {
  return (
    <div>
      <h3>Hola como estas {value}?</h3>
      {subtitle && <h4>Este es el subtitulo {subtitle}!</h4>}
    </div>
  );
};
