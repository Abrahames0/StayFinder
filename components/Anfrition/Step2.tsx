import React, { useState } from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

type Step2Props = {
  value: {
    direccion: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    latitud: number;
    longitud: number;
  };
  onChange: (key: string, value: string | number) => void;
};

const Step2: React.FC<Step2Props> = ({ value, onChange }) => {
  const [region, setRegion] = useState({
    latitude: value.latitud || 21.157654,
    longitude: value.longitud || -100.933034,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [marker, setMarker] = useState({
    latitude: value.latitud || 21.157654,
    longitude: value.longitud || -100.933034,
  });

  const handleLocationSelect = (data: any, details: any) => {
    const { lat, lng } = details.geometry.location;

    setRegion({
      ...region,
      latitude: lat,
      longitude: lng,
    });

    setMarker({ latitude: lat, longitude: lng });

    onChange("direccion", data.description);
    onChange("latitud", lat);
    onChange("longitud", lng);
  };

  const handleDragEnd = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
    setRegion((prev) => ({ ...prev, latitude, longitude }));

    onChange("latitud", latitude);
    onChange("longitud", longitude);
  };

  return (
    <View className="flex-1 px-4 py-2">
      <Text className="text-2xl font-semibold mb-3">
        ¿Dónde está el alojamiento?
      </Text>

      {/* Google Places Autocomplete */}
      <View className="flex-row items-center border border-gray-400 rounded-xl px-2 mb-3">
        <GooglePlacesAutocomplete
          placeholder="Ingrese la dirección completa"
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            if (details) {
              const { lat, lng } = details.geometry.location;
              console.log("Detalles del lugar:", details);
              console.log("Latitud:", lat, "Longitud:", lng);
            } else {
              console.error("No se obtuvieron los detalles del lugar.");
            }
          }}
          query={{
            /* key: "AIzaSyBJTE_SzlNmJYJFKShQYwoLU77H_x236IA", */
            language: "es",
            region: "mx",
          }}
          styles={{
            container: {
              flex: 1,
            },
            textInput: {
              flex: 1,
              fontSize: 16,
              height: 40,
            },
          }}
          /* onFail={(error) => console.error("Error en GooglePlacesAutocomplete:", error)} */
        />
        <Ionicons
          name="location-outline"
          size={28}
          color="#6B7280"
          className="ml-2"
        />
      </View>


      <Text className="text-gray-400 text-justify mb-3">
        Si la ubicación del alojamiento no aparece en el buscador, puedes agregarla manualmente.
      </Text>

      {/* Manual Form */}
      <View>
        <TextInput
          placeholder="Dirección"
          value={value.direccion}
          onChangeText={(text) => onChange("direccion", text)}
          className="border border-gray-400 rounded-xl px-2 py-2 mb-2"
        />
        <TextInput
          placeholder="Ciudad"
          value={value.ciudad}
          onChangeText={(text) => onChange("ciudad", text)}
          className="border border-gray-400 rounded-xl px-2 py-2 mb-2"
        />
        <TextInput
          placeholder="Estado"
          value={value.estado}
          onChangeText={(text) => onChange("estado", text)}
          className="border border-gray-400 rounded-xl px-2 py-2 mb-2"
        />
        <TextInput
          placeholder="Código Postal"
          value={value.codigoPostal}
          onChangeText={(text) => onChange("codigoPostal", text)}
          keyboardType="numeric"
          className="border border-gray-400 rounded-xl px-2 py-2 mb-3"
        />
      </View>

      {/* Map */}
      <MapView
        className="h-1/2 rounded-lg mt-3"
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
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
