import { ScrollView } from 'react-native';
import { CalendarDaysIcon } from 'react-native-heroicons/solid';
import { ForecastDay } from '../../domain';
import { getBgWhite } from '../../styles';
import { getDateName } from '../../utils';
import { UIImage, UIText, UIView } from '../common/NativeWind';

type DailyForecastProps = {
  data: ForecastDay[];
};
export const DailyForecast = ({ data }: DailyForecastProps) => {
  return (
    <UIView className="mb-2 space-y-3">
      <UIView className="flex-row items-center mx-5 mb-2 space-x-2">
        <CalendarDaysIcon size={22} color="white" />
        <UIText className="text-white text-base">Daily forecast</UIText>
      </UIView>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }} showsHorizontalScrollIndicator={false} horizontal>
        {/**TODO: Add 8 forecast days and remove same day (first) */}
        {data.map((forecastDay, index) => (
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
  );
};
