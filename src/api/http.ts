import axios, { AxiosError } from 'axios';
import { ForecastModel } from '../domain/forecast.models';
import { LocationModel } from '../domain/location.models';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const getForecast = async (cityName: string, days: number): Promise<ForecastModel> => {
  try {
    const { data } = await instance.get(`/forecast.json?key=${API_KEY}&q=${cityName}&days=${days}&aqi=no&alerts=no`);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }

    throw new Error(`Unable to get Forecast from ${cityName}`);
  }
};

export const getLocations = async (query: string): Promise<LocationModel[]> => {
  try {
    const { data } = await instance.get(`/search.json?key=${API_KEY}&q=${query}`);

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data);
    }

    throw new Error(`Unable to get Locations from ${query}`);
  }
};
