import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario } from "@/src/models";
import { styled } from "nativewind";
import { createChatRoom } from "@/components/mensajes/ChatUtils"; // Función de creación del chatroom
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigation/Router";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface Props {
  currentUserId: string;
}


const Contacts: React.FC<Props> = ({ currentUserId }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [contacts, setContacts] = useState<Usuario[]>([]);


  // Obtener contactos de tipo "ANFITRION"
  useEffect(() => {
    const fetchContacts = async () => {
      const users = await DataStore.query(Usuario, (u) => u.tipo.eq("ANFITRION"));
      setContacts(users);
    };

    fetchContacts();
  }, []);

  const handleSelectContact = async (selectedUserId: string) => {
    try {
      // Crear el ChatRoom
      const newChatRoom = await createChatRoom(currentUserId, selectedUserId);
      // Navegar a la pantalla de mensajes del chatroom
      navigation.navigate("Mensajes", { chatRoomId: newChatRoom.id , currentUserId: currentUserId});
      console.log("Se crea el chat");

    } catch (error) {
      console.error("Error al seleccionar contacto:", error);
    }
  };

  return (
    <StyledView className="flex-1 bg-white p-4">
      <StyledText className="text-xl font-bold mb-4">Contactos</StyledText>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledTouchableOpacity
            className="p-4 border-b border-gray-200"
            onPress={() => handleSelectContact(item.id)}
          >
            <StyledText className="text-lg">{item.nombre}</StyledText>
          </StyledTouchableOpacity>
        )}
      />
    </StyledView>
  );
};

export default Contacts;
