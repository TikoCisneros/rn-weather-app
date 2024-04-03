import React from 'react';
import { ForecastModel } from '../../domain';
import { replaceSize, StatsImages } from '../../utils';
import { UIImage, UIText, UIView } from '../common';

type ForecastProps = {
  forecast: ForecastModel;
};

export const Forecast = ({ forecast }: ForecastProps) => {
  const {
    location: { name, country },
    current: {
      condition: { icon, text },
      temp_c,
      wind_kph,
      humidity,
      vis_km,
    },
  } = forecast;

  return (
    <UIView className="flex flex-1 flex-col items-center justify-around mx-4 mb-2">
      {/** Location */}
      <UIText className="text-white text-center text-2xl font-bold">
        {name}, <UIText className="text-xl font-semibold text-gray-50">{country}</UIText>
      </UIText>
      {/** Weather Img */}
      <UIImage source={{ uri: `https:${replaceSize(icon)}` }} className="w-52 h-52 self-center" />
      {/** Degrees */}
      <UIView className="space-y-2">
        <UIText className="text-center font-bold text-white text-6xl ml-5">{temp_c}&#176;</UIText>
        <UIText className="text-center font-bold text-white text-xl tracking-widest">{text}</UIText>
      </UIView>
      {/** Stats TODO: Create a mapper to build stats array */}
      <UIView className="flex-row justify-between mx-4 gap-6">
        {[
          { title: 'wind', value: wind_kph, measure: 'Kph' },
          { title: 'humidity', value: humidity, measure: '%' },
          { title: 'visibility', value: vis_km, measure: 'Km' },
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
  );
};
