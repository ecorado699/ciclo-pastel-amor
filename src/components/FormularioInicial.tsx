
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Heart } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DatosCiclo {
  ultimoPeriodo: Date;
  duracionCiclo: number;
  duracionPeriodo: number;
}

interface Props {
  onDatosCompletos: (datos: DatosCiclo) => void;
}

const FormularioInicial = ({ onDatosCompletos }: Props) => {
  const [ultimoPeriodo, setUltimoPeriodo] = useState('');
  const [duracionCiclo, setDuracionCiclo] = useState(28);
  const [duracionPeriodo, setDuracionPeriodo] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!ultimoPeriodo) return;

    const datos: DatosCiclo = {
      ultimoPeriodo: new Date(ultimoPeriodo),
      duracionCiclo,
      duracionPeriodo
    };

    onDatosCompletos(datos);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-pink-300" />
          </div>
          <CardTitle className="text-2xl text-pink-200">
            Calendario Menstrual
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Ingresa tu información para comenzar a rastrear tu ciclo
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ultimo-periodo" className="text-pink-200">
                Fecha del último período
              </Label>
              <div className="relative">
                <Input
                  id="ultimo-periodo"
                  type="date"
                  value={ultimoPeriodo}
                  onChange={(e) => setUltimoPeriodo(e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
                <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracion-ciclo" className="text-pink-200">
                Duración del ciclo (días)
              </Label>
              <Input
                id="duracion-ciclo"
                type="number"
                min="21"
                max="35"
                value={duracionCiclo}
                onChange={(e) => setDuracionCiclo(Number(e.target.value))}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <p className="text-xs text-gray-500">
                Típicamente entre 21-35 días (promedio 28)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duracion-periodo" className="text-pink-200">
                Duración del período (días)
              </Label>
              <Input
                id="duracion-periodo"
                type="number"
                min="3"
                max="7"
                value={duracionPeriodo}
                onChange={(e) => setDuracionPeriodo(Number(e.target.value))}
                className="bg-gray-800 border-gray-600 text-white"
              />
              <p className="text-xs text-gray-500">
                Típicamente entre 3-7 días (promedio 5)
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-pink-300 hover:bg-pink-400 text-black font-medium"
            >
              Crear Mi Calendario
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormularioInicial;
