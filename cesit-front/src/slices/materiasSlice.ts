import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Materia } from '../models/Materia';
import {
    buscarMateriaPorIdService,
    buscarMateriaService,
    CustomError,
    eliminarMateriaPorIdService,
} from '../services/materias-services';
import type { RootState } from '../store/store';


// Define a type for the slice state
interface MateriasState {
    materias: Materia[];
    materiaSeleccionada: Materia | null;
    cargando: boolean;
    cantidadMaterias: number;
    mensajeError: string | null;
    offset: number;
    limit: number;
    cantidadPaginas: number;
    criterio: Record<string, string> | null;
}

// Define the initial state using that type
const initialState: MateriasState = {
    materias: [],
    materiaSeleccionada: null,
    cargando: false,
    cantidadMaterias: 0,
    mensajeError: null,
    offset: 0,
    limit: 10,
    cantidadPaginas: 0,
    criterio: null
};

export const materiasSlice = createSlice({
    name: 'materia',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setCargando: (state, { payload }: PayloadAction<boolean>) => {
            state.cargando = payload;
        },
        limpiarMaterias: (state) => {
            state.materias = initialState.materias;
            state.cantidadMaterias = 0;
        },
        setCriterio: (
          state,
          { payload }: PayloadAction<Record<string, string> | null>
        ) => {
          state.criterio = payload;
        },
    },
    extraReducers: (builder) => {
        // Buscar materia
        builder.addCase(buscarMaterias.pending, (state) => {
            state.cargando = true;
            state.cantidadMaterias = 0;
            state.mensajeError = null;
        });
        builder.addCase(
            buscarMaterias.fulfilled,
            (state, { payload }: PayloadAction<PaginatedResponse<Materia>>) => {
                state.materias = payload.data || [];
                state.offset = Math.round(payload.offset / payload.limit) + 1;
                state.cantidadPaginas = Math.round(payload.total / payload.limit);
                state.limit = payload.limit;
                state.cargando = false;
            }
        );
        builder.addCase(
            buscarMaterias.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );


        // Buscar Materia por ID
        builder.addCase(buscarMateriaPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            buscarMateriaPorId.fulfilled,
            (state, { payload }: PayloadAction<Materia | null>) => {
                state.materiaSeleccionada = payload || null;
                state.cargando = false;
            }
        );
        builder.addCase(
            buscarMateriaPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );


        // Eliminar materia por ID
        builder.addCase(eliminarMateriaPorId.pending, (state) => {
            state.cargando = true;
            state.mensajeError = null;
        });
        builder.addCase(
            eliminarMateriaPorId.fulfilled,
            (state, { payload }: PayloadAction<Materia | null>) => {
                state.materiaSeleccionada = null;
                state.materias = state.materias.filter(
                    (materia) => materia._id !== payload?._id
                );
                state.cargando = false;
            }
        );
        builder.addCase(
            eliminarMateriaPorId.rejected,
            (state, { payload }: PayloadAction<CustomError | undefined>) => {
                state.mensajeError = payload?.message || 'Error desconocido';
                state.cargando = false;
            }
        );
    },
});

export const { setCargando, limpiarMaterias, setCriterio } = materiasSlice.actions;

export default materiasSlice.reducer;

// Extra reducers
interface BuscarMateriasQuery {
    limit: number;
    offset: number;
}

export const buscarMaterias = createAsyncThunk<
    PaginatedResponse<Materia>,
    BuscarMateriasQuery | void,
    { rejectValue: CustomError }
>('materia/buscarMaterias', async (params: BuscarMateriasQuery | void, thunkApi) => {
    try {
        const state = thunkApi.getState() as RootState;
        let criterio = state.materia.criterio || ({} as Record<string, string>);
        
        if (params?.limit && params?.offset) {
        criterio = { ...criterio, limit: params.limit.toString() };
        const offsetLimit = (params.offset - 1) * params.limit;
        criterio = { ...criterio, offset: offsetLimit.toString() };
        }

        let materiaRes: PaginatedResponse<Materia>;

        materiaRes = await buscarMateriaService(
            new URLSearchParams(criterio).toString()
        );

        return materiaRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});

export const buscarMateriaPorId = createAsyncThunk<
    Materia,
    string,
    { rejectValue: CustomError }
>('materia/buscarMateriaPorId', async (id: string, thunkApi) => {
    try {
        const materiaRes = await buscarMateriaPorIdService(id);
        return materiaRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});

export const eliminarMateriaPorId = createAsyncThunk<
    Materia,
    string,
    { rejectValue: CustomError }
>('materia/eliminarMateriaPorId', async (id: string, thunkApi) => {
    try {
        const materiaRes = await eliminarMateriaPorIdService(id);
        return materiaRes;
    } catch (error) {
        return thunkApi.rejectWithValue(error as CustomError);
    }
});
