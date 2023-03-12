import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Curso } from "../models/Curso";
import { buscarCursosService, buscarCursoPorIdService, CustomError, eliminarCursoPorIdService } from "../services/cursos-services";
import type { RootState } from '../store/store';

interface CursosState {
    cursos: Curso[];
    offset: number;
    limit: number;
    cantidadPaginas: number;
    cargando: boolean;
    cursoSeleccionado: Curso | null;
    mensajeError: string | null;
    criterio: Record<string, string> | null;

}

const initialState: CursosState = {
    cursos: [],
    offset: 0,
    limit: 10,
    cantidadPaginas: 0,
    cargando: false,
    cursoSeleccionado: null,
    mensajeError: null,
    criterio: null
}

export const cursosSlice = createSlice({
    name: 'curso',
    initialState,
    reducers: {
        setCargando: (state, { payload }: PayloadAction<boolean>) => {
            state.cargando = payload;
        },
        limpiarCurso: (state) => {
            state.cursos = initialState.cursos;
        },
        setCriterio: (
            state,
            { payload }: PayloadAction<Record<string, string> | null>
        ) => {
            state.criterio = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(buscarCurso.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            buscarCurso.fulfilled,
            (state, { payload }: PayloadAction<PaginatedResponse<Curso>>) => {
                state.cursos = payload.data || [];
                state.offset = Math.round(payload.offset / payload.limit) + 1;
                state.cantidadPaginas = Math.round(payload.total / payload.limit);
                state.limit = payload.limit;
                state.cargando = false;
            }
        );

        builder.addCase(buscarCurso.rejected, (state, { payload }: PayloadAction<CustomError | undefined>) => {
            state.mensajeError = payload?.message || 'Error desconocido';
            state.cargando = false;
        });

        builder.addCase(buscarCursoPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            buscarCursoPorId.fulfilled,
            (state, { payload }: PayloadAction<Curso | null>) => {
                state.cursoSeleccionado = payload || null;
                state.cargando = false;
            }
        );
        builder.addCase(
            buscarCursoPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
        builder.addCase(eliminarCursoPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            eliminarCursoPorId.fulfilled,
            (state, { payload }: PayloadAction<Curso | null>) => {
                state.cursoSeleccionado = null;
                state.cursos = state.cursos.filter(
                    (curso) => curso._id !== payload?._id
                );
                state.cargando = false;
            }
        );
        builder.addCase(
            eliminarCursoPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
    }
});
export const { setCargando, limpiarCurso, setCriterio } = cursosSlice.actions

export default cursosSlice.reducer


interface BuscarCursosQuery {
    limit: number;
    offset: number;
}
export const buscarCurso = createAsyncThunk<
    PaginatedResponse<Curso>,
    BuscarCursosQuery | void,
    { rejectValue: CustomError }
>('curso/buscarCurso', async (params: BuscarCursosQuery | void, thunkApi) => {
    try {
        const state = thunkApi.getState() as RootState;
        let criterio = state.curso.criterio || ({} as Record<string, string>);
        if (params?.limit && params?.offset) {
            criterio = { ...criterio, limit: params.limit.toString() };
            const offsetLimit = (params.offset - 1) * params.limit;
            criterio = { ...criterio, offset: offsetLimit.toString() };
        }

        let cursosRes: PaginatedResponse<Curso>;

        cursosRes = await buscarCursosService(
            new URLSearchParams(criterio).toString()
        );

        return cursosRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});
export const buscarCursoPorId = createAsyncThunk<
    Curso,
    string,
    { rejectValue: CustomError }
>('curso/buscarCursoPorId', async (id: string, thunkApi) => {
    try {
        const cursoRes = await buscarCursoPorIdService(id);
        return cursoRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});

export const eliminarCursoPorId = createAsyncThunk<
    Curso,
    string,
    { rejectValue: CustomError }
>('curso/eliminarCursoPorId', async (id: string, thunkApi) => {
    try {
        const cursoRes = await eliminarCursoPorIdService(id);
        return cursoRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});
