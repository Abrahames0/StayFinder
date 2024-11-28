import React, { useState, useEffect } from "react";
import { View } from "react-native";
import ListMensajes from "@/components/mensajes/ListMensajes";
import Contacts from "@/components/mensajes/Contacts";
import { useUser } from "@/components/hooks/UserContext";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/Router";

const MessagesScreen = () => {
  const { user } = useUser();
  const [currentUserID, setCurrentUserID] = useState<string>("");

  // Accede al parámetro `chatRoomId` si está presente en la navegación
  const route = useRoute<RouteProp<RootStackParamList, "Mensajes">>();
  const { chatRoomId } = route.params || {}; // Si no hay parámetros, será `undefined`

  useEffect(() => {
    if (user?.id) {
      setCurrentUserID(user.id); // Asignar el ID del usuario autenticado
    }
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
  {chatRoomId ? (
    <ListMensajes/>
  ) : (
    <Contacts currentUserId={currentUserID} />
  )}
</View>

  );
};

export default MessagesScreen;
