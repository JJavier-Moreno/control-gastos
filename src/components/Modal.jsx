import { useState, useEffect } from "react"
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from '../components/Mensaje.jsx'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto,gastoEditar, setGastoEditar }) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    useEffect(()=>{
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setFecha(gastoEditar.fecha);
            setId(gastoEditar.id)
        }
    },[])
    const cerrarModal = () => {
        setAnimarModal(false);

        setGastoEditar({}); //Para que cuando cerremos el modal, no se quede guardado el state de editar
        setTimeout(() => {
            setModal(false);

        }, 500)
    }

    const handleSubmit = e =>{
        e.preventDefault();
        
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios');

            setTimeout(() => {
                setMensaje('');
            }, 3000);

            return;
        }

        const gasto = {
            nombre,
            cantidad,
            categoria,
            id,
            fecha
        }   

        guardarGasto(gasto);

    }

    return (
        <div className="modal">
            <div className="cerrar-modal">
                <img
                    src={CerrarBtn}
                    alt="cerrar modal"
                    onClick={cerrarModal}

                />

            </div>

            <form 
            onSubmit={handleSubmit}
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}



                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input
                        id="nombre"
                        type="text"
                        placeholder="Añade el nombre del Gasto"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />

                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        id="cantidad"
                        type="number"
                        placeholder="Añade la cantidad del gasto"
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />

                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>

                    <select
                    id="categoria"
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}>
                        <option value="">---Seleccione---</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos</option>
                        <option value="salud">Salud</option>
                        <option value="ocio">Ocio</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>

                </div>

                <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambio' : 'Añadir Gasto'}/>
            </form>

            
        </div>
    )
}

export default Modal