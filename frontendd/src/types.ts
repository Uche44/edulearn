export type FormDataType = { username: string; password: string };

export type ErrorType = {
  username?: string;
  password?: string;
  general?: string;
};

export interface FormProps {
  route: string;
  method: "login" | "register";
}

export type TokenPayload = {
  username?: string;
  user_id: string;
};