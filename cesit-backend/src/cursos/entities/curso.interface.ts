import { CondicionValida } from './curso.enums';
import { Materia } from '../../materias/entities/materia.entity';

export interface cursoGetDesdeAlumno {
  anio: number;

  condicion: CondicionValida;

  nota: number;

  presentismo: number;

  materia: Materia;
}
