
export type TipoEstado = 'periodo' | 'fertil' | 'ovulacion' | 'premenstrual' | 'normal';

interface DatosCiclo {
  ultimoPeriodo: Date;
  duracionCiclo: number;
  duracionPeriodo: number;
}

export const calcularEstadoDia = (fecha: Date, datosCiclo: DatosCiclo): TipoEstado => {
  const { ultimoPeriodo, duracionCiclo, duracionPeriodo } = datosCiclo;
  
  // Calcular días desde el último período
  const diasDesdeUltimoPeriodo = Math.floor(
    (fecha.getTime() - ultimoPeriodo.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Ajustar para ciclos múltiples
  const diaEnCicloActual = diasDesdeUltimoPeriodo >= 0 
    ? diasDesdeUltimoPeriodo % duracionCiclo
    : duracionCiclo + (diasDesdeUltimoPeriodo % duracionCiclo);
  
  // Determinar el estado del día
  if (diaEnCicloActual < duracionPeriodo) {
    return 'periodo';
  }
  
  // Calcular ovulación (aproximadamente 14 días antes del siguiente período)
  const diaOvulacion = duracionCiclo - 14;
  
  // Ventana fértil: 5 días antes de ovulación + día de ovulación + 1 día después
  const inicioVentanaFertil = diaOvulacion - 5;
  const finVentanaFertil = diaOvulacion + 1;
  
  if (diaEnCicloActual === diaOvulacion) {
    return 'ovulacion';
  }
  
  if (diaEnCicloActual >= inicioVentanaFertil && diaEnCicloActual <= finVentanaFertil) {
    return 'fertil';
  }
  
  // Fase premenstrual (últimos 5 días antes del período)
  const inicioPremenstrual = duracionCiclo - 5;
  if (diaEnCicloActual >= inicioPremenstrual) {
    return 'premenstrual';
  }
  
  return 'normal';
};

export const calcularProximoPeriodo = (datosCiclo: DatosCiclo): Date => {
  const { ultimoPeriodo, duracionCiclo } = datosCiclo;
  const proximaFecha = new Date(ultimoPeriodo);
  proximaFecha.setDate(proximaFecha.getDate() + duracionCiclo);
  return proximaFecha;
};

export const calcularSiguienteOvulacion = (datosCiclo: DatosCiclo): Date => {
  const { ultimoPeriodo, duracionCiclo } = datosCiclo;
  const ovulacionFecha = new Date(ultimoPeriodo);
  ovulacionFecha.setDate(ovulacionFecha.getDate() + (duracionCiclo - 14));
  return ovulacionFecha;
};
