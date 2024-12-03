import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Text, RefreshControl,Animated} from "react-native";
import { styled } from "nativewind";
import { DataStore } from "@aws-amplify/datastore";

import PropertyCard from "@/components/PropertyCard";
import SearchBarExplore from "@/components/SearchBarExplore";
import RecommendationsList from "@/components/RecommendationsList";
import AdBanner from "@/components/AdBanner"; // Opcional, para intercalar anuncios
import { Alojamiento } from "@/src/models";
import PropertyModal from "@/components/PropertyModal";

const StyledView = styled(View);
const StyledText = styled(Text);

const ExploreScreen = () => {
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [recomendados, setRecomendados] = useState<Alojamiento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Alojamiento | null>(null);

  const [slideAnim] = useState(new Animated.Value(0)); // Animación de deslizamiento desde abajo

  const loadAlojamientos = async (isRefresh = false) => {
    try {
      if (!isRefresh) setIsLoading(true);
      else setIsRefreshing(true);
  
      const result = await DataStore.query(Alojamiento);
  
      const recomendadosList = result.filter((item) => item.esRecomendado);
      setRecomendados(recomendadosList);
  
      const agregadosRecientemente = result.filter(
        (item) => !item.esRecomendado
      );
      setAlojamientos(agregadosRecientemente);
    } catch (error) {
      console.error("Error al obtener los alojamientos:", error);
      setError("No se pudieron cargar los alojamientos.");
    } finally {
      if (!isRefresh) setIsLoading(false);
      else setIsRefreshing(false);
    }
  }; 
  
  const showModal = (property: Alojamiento) => {
    setSelectedProperty(property);  
    setModalVisible(true);
    
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
        
  
    const hideModal = () => {
      Animated.spring(slideAnim, {
        toValue: 300,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    };        

  useEffect(() => {
    const subscription = DataStore.observe(Alojamiento).subscribe((msg) => {
      console.log("Cambio detectado:", msg);

      setAlojamientos((prev) => {
        switch (msg.opType) {
          case "INSERT":
            return [msg.element, ...prev];
          case "UPDATE":
            return prev.map((item) =>
              item.id === msg.element.id ? msg.element : item
            );
          case "DELETE":
            return prev.filter((item) => item.id !== msg.element.id);
          default:
            return prev;
        }
      });

      // También actualizar los recomendados
      if (msg.element.esRecomendado) {
        setRecomendados((prev) =>
          prev.some((item) => item.id === msg.element.id)
            ? prev.map((item) =>
                item.id === msg.element.id ? msg.element : item
              )
            : [msg.element, ...prev]
        );
      }
    });

    loadAlojamientos(); // Carga inicial

    return () => subscription.unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Alojamiento }) => {
    const title = item.titulo ?? "Título no disponible";
    const description = item.descripcion ?? "Descripción no disponible";
    const price = item.precioMensual
      ? `$${item.precioMensual.toFixed(2)} / mensual`
      : "Precio no disponible";
    const image =
      item.fotosAlojamiento && item.fotosAlojamiento.length > 0
        ? item.fotosAlojamiento[0]
        : "https://via.placeholder.com/300x300";
  
    return (
      <PropertyCard
        title={title}
        description={description}
        price={price}
        image={image}
        onPress={() => showModal(item)}
      />
    );
  };  

  const renderList = ({ item }: { item: any }) => {
    if (item.type === "property") {
      return renderItem({ item: item.data });
    }
  
    if (item.type === "recommendation") {
      return (
        <RecommendationsList
          title="Recomendados para ti"
          recommendations={item.data.map((rec: Alojamiento) => ({
            id: rec.id,
            title: rec.titulo ?? "Título no disponible",
            description: rec.descripcion ?? "Descripción no disponible",
            price: rec.precioMensual
              ? `$${rec.precioMensual.toFixed(2)} / mensual`
              : "Precio no disponible",
            image:
              rec.fotosAlojamiento && rec.fotosAlojamiento.length > 0
                ? rec.fotosAlojamiento[0]
                : "https://via.placeholder.com/300x300",
            onPress: () => showModal(rec),
          }))}
        />
      );
    }
  
    if (item.type === "ad") {
      return <AdBanner image="https://via.placeholder.com/600x200" />;
    }
  
    return null;
  };    

  const combinedData = () => {
    const data = [];
    const chunkSize = 4; // Número de propiedades antes de mostrar recomendaciones o anuncios

    for (let i = 0; i < alojamientos.length; i += chunkSize) {
      const chunk = alojamientos.slice(i, i + chunkSize);
      data.push(...chunk.map((property) => ({ type: "property", data: property })));

      // Intercalar una lista horizontal de recomendados después de cada bloque
      if (recomendados.length > 0) {
        data.push({
          type: "recommendation",
          data: recomendados.slice(0, 5), // Solo muestra 5 recomendados
        });
      }

      // Opcional: Intercalar un anuncio
      data.push({ type: "ad" });
    }

    return data;
  };

  return (
    <StyledView className="flex-1 bg-gray-100">
      {/* Barra de búsqueda */}
      <SearchBarExplore
        placeholder="¿Qué tipo de estancia buscas?"
        value=""
        onChangeText={() => {}}
      />

      {isLoading ? (
        <StyledView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#DF96F9" />
          <StyledText className="text-gray-600 font-manrope mt-4">
            Cargando alojamientos...
          </StyledText>
        </StyledView>
      ) : error ? (
        <StyledView className="flex-1 justify-center items-center">
          <StyledText className="text-[#DF96F9] font-bold">{error}</StyledText>
        </StyledView>
      ) : alojamientos.length === 0 ? (
        <StyledView className="flex-1 justify-center items-center">
          <StyledText className="text-gray-600 font-manrope">
            No hay alojamientos disponibles.
          </StyledText>
        </StyledView>
      ) : (
        <>
         <StyledText className="text-lg font-bold text-gray-800 px-4 mt-4">
            Agregados recientemente
          </StyledText>
          <FlatList
            data={combinedData()}
            keyExtractor={(item, index) => `${item.type}-${index}`}
            renderItem={renderList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => loadAlojamientos(true)}
                colors={["#DF96F9"]} // Android
                tintColor="#DF96F9" // iOS
              />
            }
          />
        </>
      )}
      {/* Modal */}
      <PropertyModal
        visible={modalVisible}
        onClose={hideModal}
        selectedProperty={selectedProperty}
        slideAnim={slideAnim}
      />

    </StyledView>
  );
};

export default ExploreScreen;