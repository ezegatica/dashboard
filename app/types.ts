export interface User {
  email: string;
  password: string;
}

export interface IError {
  message: string;
  show: boolean;
}

export type LogsRequest = {
  data: {
    message: string;
    timestamp: Date;
  }[];
  page: number;
  totalPages: number;
  totalLogs: number;
  perPage: number;
}

export type UserType = {
  id: string;
  email: string;
  role: string;
  loginMethod: 'google' | 'password';
}