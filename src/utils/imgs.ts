import { ImageRequireSource } from 'react-native';

export const replaceSize = (imgUrl: string, size: number = 128): string => imgUrl.replace('64x64', `${size}x${size}`);

export const StatsImages: Record<string, ImageRequireSource> = {
  humidity: require('../../assets/icons/humidity.png'),
  wind: require('../../assets/icons/wind.png'),
  visibility: require('../../assets/icons/visibility.png'),
};

// TODO: create a Weather Images const based on https://www.flaticon.es/packs/weather-492?word=weather
