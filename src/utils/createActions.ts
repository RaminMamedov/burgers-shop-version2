import { createAction } from "@reduxjs/toolkit";
import { RequestStatusType } from "../utils/types";

const setStatus = createAction<{ status: RequestStatusType }>("appActions/setAppStatus");
const setError = createAction<{ error: string | null }>("appActions/setAppError");

export const createActions = {
  setStatus,
  setError,
};
