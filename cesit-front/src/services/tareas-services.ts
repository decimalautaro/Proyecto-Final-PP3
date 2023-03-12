import axios from 'axios';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Tarea } from '../models/Tarea';
import { manageError } from '../utils/services';

export const buscarTaresService = async (
  criterio?: string,
  page?: number,
  limit?: number
): Promise<PaginatedResponse<Tarea>> => {
  try {
    let uri = 'http://localhost:5005/api/tareas';

    let params = '';
    if (criterio) {
      params += `${criterio}`;
    }
    // if (page) {
    //   params += `page=${page}`;
    // }
    // if (limit) {
    //   params += `limit=${limit}`;
    // }
    const res = await axios.get<PaginatedResponse<Tarea>>(`${uri}?${params}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const crearTareaService = async (data: Tarea): Promise<Tarea> => {
  try {
    const res = await axios.post<Tarea>(
      'http://localhost:5005/api/tareas',
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const buscarTareaPorIdService = async (id: string): Promise<Tarea> => {
  try {
    const res = await axios.get<Tarea>(`http://localhost:5005/api/tareas/${id}`);
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const actualizarTareaService = async (
  id: string,
  data: Partial<Tarea>
) => {
  try {
    const res = await axios.patch<Tarea>(
      `http://localhost:5005/api/tareas/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const eliminarTareaPorIdService = async (id: string): Promise<Tarea> => {
  try {
    const res = await axios.delete<Tarea>(
      `http://localhost:5005/api/tareas/${id}`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
