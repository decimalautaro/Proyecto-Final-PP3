import axios, { AxiosError, AxiosResponse } from 'axios';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Materia } from '../models/Materia';
import { back_end_url } from '../utils/constants';

const URL = `${back_end_url}/materias`


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

export const buscarMateriaService = async (criterio?: string): Promise<PaginatedResponse<Materia>> => {
    try {
        let params = '';
        if (criterio) {
        params += `${criterio}`;
        }

        const res = await axios.get<PaginatedResponse<Materia>>(`${URL}?${params}`);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const crearMateriaService = async (data: Materia): Promise<Materia> => {
    try {
        const res = await axios.post<Materia>(
            URL,
            data
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const buscarMateriaPorIdService = async (id: string): Promise<Materia> => {
    try {
        const res = await axios.get<Materia>(`${URL}/${id}`);
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const actualizarMateriaService = async (
    id: string,
    data: Partial<Materia>
) => {
    const body = {
        nombre: data.nombre,
        profesor: data.profesor,
        duracion: data.duracion,
        condicionMateria: data.condicionMateria
    };
    try {
        const res = await axios.patch<Materia>(
            `${URL}/${id}`,
            body
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};

export const eliminarMateriaPorIdService = async (id: string): Promise<Materia> => {
    try {
        const res = await axios.delete<Materia>(
            `${URL}/${id}`
        );
        return res.data;
    } catch (error) {
        throw manageError(error);
    }
};