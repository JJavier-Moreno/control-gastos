import { useEffect, useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import Modal from './components/Modal';
import { generarId } from './helpers/index'
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';

function App() {

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );


  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(()=>{

    if(Object.keys(gastoEditar).length > 0 ){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500)

    }

  },[gastoEditar])


  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)

  }

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto  ?? 0) //Si no existe presupuesto le ponemos un 0
  }, [presupuesto])

  
  useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos)) ?? []//Si no existe gasto le ponemos un 0
  }, [gastos])


  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0 ){
      setIsValidPresupuesto(true);
    }
  }, [])

  useEffect(()=>{
    if(filtro){
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro);

      setGastosFiltrados(gastosFiltrados);
    }
  },[filtro])



  const guardarGasto = (gasto) => {

    if(gasto.id){
      //Actualizar gasto
      const gastosActualizados = gastos.map((gastoState)=>
        gastoState.id === gasto.id ? gasto : gastoState
      )

      setGastos(gastosActualizados);
      setGastoEditar({}); //Limpiamos el state
    }else{
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }


    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500)

  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id);

    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>

        <main>

          <Filtros 
          setFiltro={setFiltro}
          filtro={filtro}
          />

          <ListadoGastos
          gastos={gastos}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
          filtro={filtro}
          gastosFiltrados={gastosFiltrados}
          />
        </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>

      )}

      {modal && <Modal setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}


    </div>
  )
}

export default App
