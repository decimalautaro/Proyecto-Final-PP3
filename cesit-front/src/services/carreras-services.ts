import axios, { AxiosError } from 'axios';
import { Carrera } from '../models/Carrera';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';

export class CustomError extends Error {
  constructor(public code: number, public message: string) {
    super(message);
  }
}

const manageError = (error: unknown): CustomError => {
  if (error instanceof AxiosError) {
    return new CustomError(error?.response?.status || 400, error.message);
  } else {
    return new CustomError(500, 'Error desconocido');
  }
};

export const buscarCarrerasService = async (
  criterio?: string,
  page?: number,
  limit?: number
): Promise<PaginatedResponse<Carrera>> => {
  try {
    let uri = 'http://localhost:5005/api/carreras';

    let params = '';
    if (criterio) {
      params += `${criterio}`;
    }
    const res = await axios.get<PaginatedResponse<Carrera>>(`${uri}?${params}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const crearCarreraService = async (
  carrera: Partial<Carrera>
): Promise<Carrera | null> => {
  try {
    const res = await axios.post<Carrera>(
      'http://localhost:5005/api/carreras',
      carrera
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const buscarCarreraPorIdService = async (
  id: string
): Promise<Carrera> => {
  try {
    const res = await axios.get<Carrera>(
      `http://localhost:5005/api/carreras/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const actualizarCarreraService = async (
  id: string,
  data: Partial<Carrera>
) => {
  let body = {
    nombre: data.nombre,
    duracion: data.duracion,
    horario: data.horario,
    plan: data.plan,
  }
  try {

    const res = await axios.patch<Carrera>(
      `http://localhost:5005/api/carreras/${id}`,
      body
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const eliminarCarreraPorIdService = async (
  id: string
): Promise<Carrera> => {
  try {
    const res = await axios.delete<Carrera>(
      `http://localhost:5005/api/carreras/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
