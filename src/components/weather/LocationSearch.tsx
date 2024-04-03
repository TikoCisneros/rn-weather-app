import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { UIText, UITextInput, UITouchableOpacity, UIView } from '../common';
import { getBgWhite } from '../../styles';
import { LocationModel } from '../../domain';

type LocationSearchProps = {
  locations: LocationModel[];
  showSearch: boolean;
  onQueryChange: (text: string) => void;
  onToggleSearch: () => void;
  onSelectLocation: (location: LocationModel) => () => void;
};

export const LocationSearch = ({
  showSearch,
  locations,
  onQueryChange,
  onToggleSearch,
  onSelectLocation,
}: LocationSearchProps) => {
  return (
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
            onChangeText={onQueryChange}
          />
        ) : null}

        <UITouchableOpacity
          className="rounded-full p-3 m-1"
          style={{ backgroundColor: getBgWhite(0.3) }}
          onPress={onToggleSearch}
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
              onPress={onSelectLocation(location)}
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
  );
};
