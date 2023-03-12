import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PaginatedResponse } from '../models/commons/PaginatorResponse';
import { Profesor } from '../models/Profesor';
import {
  buscarProfesorPorIdService,
  buscarProfesoresService,
  CustomError,
  eliminarProfesorPorIdService,
} from '../services/profesores-services';
import type { RootState } from '../store/store';

interface ProfesoresState {
  profesores: Profesor[];
  skip: number;
  limit: number;
  cantidadPaginas: number;
  profesorSeleccionado: Profesor | null;
  cargando: boolean;
  mensajeError: string | null;
  criterio: Record<string, string> | null;
}

const initialState: ProfesoresState = {
  profesores: [],
  skip: 0,
  limit: 10,
  cantidadPaginas: 0,
  profesorSeleccionado: null,
  cargando: false,
  mensajeError: null,
  criterio: null,
};

export const profesoresSlice = createSlice({
  name: 'profesor',
  initialState,
  reducers: {
    setCargando: (state, { payload }: PayloadAction<boolean>) => {
      state.cargando = payload;
    },
    limpiarProfesores: (state) => {
      state.profesores = initialState.profesores;
    },
    setCriterio: (
      state,
      { payload }: PayloadAction<Record<string, string> | null>
    ) => {
      state.criterio = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(buscarProfesores.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarProfesores.fulfilled,
      (state, { payload }: PayloadAction<PaginatedResponse<Profesor>>) => {
        state.profesores = payload.data || [];
        state.skip = Math.round(payload.offset / payload.limit) + 1;
        state.cantidadPaginas = Math.round(payload.total / payload.limit);
        state.limit = payload.limit;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarProfesores.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(buscarProfesorPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      buscarProfesorPorId.fulfilled,
      (state, { payload }: PayloadAction<Profesor | null>) => {
        state.profesorSeleccionado = payload || null;
        state.cargando = false;
      }
    );
    builder.addCase(
      buscarProfesorPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
    builder.addCase(eliminarProfesorPorId.pending, (state) => {
      state.cargando = true;
      state.mensajeError = null;
    });
    builder.addCase(
      eliminarProfesorPorId.fulfilled,
      (state, { payload }: PayloadAction<Profesor | null>) => {
        state.profesorSeleccionado = null;
        state.profesores = state.profesores.filter(
          (profesor) => profesor._id !== payload?._id
        );
        state.cargando = false;
      }
    );
    builder.addCase(
      eliminarProfesorPorId.rejected,
      (state, { payload }: PayloadAction<CustomError | undefined>) => {
        state.mensajeError = payload?.message || 'Error desconocido';
        state.cargando = false;
      }
    );
  },
});

export const { setCargando, limpiarProfesores, setCriterio } =
  profesoresSlice.actions;

export default profesoresSlice.reducer;
interface BuscarProfesoresQuery {
  limit: number;
  skip: number;
}
export const buscarProfesores = createAsyncThunk<
  PaginatedResponse<Profesor>,
  BuscarProfesoresQuery | void,
  { rejectValue: CustomError }
>(
  'profesor/buscarProfesores',
  async (params: BuscarProfesoresQuery | void, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;
      let criterio = state.profesor.criterio || ({} as Record<string, string>);
      if (params?.limit && params?.skip) {
        criterio = { ...criterio, limit: params.limit.toString() };
        const skipLimit = (params.skip - 1) * params.limit;
        criterio = { ...criterio, skip: skipLimit.toString() };
      }

      let profesoresRes: PaginatedResponse<Profesor>;

      profesoresRes = await buscarProfesoresService(
        new URLSearchParams(criterio).toString()
      );

      return profesoresRes;
    } catch (error) {
      return thunkApi.rejectWithValue(error as CustomError);
    }
  }
);

export const buscarProfesorPorId = createAsyncThunk<
  Profesor,
  string,
  { rejectValue: CustomError }
>('profesor/buscarProfesorPorId', async (id: string, thunkApi) => {
  try {
    const profesorRes = await buscarProfesorPorIdService(id);
    return profesorRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});

export const eliminarProfesorPorId = createAsyncThunk<
  Profesor,
  string,
  { rejectValue: CustomError }
>('profesor/eliminarProfesorPorId', async (id: string, thunkApi) => {
  try {
    const profesorRes = await eliminarProfesorPorIdService(id);
    return profesorRes;
  } catch (error) {
    return thunkApi.rejectWithValue(error as CustomError);
  }
});
