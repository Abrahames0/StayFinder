import React, { useLayoutEffect, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario, ChatRoom, Mensaje } from "@/src/models";
import { styled } from "nativewind";
import { createChatRoom } from "@/components/mensajes/ChatUtils";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/Router";
import { useUser } from "../hooks/UserContext";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

interface Props {
  currentUserId: string;
  setinChat: (value: boolean) => void;
}

const Contacts: React.FC<Props> = ({ currentUserId , setinChat}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [contacts, setContacts] = useState<Usuario[]>([]);
  const [messages, setMessages] = useState<Map<string, string>>(new Map()); // Guardar los últimos mensajes

  // Obtener contactos y el último mensaje enviado
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await DataStore.start();
        const currentUser = await DataStore.query(Usuario, currentUserId);
        if (!currentUser) {
          console.error("Usuario actual no encontrado");
        }

        const targetType = currentUser.tipo === "ANFITRION" ? "ESTUDIANTE" : "ANFITRION";
        const users = await DataStore.query(Usuario, (u) => u.tipo.eq(targetType));
        setContacts(users);

        // Obtener el último mensaje de cada contacto
        for (const user of users) {
          const chatKey =
            currentUserId < user.id
              ? `${currentUserId}_${user.id}`
              : `${user.id}_${currentUserId}`;

          // Buscar ChatRoom
          const chatRooms = await DataStore.query(ChatRoom, (chatRoom) => chatRoom.chatKey.eq(chatKey));
          const chatRoom = chatRooms[0]; // Tomamos el primer chatRoom

          if (chatRoom) {
            // Obtener el último mensaje
            const messages = await DataStore.query(Mensaje, (message) =>
              message.chatroomID.eq(chatRoom.id)
            );
            console.log(messages);
            

            // Si existen mensajes, obtener el último
            if (messages.length > 0) {
              const lastMessage = messages[messages.length - 1].texto;
              setMessages((prevMessages) => new Map(prevMessages).set(user.id, lastMessage));
            }
          }
        }
      } catch (error) {
        console.error("Error al obtener contactos y mensajes:", error);
      }
    };

    fetchContacts();
  }, [currentUserId]);

  const handleSelectContact = async (selectedUserId: string, nameSelected: string) => {
    try {
      const chatKey = currentUserId < selectedUserId
        ? `${currentUserId}_${selectedUserId}`
        : `${selectedUserId}_${currentUserId}`;

      const existingChatRooms = await DataStore.query(ChatRoom, (chatRoom) =>
        chatRoom.chatKey.eq(chatKey)
      );

      const existingChatRoom = existingChatRooms[0];

      if (existingChatRoom) {
        setinChat(true);


        navigation.navigate("Mensajes", {
          chatRoomId: existingChatRoom.id,
          currentUserId,
          nameSelected
        });


      } else {
        const newChatRoom = await createChatRoom(currentUserId, selectedUserId);
        setinChat(true);


        navigation.navigate("Mensajes", {
          chatRoomId: newChatRoom.id,
          currentUserId,
          nameSelected
        });
      }
    } catch (error) {
      console.error("Error al seleccionar contacto:", error);
    }
  };

  return (
    <StyledView className="flex-1 bg-gray-50 p-4">
      <StyledText className="text-3xl font-bold text-[#2F4F85] mb-6">Mensajes</StyledText>
      
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledTouchableOpacity
            className="flex-row items-center p-4 mb-4 border-b border-gray-300 rounded-lg bg-white shadow-sm"
            onPress={() => {
              if (item.nombre) {
                handleSelectContact(item.id, item.nombre);
              } else {
                console.error("El nombre del usuario es nulo o indefinido");
              }
            }}
          >
            {/* Foto del contacto */}
            <StyledImage
              source={{ uri: item.fotoUsuario || "https://via.placeholder.com/150" }}
              className="w-12 h-12 rounded-full mr-4"
            />
            <StyledView className="flex-1">
              <StyledText className="text-lg font-semibold text-[#2F4F85]">{item.nombre}</StyledText>
              <StyledText className="text-sm text-gray-500">
                {messages.get(item.id) || "No hay mensajes"}
              </StyledText>
            </StyledView>
            {/* //Agregar la logia para que en lugar de este numero apareza el numero de mesajes nuevos sin abrir el chatRoom */}
            <StyledText className="text-sm text-red-500 p-4" > 3</StyledText>

            <StyledText className="text-sm text-[#DF96F9]">Ver</StyledText>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );
};

export default Contacts;
