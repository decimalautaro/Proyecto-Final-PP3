import { Curso } from '../../cursos/entities/curso.entity';
import { Materia } from '../../materias/entities/materia.entity';
import { cursoGetDesdeAlumno } from '../../cursos/entities/curso.interface';

export interface alumnoGetAll {
  _id: string;

  __v: string;

  nombre: string;

  apellido: string;

  dni: string;

  domicilio: string;

  cursos: Curso[];

  materias: Materia[];
}

export interface alumnoGetOne {
  _id: string;

  __v: string;

  nombre: string;

  apellido: string;

  dni: string;

  domicilio: string;

  cursos: cursoGetDesdeAlumno[];
}
