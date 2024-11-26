import React, { useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import SearchBar from "@/components/SearchBar";
import FiltersModal from "@/components/FiltersModal";

const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const openFilters = () => setFiltersVisible(true);
  const closeFilters = () => setFiltersVisible(false);

  const applyFilters = () => {
    console.log("Filtros aplicados");
    closeFilters();
  }

  const clearFilters = () => {
    console.log("Quitar filtros");
  };

  const region = {
    latitude: 21.157654,
    longitude: -100.933034,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View className="flex-1">
      <SearchBar
        placeholder="  ¿Qué tipo de estancia buscas?"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={openFilters}
      />
    
    <FiltersModal
        visible={filtersVisible}
        onClose={closeFilters}
        onApplyFilters={applyFilters}
        onClearFilters={clearFilters}
      />

      {/* Mapa */}
      <View className="flex-1">
        <MapView
          initialRegion={region}
          style={{ flex: 1 }} // Usa `style` en lugar de `className`
        >
          <Marker
            coordinate={{ latitude: 21.157654, longitude: -100.933034 }}
            title="Centro de Dolores Hidalgo"
            description="Un lugar histórico y cultural."
          />
          <Marker
            coordinate={{ latitude: 21.153654, longitude: -100.930034 }}
            title="Ex Hacienda de la Erre"
            description="Lugar turístico."
            pinColor="#D92AD9"
          />
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;
