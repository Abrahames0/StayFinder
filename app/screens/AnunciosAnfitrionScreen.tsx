import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Modal,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Usuario, Alojamiento } from "@/src/models";
import { Ionicons } from "@expo/vector-icons";

const AnunciosAnfitrionScreen: React.FC = () => {
  const { user, authStatus } = useAuthenticator();
  const [profileUser, setProfileUser] = useState<Usuario | null>(null);
  const [ads, setAds] = useState<Alojamiento[]>([]);
  const [selectedAd, setSelectedAd] = useState<Alojamiento | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      if (authStatus === "authenticated" && user) {
        const email = user.signInDetails?.loginId || user.username;

        if (!email) {
          console.error("No se encontró un email válido para el usuario.");
          return;
        }

        const users = await DataStore.query(Usuario, (u) => u.email.eq(email));
        if (users.length > 0) {
          setProfileUser(users[0]);
        } else {
          console.error("Usuario no encontrado en DataStore.");
        }
      }
    } catch (err) {
      console.error("Error al obtener el usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlojamientos = async () => {
    if (!profileUser) return;

    try {
      setLoading(true);
      const alojamientos = await DataStore.query(Alojamiento, (a) =>
        a.usuarioID.eq(profileUser.id)
      );
      setAds(alojamientos);
    } catch (error) {
      console.error("Error al obtener los alojamientos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [authStatus, user]);

  useEffect(() => {
    if (profileUser) {
      fetchAlojamientos();
    }
  }, [profileUser]);

  const openModal = (ad: Alojamiento) => {
    setSelectedAd(ad);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedAd(null);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#6200EE" />
        <Text className="mt-4 text-gray-500">Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* Título y botón */}
      <View className="flex-row justify-between items-center px-4 mt-12 mb-2">
        <Text className="text-2xl font-bold text-gray-800">Tus anuncios creados</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-purple-400 justify-center items-center border-2 border-purple-400">
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Anuncios */}
      <ScrollView className="flex-1 px-4 py-2">
        {ads.map((ad) => (
          <TouchableOpacity
            key={ad.id}
            onPress={() => openModal(ad)}
            className="mb-4 rounded-xl overflow-hidden border-2 border-black"
          >
            <ImageBackground
              source={{
                uri: ad.fotosAlojamiento?.[0] || "https://via.placeholder.com/150",
              }}
              className="h-44 justify-end"
              imageStyle={{ resizeMode: "cover", opacity: 0.2 }}
            >
              <View className="absolute inset-0 p-4 justify-end">
                <Text className="text-lg font-bold text-gray-800">{ad.titulo}</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  {ad.camas} camas - {ad.banos} baño
                </Text>
                <View className="mt-3 bg-purple-400 py-1 px-3 rounded-full border border-black self-start">
                  <Text className="text-white text-sm font-medium">Creado</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      {selectedAd && (
        <Modal
  visible={isModalVisible}
  transparent
  animationType="slide"
  onRequestClose={closeModal}
>
  {/* Fondo semitransparente */}
  <View
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad
    }}
  />

  {/* Contenido del modal */}
  <View
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingHorizontal: 24,
      paddingBottom: 32,
      paddingTop: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // Sombra para Android
    }}
  >
    {/* Botón de cerrar */}
    <TouchableOpacity
      onPress={closeModal}
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        width: 25,
        height: 25,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="close" size={24} color="black" />
    </TouchableOpacity>

    {/* Imagen */}
    <ImageBackground
      source={{
        uri:
          selectedAd?.fotosAlojamiento?.[0] ||
          "https://via.placeholder.com/150",
      }}
      style={{
        width: 133, // Ancho especificado
        height: 80, // Altura especificada
        borderRadius: 15,
        alignSelf: "center",
        marginTop: 16, // Espaciado reducido
        marginBottom: 8, // Espaciado reducido
        overflow: "hidden",
      }}
      imageStyle={{ resizeMode: "cover" }}
    />

    {/* Título */}
    <Text
      style={{
        fontFamily: "Manrope",
        fontWeight: "700",
        fontSize: 14,
        lineHeight: 19.12,
        textAlign: "center",
        color: "#333",
        marginBottom: 12, // Reducido para menos espacio
      }}
    >
      {selectedAd?.titulo}
    </Text>

    {/* Botón Editar */}
    <TouchableOpacity
      style={{
        width: 270,
        height: 40,
        backgroundColor: "#DF96F9", // Color especificado
        borderRadius: 15,
        borderWidth: 1, // Borde negro
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 10,
      }}
    >
      <Text style={{ color: "#FFF", fontWeight: "600" }}>Editar Alojamiento</Text>
    </TouchableOpacity>

    {/* Botón Eliminar */}
    <TouchableOpacity
      style={{
        width: 250,
        height: 40,
        backgroundColor: "#000000A6", // Color especificado
        borderRadius: 15,
        borderWidth: 1, // Borde negro
        borderColor: "black",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 10,
      }}
    >
      <Text style={{ color: "#FFF", fontWeight: "600" }}>Eliminar Alojamiento</Text>
    </TouchableOpacity>
  </View>
</Modal>


      )}
    </View>
  );
};

export default AnunciosAnfitrionScreen;
