import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario } from "@/src/models";
import { styled } from "nativewind";
import { createChatRoom } from "@/components/mensajes/ChatUtils"; // Función de creación del chatroom
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/Router";
import { ChatRoom } from "@/src/models";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface Props {
  currentUserId: string;
  setinChat: (value: boolean) => void;
}


const Contacts: React.FC<Props> = ({ currentUserId , setinChat}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [contacts, setContacts] = useState<Usuario[]>([]);
  
  if (!currentUserId) {
    console.error("currentUserId no está definido");
  }
  // Obtener contactos dinámicamente según el tipo del usuario actual
  useLayoutEffect(() => {
    const fetchContacts = async () => {
      try {
        // Obtener el usuario autenticado para determinar su tipo
        await DataStore.start();
        const currentUser = await DataStore.query(Usuario, currentUserId);
        if (!currentUser) {
          console.error("Usuario actual no encontrado");
          return;
        }

        // Determinar el tipo de usuario opuesto
        const targetType = currentUser.tipo === "ANFITRION" ? "ESTUDIANTE" : "ANFITRION";

        // Buscar contactos del tipo opuesto
        const users = await DataStore.query(Usuario, (u) => u.tipo.eq(targetType));
        setContacts(users);
      } catch (error) {
        console.error("Error al obtener contactos:", error);
      }
    };

    fetchContacts();
  }, [currentUserId]); // Se vuelve a ejecutar si cambia el `currentUserId`

  const handleSelectContact = async (selectedUserId: string, nameSelected: string) => {
    try {
      console.log(nameSelected);
      
      // Generar el chatKey en orden alfabético
      const chatKey =
        currentUserId < selectedUserId
          ? `${currentUserId}_${selectedUserId}`
          : `${selectedUserId}_${currentUserId}`;

      // Buscar un ChatRoom existente con ese chatKey
      const existingChatRooms = await DataStore.query(ChatRoom, (chatRoom) =>
        chatRoom.chatKey.eq(chatKey)
      );

      const existingChatRoom = existingChatRooms[0]; // Tomar el primer ChatRoom si existe

      if (existingChatRoom) {
        // Si existe, navegar al chat existente
        setinChat(true);
        navigation.navigate("Mensajes", {
          chatRoomId: existingChatRoom.id,
          currentUserId,
          nameSelected
        });
        console.log("Chat existente seleccionado");
      } else {
        // Crear nuevo ChatRoom si no existe
        const newChatRoom = await createChatRoom(currentUserId, selectedUserId);
        setinChat(true);
        navigation.navigate("Mensajes", {
          chatRoomId: newChatRoom.id,
          currentUserId,
          nameSelected
        });
        console.log("Nuevo chat creado");
      }
    } catch (error) {
      console.error("Error al seleccionar contacto:", error);
    }
  };

  return (
    <StyledView className="flex-1 bg-white p-4">
      <StyledText className="text-xl font-bold mb-4">Mensajes</StyledText>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledTouchableOpacity
            className="p-4 border-b border-gray-200"
            onPress={() => {
              if (item.nombre) {
                handleSelectContact(item.id, item.nombre);
              } else {
                console.error("El nombre del usuario es nulo o indefinido");
              }
            }}
          >
            <StyledText className="text-lg">{item.nombre}</StyledText>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );
};

export default Contacts;