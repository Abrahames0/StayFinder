import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Mensaje } from "@/src/models";
import { styled } from "nativewind";
import { RootStackParamList } from "@/app/navigation/Router";
import { useRoute, RouteProp } from "@react-navigation/native";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(Button);

interface ListMensajesProps {
  setinChat: (value: boolean) => void; // Recibir función para cambiar el estado de inChat
}

const ListMensajes: React.FC<ListMensajesProps> = ({ setinChat }) => {
  const route = useRoute<RouteProp<RootStackParamList, "Mensajes">>();
  const { chatRoomId, currentUserId, nameSelected } = route.params;
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMensajes = async () => {
      const mensajesData = await DataStore.query(Mensaje, (m) =>
        m.chatroomID.eq(chatRoomId)
      );
      setMensajes(mensajesData);
    };

    fetchMensajes();

    const subscription = DataStore.observe(Mensaje).subscribe((msg) => {
      if (msg.opType === "INSERT" && msg.element.chatroomID === chatRoomId) {
        setMensajes((prev) => [...prev, msg.element]);
      }
    });

    return () => subscription.unsubscribe();
  }, [chatRoomId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    await DataStore.save(
      new Mensaje({
        texto: newMessage,
        chatroomID: chatRoomId,
        usuarioID: currentUserId,
      })
    );

    setNewMessage("");
  };

  return (

    <StyledView className="flex-1 bg-gray-50">
      {/* Encabezado */}
      <StyledView className="flex-row items-center justify-between bg-white px-4 py-2 shadow-md">
        <TouchableOpacity onPress={() => setinChat(false)}>
          <Text style={{ fontSize: 32, color: "black" }}>←</Text>
        </TouchableOpacity>
        <StyledView>
          <StyledText className="text-lg font-semibold">{nameSelected}</StyledText>
          <StyledText className="text-sm text-gray-500">Departamento Luna</StyledText>
        </StyledView>
      </StyledView>

      {/* Lista de mensajes */}
      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <StyledView
            className={`mb-3 ${
              item.usuarioID === currentUserId
                ? "self-end bg-pink-300 text-white"
                : "self-start bg-gray-200"
            } rounded-lg px-4 py-2 max-w-[80%]`}
          >
            <StyledText className="text-sm">{item.texto}</StyledText>
            <StyledText className="text-xs text-gray-400 mt-1 text-right">
              {item.createdAt}
            </StyledText>
          </StyledView>
        )}
      />

      {/* Barra de entrada */}
      <StyledView className="flex-row items-center bg-white px-4 py-2 border-t border-gray-200">
        <TouchableOpacity>
          <Text style={{ fontSize: 24, marginRight: 8 }}>＋</Text>
        </TouchableOpacity>
        <StyledTextInput
          className="flex-1 border rounded-full px-4 py-2 mr-2 bg-gray-100"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={{ fontSize: 16, color: "blue" }}>Enviar</Text>
        </TouchableOpacity>
      </StyledView>
    </StyledView>

  );
};
export default ListMensajes;



