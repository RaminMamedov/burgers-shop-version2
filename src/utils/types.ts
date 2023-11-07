export type FieldErrorType = { field: string; error: string };
export type ThunkError = { rejectValue: { errors: Array<string>; fieldsErrors?: Array<FieldErrorType> } };
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type ResponseType<D = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors?: Array<FieldErrorType>;
  data: D;
};
