import React, { useEffect, useState } from 'react';
import { DailyForecast, Forecast, GradientContainer, LocationSearch, ProgressBar, UIView } from '../components';
import { useBoolean, useDebounceCallback, useToggle } from '../hooks';

import { Keyboard, ScrollView } from 'react-native';
import { getForecast, getLocations } from '../api/http';
import { ForecastModel, LocationModel } from '../domain';

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
        <LocationSearch
          locations={locations}
          showSearch={showSearch}
          onQueryChange={handleSearch}
          onToggleSearch={toggle}
          onSelectLocation={handleSelectLocation}
        />
        {isFetching || !forecast ? (
          <UIView className="flex-1 flex-col justify-center items-center">
            <ProgressBar indeterminate color="white" thickness={10} size={160} />
          </UIView>
        ) : (
          <>
            {/** Forecast Section */}
            <Forecast forecast={forecast} />
            {/** Next Days Forecast Section */}
            <DailyForecast data={forecast.forecast.forecastday} />
          </>
        )}
      </ScrollView>
    </GradientContainer>
  );
}

export default HomeScreen;
