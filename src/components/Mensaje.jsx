import React from 'react'

const Mensaje = ({children, tipo}) => { //Así podemos ponerle diferentes clases dependiendo del tipo
  return (
    <div className={`alerta ${tipo}`}> 
        {children}
    </div>
  )
}

export default Mensaje