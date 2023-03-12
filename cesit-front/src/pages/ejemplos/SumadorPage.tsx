import { FC, useState } from 'react'

const SumadorPage: FC = () => {

    const [suma, setSuma] = useState<number>(10);
    const [nombre, setNombre] = useState<string>('');
    
    const sumar = () => {
        setSuma(suma + 1);
    }

    console.info("-- renderizando el componente")

  return (
    <div>
        <h2>Sumador</h2>
        <p>El valor de la suma es {suma}</p>
        <h3>Nombre: {nombre}</h3>
        <button onClick={sumar}>Sumar 1</button>
        <button onClick={() => setNombre(`Juan ${suma}`)}>Actualizar Nombre</button>
    </div>
  )
}

export default SumadorPage;