
import React, { useState } from 'react';
import CalendarioMenstrual from '../components/CalendarioMenstrual';
import FormularioInicial from '../components/FormularioInicial';

interface DatosCiclo {
  ultimoPeriodo: Date;
  duracionCiclo: number;
  duracionPeriodo: number;
}

const Index = () => {
  const [datosCiclo, setDatosCiclo] = useState<DatosCiclo | null>(null);

  const handleDatosCompletos = (datos: DatosCiclo) => {
    setDatosCiclo(datos);
  };

  const reiniciarDatos = () => {
    setDatosCiclo(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {!datosCiclo ? (
        <FormularioInicial onDatosCompletos={handleDatosCompletos} />
      ) : (
        <CalendarioMenstrual datosCiclo={datosCiclo} onReiniciar={reiniciarDatos} />
      )}
    </div>
  );
};

export default Index;
