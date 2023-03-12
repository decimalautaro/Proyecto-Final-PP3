import HolaMundoComp from '../../components/introduccion/HolaMundoComp'
import { MostrarTitulo } from '../../components/introduccion/MostrarTitulo'
import TarjetaDePrueba from '../../components/introduccion/TarjetaDePrueba'

const PrimerEjemploPage = () => {
  return (
    <div>
        <HolaMundoComp />
        <MostrarTitulo value="Titulo 1" subtitle='PRINCIPAL' />
        <MostrarTitulo value="Titulo 2" />
        <MostrarTitulo value="Titulo 3" />
        <TarjetaDePrueba>
          <MostrarTitulo value="Uno" />
          <MostrarTitulo value="Dos" />
        </TarjetaDePrueba>
    </div>
  )
}

export default PrimerEjemploPage