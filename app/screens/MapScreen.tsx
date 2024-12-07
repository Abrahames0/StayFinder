import React, { useState, useEffect } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import { DataStore } from "@aws-amplify/datastore";
import { Alojamiento } from "@/src/models";
import SearchBar from "@/components/SearchBar";
import FiltersModal from "@/components/FiltersModal";
import zonasDeInteresJson from "@/data/zonasDeInteres.json";
import Markers from "@/components/Markers";
import FloatingCard from "@/components/FloatingCard";
import LoadingIndicator from "@/components/LoadingIndicator";

// Tipos para las zonas de interés
interface Zona {
  id: string;
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
}

interface ZonasDeInteres {
  recreacion: Zona[];
  residenciales: Zona[];
  transporte: Zona[];
  servicios: Zona[];
  cafeterias: Zona[];
  papelerias: Zona[];
  lavanderias: Zona[];
}

const zonasDeInteres: ZonasDeInteres = zonasDeInteresJson.zonasDeInteres;

const MapScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<(keyof ZonasDeInteres)[]>([]);
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [selectedAlojamiento, setSelectedAlojamiento] = useState<Alojamiento | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {
        setLoading(true);
        const alojamientosData = await DataStore.query(Alojamiento);
        setAlojamientos(alojamientosData);
      } catch (error) {
        console.error("Error al cargar los alojamientos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlojamientos();
  }, []);

  const region = {
    latitude: 21.157065,
    longitude: -100.934967,
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  };

  const getFilteredMarkers = (): Zona[] => {
    if (selectedCategories.length === 0) return [];
    return selectedCategories.flatMap((category) => zonasDeInteres[category]);
  };

  return (
    <View className="flex-1">
      <SearchBar
        placeholder="¿Qué tipo de estancia buscas?"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onFilterPress={() => setFiltersVisible(true)}
      />

      <FiltersModal
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        onApplyFilters={(selected) => {
          setSelectedCategories(selected as (keyof ZonasDeInteres)[]);
          setFiltersVisible(false);
        }}
        onClearFilters={() => {
          setSelectedCategories([]);
          setFiltersVisible(false);
        }}
      />

      {loading ? (
        <LoadingIndicator message="Cargando alojamientos..." />
      ) : (
        <MapView initialRegion={region} style={{ flex: 1 }}>
          {/* Marcadores */}
          <Markers
            alojamientos={alojamientos}
            zonas={getFilteredMarkers()}
            onSelectAlojamiento={setSelectedAlojamiento}
          />
        </MapView>
      )}

      {/* Tarjeta flotante */}
      {selectedAlojamiento && (
        <FloatingCard alojamiento={selectedAlojamiento} onClose={() => setSelectedAlojamiento(null)} />
      )}
    </View>
  );
};

export default MapScreen;
