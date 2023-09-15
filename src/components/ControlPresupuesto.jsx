import React from 'react'

import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { useState,useEffect } from 'react'

const ControlPresupuesto = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);
 
    const [porcentaje, setPorcentaje] = useState(0);

    useEffect(()=>{

        const totalGastado = gastos.reduce((total, gasto)=>
             gasto.cantidad + total, 0
        )

        const totaldisponible = presupuesto - totalGastado;

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totaldisponible) / presupuesto) * 100).toFixed(2);

        
        setGastado(totalGastado);
        setDisponible(totaldisponible);

        setTimeout(()=>{
            setPorcentaje(nuevoPorcentaje);
        }, 1500)

    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar presupuesto y gastos');

        if(resultado){
            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);   
                    }
    }



    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

            <div>
                <CircularProgressbar
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? 'DC2626' : '#3B82F6'
                })}/>
            </div>
            
            <div className='contenido-presupuesto'>
                <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
                >
                    Resetear APP
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo': ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>

            </div>

        </div>
    )
}

export default ControlPresupuesto