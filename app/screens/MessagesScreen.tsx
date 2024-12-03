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
  const [inChat, setinChat] = useState<boolean>(false);

  // Accede al parámetro `chatRoomId` si está presente en la navegación
  const route = useRoute<RouteProp<RootStackParamList, "Mensajes">>();
  const { chatRoomId } = route.params || {}; // Si no hay parámetros, será `undefined`

  useEffect(() => {
    if (user?.id) {
      setCurrentUserID(user.id);
    }    
  }, [user]);

  return (
    <View style={{ flex: 1 }}>
  {inChat ? (
    <ListMensajes setinChat={setinChat}/>
  ) : (
    <Contacts currentUserId={currentUserID} setinChat={setinChat}/>
  )}
</View>

  );
};

export default MessagesScreen;
