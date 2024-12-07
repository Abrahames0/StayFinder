import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { DataStore } from "@aws-amplify/datastore";
import { Alojamiento } from "@/src/models";
import SearchBar from "@/components/SearchBar";
import FiltersModal from "@/components/FiltersModal";

const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        setLoading(true);
        const alojamientosData = await DataStore.query(Alojamiento);
        setAlojamientos(alojamientosData);
        console.log("Alojamientos cargados:", alojamientosData);
      } catch (error) {
        console.error("Error al cargar los alojamientos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlojamientos();
  }, []);

  const openFilters = () => setFiltersVisible(true);
  const closeFilters = () => setFiltersVisible(false);

  const applyFilters = () => {
    console.log("Filtros aplicados");
    closeFilters();
  };

  const clearFilters = () => {
    console.log("Quitar filtros");
  };

  const region = {
    latitude: 21.157654,
    longitude: -101.933034,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  const filteredAlojamientos = alojamientos.filter(
    (alojamiento) =>
      alojamiento.latitud !== null &&
      alojamiento.longitud !== null &&
      typeof alojamiento.latitud === "number" &&
      typeof alojamiento.longitud === "number"
  );

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

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text>Cargando alojamientos...</Text>
        </View>
      ) : (
        <MapView
          
          style={{ flex: 1 }}
        >
          {filteredAlojamientos.map((alojamiento) => (
            <Marker
              key={alojamiento.id}
              coordinate={{
                latitude: alojamiento.latitud!,
                longitude: alojamiento.longitud!,
              }}
              title={alojamiento.titulo || "Sin título"}
              description={`Precio: $${alojamiento.precioMensual ?? "No disponible"}`}
              pinColor="#D92AD9"
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default MapScreen;