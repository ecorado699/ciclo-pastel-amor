import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Settings, Heart, Droplet } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { calcularEstadoDia, TipoEstado } from '../utils/calculosCiclo';

interface DatosCiclo {
  ultimoPeriodo: Date;
  duracionCiclo: number;
  duracionPeriodo: number;
}

interface Props {
  datosCiclo: DatosCiclo;
  onReiniciar: () => void;
}

const CalendarioMenstrual = ({ datosCiclo, onReiniciar }: Props) => {
  const [fechaActual, setFechaActual] = useState(new Date());

  const diasDelMes = useMemo(() => {
    const inicioMes = startOfMonth(fechaActual);
    const finMes = endOfMonth(fechaActual);
    return eachDayOfInterval({ start: inicioMes, end: finMes });
  }, [fechaActual]);

  const mesAnterior = () => setFechaActual(subMonths(fechaActual, 1));
  const mesSiguiente = () => setFechaActual(addMonths(fechaActual, 1));

  const obtenerClaseDia = (estado: TipoEstado): string => {
    const baseClasses = "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all hover:scale-110";
    
    switch (estado) {
      case 'periodo':
        return `${baseClasses} bg-fuchsia-300 text-gray-800`;
      case 'fertil':
        return `${baseClasses} bg-green-200 text-gray-800`;
      case 'ovulacion':
        return `${baseClasses} bg-cyan-200 text-gray-800 ring-2 ring-cyan-300`;
      case 'premenstrual':
        return `${baseClasses} bg-violet-200 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-600 hover:bg-gray-200`;
    }
  };

  const obtenerIconoEstado = (estado: TipoEstado) => {
    switch (estado) {
      case 'periodo':
        return <Droplet className="h-3 w-3" />;
      case 'ovulacion':
        return <Heart className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const proximoPeriodo = useMemo(() => {
    const diasDesdeUltimoPeriodo = Math.floor(
      (new Date().getTime() - datosCiclo.ultimoPeriodo.getTime()) / (1000 * 60 * 60 * 24)
    );
    const diasHastaSiguiente = datosCiclo.duracionCiclo - (diasDesdeUltimoPeriodo % datosCiclo.duracionCiclo);
    const fechaProximoPeriodo = new Date();
    fechaProximoPeriodo.setDate(fechaProximoPeriodo.getDate() + diasHastaSiguiente);
    return fechaProximoPeriodo;
  }, [datosCiclo]);

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-pink-400">Mi Calendario Menstrual</h1>
            <p className="text-gray-600">
              Próximo período: {format(proximoPeriodo, 'dd \'de\' MMMM', { locale: es })}
            </p>
          </div>
          <Button
            onClick={onReiniciar}
            variant="outline"
            className="border-pink-300 text-pink-400 hover:bg-pink-50"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>

        {/* Leyenda */}
        <Card className="bg-pink-50 border-pink-200">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-fuchsia-300"></div>
                <span className="text-sm text-gray-700">Período</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-200"></div>
                <span className="text-sm text-gray-700">Días fértiles</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-200 ring-2 ring-cyan-300"></div>
                <span className="text-sm text-gray-700">Ovulación</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-violet-200"></div>
                <span className="text-sm text-gray-700">Premenstrual</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendario */}
        <Card className="bg-pink-50 border-pink-200">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Button
                onClick={mesAnterior}
                variant="ghost"
                size="sm"
                className="text-pink-400 hover:bg-pink-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-xl text-pink-400">
                {format(fechaActual, 'MMMM yyyy', { locale: es })}
              </CardTitle>
              <Button
                onClick={mesSiguiente}
                variant="ghost"
                size="sm"
                className="text-pink-400 hover:bg-pink-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dia) => (
                <div key={dia} className="text-center text-sm font-medium text-gray-600 p-2">
                  {dia}
                </div>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-2">
              {diasDelMes.map((dia) => {
                const estado = calcularEstadoDia(dia, datosCiclo);
                const esHoy = isSameDay(dia, new Date());
                
                return (
                  <div
                    key={dia.toISOString()}
                    className={`relative ${obtenerClaseDia(estado)} ${
                      esHoy ? 'ring-2 ring-pink-400' : ''
                    }`}
                  >
                    {format(dia, 'd')}
                    {obtenerIconoEstado(estado) && (
                      <div className="absolute -top-1 -right-1">
                        {obtenerIconoEstado(estado)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-pink-50 border-pink-200">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <h3 className="font-medium text-pink-400">Duración del Ciclo</h3>
              <p className="text-2xl font-bold text-gray-800">{datosCiclo.duracionCiclo} días</p>
            </CardContent>
          </Card>
          
          <Card className="bg-pink-50 border-pink-200">
            <CardContent className="p-4 text-center">
              <Droplet className="h-8 w-8 text-fuchsia-400 mx-auto mb-2" />
              <h3 className="font-medium text-fuchsia-400">Duración del Período</h3>
              <p className="text-2xl font-bold text-gray-800">{datosCiclo.duracionPeriodo} días</p>
            </CardContent>
          </Card>
          
          <Card className="bg-pink-50 border-pink-200">
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 bg-cyan-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Heart className="h-4 w-4 text-gray-700" />
              </div>
              <h3 className="font-medium text-cyan-400">Último Período</h3>
              <p className="text-sm font-medium text-gray-800">
                {format(datosCiclo.ultimoPeriodo, 'dd/MM/yyyy')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarioMenstrual;
