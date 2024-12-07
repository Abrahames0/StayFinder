import React from "react";
import { View } from "react-native";
import { Marker } from "react-native-maps";
import { Entypo, Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

interface Zona {
  id: string;
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  categoria: string; // Se asegura que exista esta propiedad
}

interface MarkerProps {
  alojamientos: any[];
  zonas: Zona[]; // Las zonas deben incluir la propiedad `categoria`
  onSelectAlojamiento: (alojamiento: any) => void;
}

// Mapeo de categorías a colores e íconos
const categoryStyles: Record<string, { icon: React.ReactNode; color: string }> = {
  recreacion: {
    icon: <MaterialIcons name="history-edu" size={24} color="white" />,
    color: "#34D399", // Verde
  },
  residenciales: {
    icon: <Entypo name="home" size={24} color="white" />,
    color: "#60A5FA", // Azul
  },
  transporte: {
    icon: <MaterialIcons name="directions-bus" size={24} color="white" />,
    color: "#F59E0B", // Amarillo
  },
  servicios: {
    icon: <MaterialIcons name="shopping-basket" size={24} color="white" />,
    color: "#6366F1", // Morado
  },
  cafeterias: {
    icon: <MaterialIcons name="local-cafe" size={24} color="white" />,
    color: "#F87171", // Rojo
  },
  papelerias: {
    icon: <FontAwesome5 name="book" size={24} color="white" />,
    color: "#E879F9", // Rosa
  },
  lavanderias: {
    icon: <MaterialIcons name="local-laundry-service" size={24} color="white" />,
    color: "#10B981", // Verde oscuro
  },
};

const Markers: React.FC<MarkerProps> = ({ alojamientos, zonas, onSelectAlojamiento }) => {
  return (
    <>
      {/* Marcadores de alojamientos */}
      {alojamientos
        .filter(
          (alojamiento) =>
            typeof alojamiento.latitud === "number" && typeof alojamiento.longitud === "number"
        )
        .map((alojamiento) => (
          <Marker
            key={alojamiento.id}
            coordinate={{
              latitude: alojamiento.latitud!,
              longitude: alojamiento.longitud!,
            }}
            onPress={() => onSelectAlojamiento(alojamiento)}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#DF96F9",
                paddingHorizontal: 5,
                paddingVertical: 8,
                borderRadius: 15,
                shadowColor: "#000",
                shadowOffset: { width: 1, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                elevation: 3,
              }}
            >
              <Entypo name="home" size={25} color="black" />
            </View>
          </Marker>
        ))}

      {/* Marcadores de zonas de interés */}
      {zonas.map((zona) => {
        const categoryStyle = categoryStyles[zona.categoria] || {
          icon: <Ionicons name="pin" size={24} color="white" />,
          color: "#9CA3AF", // Gris predeterminado
        };

        return (
          <Marker
            key={zona.id}
            coordinate={{
              latitude: zona.latitud,
              longitude: zona.longitud,
            }}
            title={zona.nombre}
            description={zona.descripcion}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: categoryStyle.color,
                padding: 10,
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: 5,
              }}
            >
              {categoryStyle.icon}
            </View>
          </Marker>
        );
      })}
    </>
  );
};

export default Markers;