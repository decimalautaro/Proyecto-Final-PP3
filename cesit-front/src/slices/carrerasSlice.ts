import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Carrera } from '../models/Carrera';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import {
  buscarCarreraPorIdService,
  buscarCarrerasService,
  CustomError,
  eliminarCarreraPorIdService,
} from '../services/carreras-services';
import { RootState } from '../store/store';

// Define a type for the slice state
interface CarrerasState {
  carreras: Carrera[];
  offset: number;
  limit: number;
  cantidadPaginas: number;
  carreraSeleccionada: Carrera | null;
  cargando: boolean;
  cantidadCarrera: number;
  mensajeError: string | null;
  criterio: Record<string, string> | null;
}

// Define the initial state using that type
const initialState: CarrerasState = {
  carreras: [],
  offset: 0,
  limit: 10,
  cantidadPaginas: 0,
  carreraSeleccionada: null,
  cargando: false,
  cantidadCarrera: 0,
  mensajeError: null,
  criterio: null,

}

export const carrerasSlice = createSlice({
  name: 'carrera',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarCarrera: (state) => {
      state.carreras = initialState.carreras;
    },
    setCriterio: (
      state,
      { payload }: PayloadAction<Record<string, string> | null>
    ) => {
      state.criterio = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarCarreras.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(buscarCarreras.fulfilled,
      (state, { payload }: PayloadAction<PaginatedResponse<Carrera>>) => {
        state.carreras = payload.data || [];
        state.offset = Math.round(payload.offset / payload.limit) + 1;
        state.cantidadPaginas = Math.round(payload.total / payload.limit);
        state.limit = payload.limit;
        state.cargando = false;
      });
    builder.addCase(
      buscarCarreras.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      });

    builder.addCase(buscarCarreraPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarCarreraPorId.fulfilled,
      (state, { payload }: PayloadAction<Carrera | null>) => {
        state.carreraSeleccionada = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarCarreraPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarCarreraPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarCarreraPorId.fulfilled,
      (state, { payload }: PayloadAction<Carrera | null>) => {
        state.carreraSeleccionada = null;
        state.carreras = state.carreras.filter(
          (carrera) => carrera._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarCarreraPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  }
})

export const { setCargando, limpiarCarrera, setCriterio } = carrerasSlice.actions

export default carrerasSlice.reducer

// Extra reducers 
interface BuscarCarreraQuery {
  limit: number;
  offset: number;
}
export const buscarCarreras = createAsyncThunk<
  PaginatedResponse<Carrera>,
  BuscarCarreraQuery | void,
  { rejectValue: CustomError }
>('carrera/buscarCarreras', async (params: BuscarCarreraQuery | void, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    let criterio = state.carrera.criterio || ({} as Record<string, string>);
    if (params?.limit && params?.offset) {
      criterio = { ...criterio, limit: params.limit.toString() };
      const offsetLimit = (params.offset - 1) * params.limit;
      criterio = { ...criterio, offset: offsetLimit.toString() };
    }

    let carerasRes: PaginatedResponse<Carrera>;

    carerasRes = await buscarCarrerasService(
      new URLSearchParams(criterio).toString()
    );

    return carerasRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const buscarCarreraPorId = createAsyncThunk<
  Carrera,
  string,
  { rejectValue: CustomError }
>('carrera/buscarCarreraPorId', async (id: string, thunkApi) => {
  try {
    const carreraRes = await buscarCarreraPorIdService(id);
    return carreraRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarCarreraPorId = createAsyncThunk<
  Carrera,
  string,
  { rejectValue: CustomError }
>('carrera/eliminarCarreraPorId', async (id: string, thunkApi) => {
  try {
    const carreraRes = await eliminarCarreraPorIdService(id);
    return carreraRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

