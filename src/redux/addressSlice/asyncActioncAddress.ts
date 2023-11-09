import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Suggestion, YandexGeocodeResponse } from "../../redux/addressSlice/addressType";
import { handleAsyncServerAppError, handleAsyncServerNetworkError } from "../../utils/error-utils";
import { createActions } from "../../utils/createActions";

const YANDEX_API_URL = 'https://geocode-maps.yandex.ru/1.x/';

type ThunkError = {
  message: string;
}

export const fetchSuggestions = createAsyncThunk<Suggestion[], string, { rejectValue: ThunkError }>(
  'address/fetchSuggestions',
  async (input, thunkAPI) => {
    thunkAPI.dispatch(createActions.setStatus({ status: "loading" }));
    try {
      const response = await axios.get<YandexGeocodeResponse>(YANDEX_API_URL, {
        params: {
          geocode: input,
          apikey: '811255a5-4662-442d-b598-fbe5cd0e8a97',
          format: 'json',
          lang: 'ru_RU',
        },
      });
      const results = response.data.response.GeoObjectCollection.featureMember;
      const suggestions = results.map((item) => ({
        value: item.GeoObject.metaDataProperty.GeocoderMetaData.text,
        unrestricted_value: item.GeoObject.metaDataProperty.GeocoderMetaData.Address.formatted,
      }));
      thunkAPI.dispatch(createActions.setStatus({ status: "succeeded" }));
      return suggestions;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          return handleAsyncServerAppError(error.response.data, thunkAPI);
        } else {
          return handleAsyncServerNetworkError(error, thunkAPI);
        }
      } else {
        thunkAPI.dispatch(createActions.setError({ error: "An unexpected error occurred" }));
        return thunkAPI.rejectWithValue({ message: "An unexpected error occurred" });
      }
    }
  }
);
