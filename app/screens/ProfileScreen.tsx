import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Usuario, TipoUsuario } from "../../src/models";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const ProfileScreen: React.FC<any> = ({ navigation }) => {
  const { user, authStatus, signOut } = useAuthenticator();
  const [profileUser, setProfileUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [changingType, setChangingType] = useState<boolean>(false);
  const [isFirstTimeHost, setIsFirstTimeHost] = useState<boolean>(false);

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
          setIsFirstTimeHost(users[0].tipo === TipoUsuario.ESTUDIANTE); // Si es estudiante, es la primera vez como anfitrión
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
    fetchUser();

    const subscription = DataStore.observeQuery(
      Usuario,
      (u) => u.email.eq(user?.username || "")
    ).subscribe((snapshot) => {
      const { items } = snapshot;
      if (items.length > 0) {
        setProfileUser(items[0]);
        setIsFirstTimeHost(items[0].tipo === TipoUsuario.ESTUDIANTE); // Actualiza si es la primera vez
      }
    });

    return () => subscription.unsubscribe();
  }, [authStatus, user]);

  const handleSwitchUserType = async () => {
    if (!profileUser) return;

    const nuevoTipo =
      profileUser.tipo === TipoUsuario.ESTUDIANTE
        ? TipoUsuario.ANFITRION
        : TipoUsuario.ESTUDIANTE;

    setChangingType(true);
    try {
      await DataStore.save(
        Usuario.copyOf(profileUser, (updated) => {
          updated.tipo = nuevoTipo;
        })
      );

      alert(
        `¡Ahora eres ${
          nuevoTipo === TipoUsuario.ANFITRION ? "anfitrión" : "estudiante"
        }!`
      );

      if (nuevoTipo === TipoUsuario.ANFITRION) {
        navigation.navigate("TabsAnfitrion");
      } else {
        navigation.navigate("Tabs");
      }
    } catch (error) {
      console.error("Error al cambiar el tipo de usuario:", error);
      alert("Ocurrió un error al intentar cambiar el tipo de usuario.");
    } finally {
      setChangingType(false);
    }
  };

  if (loading || changingType) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6200EE" />
        <Text className="mt-4 text-gray-500">
          {changingType
            ? "Cambiando tipo de usuario..."
            : "Cargando datos de usuario..."}
        </Text>
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
    navigation.navigate("EditProfileScreen", { user: profileUser });
  };

  return (
    <ScrollView className="flex-1 bg-white px-6">
      <Text className="text-right text-3xl font-bold text-black mt-2 mb-4 mr-4">
        Perfil
      </Text>

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

      <View className="space-y-5">
        <View className="flex-row items-start">
          <FontAwesome
            name="user"
            size={20}
            color="black"
            style={{ marginRight: 8 }}
          />
          <View>
            <Text className="text-lg font-medium text-black">Nombres:</Text>
            <Text className="text-lg text-gray-700" style={{ marginLeft: 20 }}>
              {`${profileUser.nombre} ${profileUser.apellido}`}
            </Text>
          </View>
        </View>

        <View className="flex-row items-start">
          <FontAwesome
            name="calendar"
            size={20}
            color="black"
            style={{ marginRight: 8 }}
          />
          <View>
            <Text className="text-lg font-medium text-black">Edad:</Text>
            <Text className="text-lg text-gray-700" style={{ marginLeft: 20 }}>
              {profileUser.edad} años
            </Text>
          </View>
        </View>

        <View className="flex-row items-start">
          <FontAwesome
            name="phone"
            size={20}
            color="black"
            style={{ marginRight: 8 }}
          />
          <View>
            <Text className="text-lg font-medium text-black">
              Número de teléfono:
            </Text>
            <Text className="text-lg text-gray-700" style={{ marginLeft: 20 }}>
              {profileUser.telefono}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-8 space-y-4 items-center">
        <TouchableOpacity
          onPress={handleSwitchUserType}
          className="flex-row items-center justify-between rounded-full px-4 py-4 w-52 shadow-md"
          style={{ backgroundColor: "#DF96F9" }}
        >
          <Text className="text-white font-semibold text-base text-center">
            {profileUser.tipo === TipoUsuario.ESTUDIANTE
              ? "Cambiar a anfitrión"
              : "Cambiar a estudiante"}
          </Text>
          <MaterialIcons name="loop" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mt-6" onPress={handleEditProfile}>
        <Text className="text-center font-bold text-black text-sm">
          Editar Perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4" onPress={signOut}>
        <Text className="text-center text-gray-600 text-sm">Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
