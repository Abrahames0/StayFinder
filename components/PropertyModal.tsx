import React, { useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView } from "react-native";
import PropertyImages from "./PropertyImages";
import Accordion from "./Accordion";

interface PropertyModalProps {
  visible: boolean;
  onClose: () => void;
  selectedProperty: any;
  slideAnim: Animated.Value;
}

const PropertyModal: React.FC<PropertyModalProps> = ({
  visible,
  onClose,
  selectedProperty,
  slideAnim,
}) => {
  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleClose = () => {
    onClose(); // Cierra el modal inmediatamente
    Animated.spring(slideAnim, {
      toValue: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
  <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={handleClose}>
  <View className="flex-1 justify-end items-center bg-black/50">
  <Animated.View
    className="w-full bg-white rounded-t-3xl p-5 shadow-lg"
    style={{ transform: [{ translateY: 1 }] }}
  >
          {/* Cerrar modal */}
          <TouchableOpacity onPress={handleClose} className="self-end mb-4">
            <Text className="text-[#DF96F9] font-bold text-lg">Cerrar</Text>
          </TouchableOpacity>

          {selectedProperty && (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 10 }}
              style={{ maxHeight: "90%" }}
            >
              <PropertyImages selectedProperty={selectedProperty} />

              <Text className="text-xl font-semibold text-gray-800 mb-2">
                {selectedProperty.titulo}
              </Text>

              {selectedProperty.anfitrion && (
                <Text className="text-base font-medium text-gray-600 mb-2">
                  <Text className="font-bold text-gray-800">Anfitrión: </Text>
                  {selectedProperty.anfitrion.nombre || "Nombre no disponible"}
                </Text>
              )}

              <Text className="font-bold text-xl text-gray-800">Descripción:</Text>
              <Text className="text-base font-semibold text-gray-800 mb-2">
                {selectedProperty.descripcion}
              </Text>

              <Accordion title="Reglas" content={selectedProperty.reglas || "Descripción no disponible"} />

              <Accordion
                title="Servicios"
                content="Servicios disponibles"
                extraInfo={[
                  { icon: "bathtub", label: `Baños: ${selectedProperty.banos || "No disponibles"}` },
                  { icon: "wifi", label: `Wifi: ${selectedProperty.wifi || "No disponible"}` },
                  { icon: "bed", label: `Camas: ${selectedProperty.camas || "No disponible"}` },
                ]}
              />

              <Text className="font-bold text-xl text-gray-800">Costos:</Text>
              <View className="p-4 mb-4 border rounded-2xl bg-[#F9F3FF]">
                <Text className="font-bold text-base text-gray-800">
                  {selectedProperty.tiempoRenta || "Tiempo de renta no disponible"}
                </Text>
                <Text className="text-xl font-semibold text-[#DF96F9] mt-2">
                  {selectedProperty.precioMensual
                    ? `$${selectedProperty.precioMensual.toFixed(2)} / mensual`
                    : "Precio no disponible"}
                </Text>
              </View>

              <View className="p-4 mb-4 border rounded-2xl bg-[#F9F3FF]">
                <Text className="text-xl font-semibold text-[#DF96F9] mt-2">
                  {selectedProperty.precioMensual
                    ? `$${selectedProperty.precioMensual.toFixed(2)} / Depósito`
                    : "Precio no disponible"}
                </Text>
              </View>

              <TouchableOpacity className="bg-[#DF96F9] py-3 px-6 rounded-full items-center shadow-md">
                <Text className="text-white font-bold">Agendar Cita</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default PropertyModal;