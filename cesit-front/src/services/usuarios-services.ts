import axios, { AxiosError } from 'axios';
import { User } from '../models/User';
import { manageError } from '../utils/services';

export const apiGetCurrentUser = async (): Promise<User> => {
  try {
    const res = await axios.get<User>(
      `http://localhost:5005/api/auth/current-user`
    );
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};

export const apiLoginUser = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const res = await axios.post<User>(`http://localhost:5005/api/auth/login`, {
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw manageError(error);
  }
};
