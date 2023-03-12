import { useState } from 'react'
import EjemploDeEfecto from './EjemploDeEfecto'
import EjemploIntegrador from './EjemploIntegrador'
import EjemploIntegradorEffect from './EjemploIntegradorEffect'
import EjemploRedux from './EjemploRedux'
import EjemploRedux2 from './EjemploRedux2'
import PrimerEjemploPage from './PrimerEjemploPage'
import SumadorPage from './SumadorPage'

enum RouteEnum {
  PRIMER_EJEMPLO = "page-priemer",
  SUMADOR = "page-sumador",
  EFECTO = "page-efecto",
  INTEGRADOR = "page-integrador",
  INTEGRADOR_EFFECT = "page-integrador-effect",
  REDUX = "page-redux"
}


const Ejemplos = () => {
    const [route, setRoute] = useState<RouteEnum>(RouteEnum.PRIMER_EJEMPLO)

    return (
      <>
        <div>
          <button onClick={() => setRoute(RouteEnum.PRIMER_EJEMPLO)}>Primer Ejemplo</button>
          <button onClick={() => setRoute(RouteEnum.SUMADOR)}>Sumador</button>
          <button onClick={() => setRoute(RouteEnum.EFECTO)}>Efecto</button>
          <button onClick={() => setRoute(RouteEnum.INTEGRADOR)}>Ejemplo Integrador</button>
          <button onClick={() => setRoute(RouteEnum.INTEGRADOR_EFFECT)}>Ejemplo Integrador con Effect</button>
          <button onClick={() => setRoute(RouteEnum.REDUX)}>Ejemplo REDUX</button>
        </div>
        {route === RouteEnum.PRIMER_EJEMPLO && <PrimerEjemploPage />}
        {route === RouteEnum.SUMADOR && <SumadorPage />}
        {route === RouteEnum.EFECTO && <EjemploDeEfecto />}
        {route === RouteEnum.INTEGRADOR && <EjemploIntegrador />}
        {route === RouteEnum.INTEGRADOR_EFFECT && <EjemploIntegradorEffect />}
        {route === RouteEnum.REDUX && <EjemploRedux />}
        {route === RouteEnum.REDUX && <EjemploRedux2 />}
      </>
    )
}

export default Ejemplos