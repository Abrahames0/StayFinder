import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Usuario } from "../../src/models";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { user, authStatus } = useAuthenticator();
  const [profileUser, setProfileUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Función que carga el usuario desde DataStore
  const fetchUser = async () => {
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

  useEffect(() => {
    fetchUser(); // Carga el usuario cuando se monta el componente

    // Sincronización en segundo plano usando observeQuery
    const subscription = DataStore.observeQuery(Usuario, (u) => u.email.eq(user?.username || '')).subscribe(snapshot => {
      const { items, isSynced } = snapshot;
      if (items.length > 0) {
        // Si el conjunto de datos está sincronizado, actualizamos el perfil
        setProfileUser(items[0]);
        console.log('[Snapshot] Usuario actualizado:', items[0]);
      }

      console.log('[Snapshot] isSynced:', isSynced);
    });

    // Limpia la suscripción cuando el componente se desmonte
    return () => subscription.unsubscribe();

  }, [authStatus, user]); // Vuelve a cargar los datos cada vez que el authStatus o el usuario cambian

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (!profileUser) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-red-500">Usuario no encontrado.</Text>
      </View>
    );
  }

  const handleEditProfile = () => {
    // Navegar a la pantalla de edición y pasar los datos del usuario
    navigation.navigate("EditProfileScreen", { user: profileUser });
  };

  return (
    <ScrollView className="flex-1 bg-white px-6">
      {/* Título Perfil */}
      <Text className="text-right text-3xl font-bold text-black mt-2 mb-4 mr-4">
        Perfil
      </Text>

      {/* Foto y nombre */}
      <View className="items-center mb-6">
        <Image
          source={{
            uri:
              profileUser.fotoUsuario && profileUser.fotoUsuario !== "default"
                ? profileUser.fotoUsuario
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          }}
          className="w-28 h-28 rounded-full mb-2"
        />
        <Text className="text-lg font-bold text-black">{profileUser.nombre}</Text>
      </View>

      {/* Información del usuario */}
      <View className="space-y-5">
        {/* Nombres */}
        <View className="flex-row items-start">
          <FontAwesome name="user" size={20} color="black" style={{ marginRight: 8 }} />
          <View>
            <Text className="text-lg font-medium text-black">Nombres:</Text>
            <Text className="text-lg text-gray-700" style={{ marginLeft: 20 }}>
              {`${profileUser.nombre} ${profileUser.apellido}`}
            </Text>
          </View>
        </View>

        {/* Edad */}
        <View className="flex-row items-start">
          <FontAwesome name="calendar" size={20} color="black" style={{ marginRight: 8 }} />
          <View>
            <Text className="text-lg font-medium text-black">Edad:</Text>
            <Text className="text-lg text-gray-700" style={{ marginLeft: 20 }}>
              {profileUser.edad} años
            </Text>
          </View>
        </View>

        {/* Número de teléfono */}
        <View className="flex-row items-start">
          <FontAwesome name="phone" size={20} color="black" style={{ marginRight: 8 }} />
          <View>
            <Text className="text-lg font-medium text-black">Número de teléfono:</Text>
            <Text className="text-lg text-gray-700" style={{ marginLeft: 20 }}>
              {profileUser.telefono}
            </Text>
          </View>
        </View>
      </View>

      {/* Botones */}
      <View className="mt-8 space-y-4 items-center">
        <TouchableOpacity
          className="flex-row items-center justify-between rounded-full px-4 py-4 w-48 shadow-md"
          style={{ backgroundColor: "#DF96F9" }}
        >
          <Text className="text-black font-semibold text-sm text-center">
            ¿Quieres ser anfitrión?
          </Text>
          <MaterialIcons name="loop" size={16} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between rounded-full px-4 py-4 w-48 shadow-md"
          style={{ backgroundColor: "#DF96F9" }}
        >
          <Text className="text-black font-semibold text-sm text-center">
            Cambiar a anfitrión
          </Text>
          <MaterialIcons name="loop" size={16} color="black" />
        </TouchableOpacity>
      </View>

      {/* Editar perfil */}
      <TouchableOpacity className="mt-6" onPress={handleEditProfile}>
        <Text className="text-center font-bold text-black text-sm">
          Editar Perfil
        </Text>
      </TouchableOpacity>

      {/* Cerrar sesión */}
      <TouchableOpacity className="mt-4">
        <Text className="text-center text-gray-600 text-sm">Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
