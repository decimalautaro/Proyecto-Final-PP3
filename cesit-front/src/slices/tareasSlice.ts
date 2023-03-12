import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Tarea } from '../models/Tarea';
import {
  buscarTareaPorIdService,
  buscarTaresService,
  eliminarTareaPorIdService,
} from '../services/tareas-services';
import type { RootState } from '../store/store';
import { CustomError } from '../utils/services';

// Define a type for the slice state
interface TareasState {
  tareas: Tarea[];
  offset: number;
  limit: number;
  cantidadPaginas: number;
  tareaSeleccionada: Tarea | null;
  cargando: boolean;
  mensajeError: string | null;
  criterio: Record<string, string> | null;
}

// Define the initial state using that type
const initialState: TareasState = {
  tareas: [],
  offset: 0,
  limit: 10,
  cantidadPaginas: 0,
  tareaSeleccionada: null,
  cargando: false,
  mensajeError: null,
  criterio: null,
};

export const tareasSlice = createSlice({
  name: 'tarea',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarTareas: (state) => {
      state.tareas = initialState.tareas;
    },
    setCriterio: (
      state,
      { payload }: PayloadAction<Record<string, string> | null>
    ) => {
      state.criterio = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarTareas.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarTareas.fulfilled,
      (state, { payload }: PayloadAction<PaginatedResponse<Tarea>>) => {
        state.tareas = payload.data || [];
        state.offset = Math.round(payload.offset / payload.limit) + 1;
        state.cantidadPaginas = Math.round(payload.total / payload.limit);
        state.limit = payload.limit;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarTareas.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(buscarTareaPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarTareaPorId.fulfilled,
      (state, { payload }: PayloadAction<Tarea | null>) => {
        state.tareaSeleccionada = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarTareaPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarTareaPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarTareaPorId.fulfilled,
      (state, { payload }: PayloadAction<Tarea | null>) => {
        state.tareaSeleccionada = null;
        state.tareas = state.tareas.filter(
          (tarea) => tarea._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarTareaPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  },
});

export const { setCargando, limpiarTareas, setCriterio } = tareasSlice.actions;

export default tareasSlice.reducer;

// Extra reducers
interface BuscarTareasQuery {
  limit: number;
  offset: number;
}
export const buscarTareas = createAsyncThunk<
  PaginatedResponse<Tarea>,
  BuscarTareasQuery | void,
  { rejectValue: CustomError }
>('tarea/buscarTareas', async (params: BuscarTareasQuery | void, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    let criterio = state.tarea.criterio || ({} as Record<string, string>);
    if (params?.limit && params?.offset) {
      criterio = { ...criterio, limit: params.limit.toString() };
      const skipLimit = (params.offset - 1) * params.limit;
      criterio = { ...criterio, offset: skipLimit.toString() };
    }

    let tareasRes: PaginatedResponse<Tarea>;

    tareasRes = await buscarTaresService(
      new URLSearchParams(criterio).toString()
    );

    return tareasRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const buscarTareaPorId = createAsyncThunk<
  Tarea,
  string,
  { rejectValue: CustomError }
>('tarea/buscarTareaPorId', async (id: string, thunkApi) => {
  try {
    const tareaRes = await buscarTareaPorIdService(id);
    return tareaRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarTareaPorId = createAsyncThunk<
  Tarea,
  string,
  { rejectValue: CustomError }
>('tarea/eliminarTareaPorId', async (id: string, thunkApi) => {
  try {
    const tareaRes = await eliminarTareaPorIdService(id);
    return tareaRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});
