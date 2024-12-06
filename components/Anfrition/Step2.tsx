import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

type Step2Props = {
  value: string;
  onChange: (value: string) => void;
};

const Step2: React.FC<Step2Props> = ({ value, onChange }) => {
  const [region, setRegion] = useState({
    latitude: 21.157654,
    longitude: -100.933034,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [marker, setMarker] = useState({ latitude: 21.157654, longitude: -100.933034});

  const handleLocationSelect = (data: any, details: any) => {
    const { lat, lng } = details.geometry.location;
    setRegion({
      ...region,
      latitude: lat,
      longitude: lng,
    });
    setMarker({ latitude: lat, longitude: lng });
    onChange(data.description);
  };

  const handleDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    setRegion((prev) => ({ ...prev, latitude, longitude }));
    onChange(`Lat: ${latitude}, Lng: ${longitude}`);
  };

  return (
    <View className="flex-1 px-4 py-2">
      <Text className="text-2xl font-semibold mb-3">¿Dónde está el alojamiento?</Text>
      <View className="flex-row items-center border border-gray-400 rounded-xl px-2 mb-3">
        <GooglePlacesAutocomplete
          placeholder="Ingrese la dirección completa"
          minLength={2}
          fetchDetails={true}
          onPress={handleLocationSelect}
          query={{
            language: 'es',
            region: 'mx',
          }}
          styles={{
            textInput: {
              flex: 1,
              fontSize: 16,
              height: 40,
            },
          }}
        />
        <Ionicons name="location-outline" size={28} color="#6B7280" className="ml-2" />
      </View>
      <Text className='text-gray-400 text-justify'>Si la ubicación del alojamiento no aparece en el buscador, puedes agregarla manualmente en el mapa.</Text>
      <MapView className="h-1/2 rounded-lg mt-3" region={region} onRegionChangeComplete={(newRegion) => setRegion(newRegion)}>
        <Marker
          coordinate={marker}
          draggable
          onDragEnd={handleDragEnd}
        />
      </MapView>
    </View>
  );
};

export default Step2;