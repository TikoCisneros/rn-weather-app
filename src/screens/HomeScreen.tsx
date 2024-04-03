import React, { useEffect, useState } from 'react';
import { GradientContainer, UIImage, UIText, UITextInput, UITouchableOpacity, UIView } from '../components';
import { useBoolean, useDebounceCallback, useToggle } from '../hooks';
import { getBgWhite } from '../styles';

import { Keyboard, ScrollView } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { getForecast, getLocations } from '../api/http';
import { ForecastModel, LocationModel } from '../domain';
import { getDateName, replaceSize, StatsImages } from '../utils';

const DEFAULT_CITY = 'Quito';
const FORECAST_DAYS = 7; // Number of days of weather forecast

/**TODO: Split in some components and use MVC pattern */
export function HomeScreen() {
  const [showSearch, toggle] = useToggle();
  const { value: isFetching, setTrue: setFetchingTrue, setFalse: setFetchingFalse } = useBoolean();
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [forecast, setForecast] = useState<ForecastModel>();

  useEffect(() => {
    fetchLocationForecast(DEFAULT_CITY);
  }, []);

  function fetchLocations(query: string) {
    if (!query && query.trim().length < 4) {
      return;
    }

    getLocations(query).then(setLocations).catch(console.error);
  }

  const handleSearch = useDebounceCallback(fetchLocations, 1200);

  function handleSelectLocation(location: LocationModel) {
    return () => {
      Keyboard.dismiss();
      setLocations([]);
      fetchLocationForecast(location.name);
    };
  }

  function fetchLocationForecast(locationName: string) {
    setFetchingTrue();
    getForecast(locationName, FORECAST_DAYS)
      .then(setForecast)
      .catch(console.error)
      .finally(() => setFetchingFalse());
  }

  return (
    <GradientContainer>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        {/** Search Section */}
        <UIView className="mx-4 my-3 z-50 h-[7%]">
          <UIView
            className="flex-row justify-end items-center rounded-full"
            style={{ backgroundColor: showSearch ? getBgWhite(0.2) : 'transparent' }}
          >
            {showSearch ? (
              <UITextInput
                placeholder="Search city"
                placeholderTextColor="lightgray"
                className="flex-1 pl-6 pb-1 h-10 text-base text-white"
                onChangeText={handleSearch}
              />
            ) : null}

            <UITouchableOpacity
              className="rounded-full p-3 m-1"
              style={{ backgroundColor: getBgWhite(0.3) }}
              onPress={toggle}
            >
              <MagnifyingGlassIcon size={24} color="white" />
            </UITouchableOpacity>
          </UIView>
          {locations.length > 0 && showSearch ? (
            <UIView className="absolute w-full bg-gray-300 top-16 rounded-3xl">
              {locations.map((location, index) => (
                <UITouchableOpacity
                  key={`loc-${index}`}
                  className={`flex-row items-center border-0 p-4 ${
                    index < locations.length - 1 && 'border-b-[1px] border-b-gray-400'
                  }`.trim()}
                  onPress={handleSelectLocation(location)}
                >
                  <MapPinIcon size={20} color="gray" />
                  <UIText className="text-black text-lg ml-2">
                    {location.name}, {location.country}
                  </UIText>
                </UITouchableOpacity>
              ))}
            </UIView>
          ) : null}
        </UIView>
        {/** TODO: Improve load design */}
        {isFetching || !forecast ? (
          <UIText>Loading...</UIText>
        ) : (
          <>
            {/** Forecast Section */}
            <UIView className="flex flex-1 flex-col items-center justify-around mx-4 mb-2">
              {/** Location */}
              <UIText className="text-white text-center text-2xl font-bold">
                {forecast.location.name},{' '}
                <UIText className="text-xl font-semibold text-gray-50">{forecast.location.country}</UIText>
              </UIText>
              {/** Weather Img */}
              <UIImage
                source={{ uri: `https:${replaceSize(forecast.current.condition.icon)}` }}
                className="w-52 h-52 self-center"
              />
              {/** Degrees */}
              <UIView className="space-y-2">
                <UIText className="text-center font-bold text-white text-6xl ml-5">
                  {forecast.current.temp_c}&#176;
                </UIText>
                <UIText className="text-center font-bold text-white text-xl tracking-widest">
                  {forecast.current.condition.text}
                </UIText>
              </UIView>
              {/** Stats TODO: Create a mapper to build stats array */}
              <UIView className="flex-row justify-between mx-4 gap-6">
                {[
                  { title: 'wind', value: forecast.current.wind_kph, measure: 'Kph' },
                  { title: 'humidity', value: forecast.current.humidity, measure: '%' },
                  { title: 'visibility', value: forecast.current.vis_km, measure: 'Km' },
                ].map((stat, index) => (
                  <UIView key={`stat-${index}`} className="flex-row space-x-2 items-center">
                    <UIImage source={StatsImages[stat.title]} className="w-6 h-6" />
                    <UIText className="text-white text-base font-semibold">
                      {stat.value} {stat.measure}
                    </UIText>
                  </UIView>
                ))}
              </UIView>
            </UIView>
            {/** Next Days Forecast Section */}
            <UIView className="mb-2 space-y-3">
              <UIView className="flex-row items-center mx-5 mb-2 space-x-2">
                <CalendarDaysIcon size={22} color="white" />
                <UIText className="text-white text-base">Daily forecast</UIText>
              </UIView>
              <ScrollView
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                {/**TODO: Add 8 forecast days and remove same day (first) */}
                {forecast.forecast.forecastday.map((forecastDay, index) => (
                  <UIView
                    key={`day-${index}`}
                    className="flex justify-center items-center w-24 rounded-3xl space-y-1 py-3 mr-4"
                    style={{ backgroundColor: getBgWhite(0.15) }}
                  >
                    <UIImage source={{ uri: `https:${forecastDay.day.condition.icon}` }} className="w-11 h-11" />
                    <UIText className="text-white">{getDateName(forecastDay.date)}</UIText>
                    <UIText className="text-white text-lg font-semibold">{forecastDay.day.avgtemp_c}&#176;</UIText>
                  </UIView>
                ))}
              </ScrollView>
            </UIView>
          </>
        )}
      </ScrollView>
    </GradientContainer>
  );
}

export default HomeScreen;
