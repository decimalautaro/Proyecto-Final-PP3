import axios from 'axios';
import { useState } from 'react'

interface Tarea {
    _id: string;
    nombre: string;
    descripcion: string;
}

const EjemploIntegrador = () => {

    const [tareas, setTareas] = useState<Tarea[]>([]);

    console.info("--- renderizando");

    const buscarTareasHandler = async () => {
        try {
            const res = await axios.get<Tarea[]>('http://localhost:5005/api/tareas');
            setTareas(res.data);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
        <h3>Ejemplo Integrador</h3>
        {JSON.stringify(tareas)}
        <hr />
        <ul>
            {tareas.map(tarea => <li key={tarea._id}>{tarea.nombre}</li>)}
        </ul>
        <button onClick={buscarTareasHandler}>Buscar Tareas</button>
    </>
  )
}

export default EjemploIntegrador