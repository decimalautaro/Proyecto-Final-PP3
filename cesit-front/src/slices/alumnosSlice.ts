import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Alumno } from '../models/Alumno';
import {
  buscarAlumnoPorIdService,
  buscarAlumnosService,
  CustomError,
  eliminarAlumnosPorIdService,
} from '../services/alumnos-services';
import type { RootState } from '../store/store';

// Define a type for the slice state
interface AlumnosState {
  alumnos: Alumno[];
  offset: number;
  limit: number;
  cantidadPaginas: number;
  alumnoSeleccionado: Alumno | null;
  cargando: boolean;
  mensajeError: string | null;
  criterio: Record<string, string> | null;
}

// Define the initial state using that type
const initialState: AlumnosState = {
  alumnos: [],
  offset: 0,
  limit: 10,
  cantidadPaginas: 0,
  alumnoSeleccionado: null,
  cargando: false,
  mensajeError: null,
  criterio: null,
};

export const alumnosSlice = createSlice({
  name: 'alumno',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarAlumnos: (state) => {
      state.alumnos = initialState.alumnos;
    },
    setCriterio: (
      state,
      { payload }: PayloadAction<Record<string, string> | null>
    ) => {
      state.criterio = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarAlumnos.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarAlumnos.fulfilled,
      (state, { payload }: PayloadAction<PaginatedResponse<Alumno>>) => {
        state.alumnos = payload.data || [];
        state.offset = Math.round(payload.offset / payload.limit) + 1;
        state.cantidadPaginas = Math.round(payload.total / payload.limit);
        state.limit = payload.limit;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarAlumnos.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(buscarAlumnoPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarAlumnoPorId.fulfilled,
      (state, { payload }: PayloadAction<Alumno | null>) => {
        state.alumnoSeleccionado = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarAlumnoPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarAlumnoPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarAlumnoPorId.fulfilled,
      (state, { payload }: PayloadAction<Alumno | null>) => {
        state.alumnoSeleccionado = null;
        state.alumnos = state.alumnos.filter(
          (alumno) => alumno._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarAlumnoPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  },
});

export const { setCargando, limpiarAlumnos, setCriterio} = alumnosSlice.actions;

export default alumnosSlice.reducer;

// Extra reducers
interface BuscarAlumnosQuery {
  limit: number;
  offset: number;
}


export const buscarAlumnos = createAsyncThunk<
PaginatedResponse<Alumno>,
BuscarAlumnosQuery | void,
  { rejectValue: CustomError }
>('alumno/buscarAlumnos', async (params: BuscarAlumnosQuery | void, thunkApi) => {
  try {
    const state = thunkApi.getState() as RootState;
    let criterio = state.alumno.criterio || ({} as Record<string, string>);
    if (params?.limit && params?.offset) {
      criterio = { ...criterio, limit: params.limit.toString() };
      const offsetLimit = (params.offset - 1) * params.limit;
      criterio = { ...criterio, offset: offsetLimit.toString() };
    }

    let alumnosRes: PaginatedResponse<Alumno>;


    alumnosRes = await buscarAlumnosService(
      new URLSearchParams(criterio).toString()
    );

    return alumnosRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const buscarAlumnoPorId = createAsyncThunk<
  Alumno,
  string,
  { rejectValue: CustomError }
>('alumno/buscarAlumnoPorId', async (id: string, thunkApi) => {
  try {
    const alumnoRes = await buscarAlumnoPorIdService(id);
    return alumnoRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarAlumnoPorId = createAsyncThunk<
  Alumno,
  string,
  { rejectValue: CustomError }
>('alumno/eliminarAlumnosPorId', async (id: string, thunkApi) => {
  try {
    const alumnoRes = await eliminarAlumnosPorIdService(id);
    return alumnoRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});
