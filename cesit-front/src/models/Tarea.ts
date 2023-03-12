export interface Tarea {
  _id?: string;
  nombre: string;
  descripcion: string;
  finalizada: boolean;
  fechaLimite?: Date | undefined;
  progreso: number;
}
