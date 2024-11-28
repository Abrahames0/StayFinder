import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { Mensaje } from "@/src/models";
import { styled } from "nativewind";
import { RootStackParamList } from "@/app/navigation/Router";
import { useRoute, RouteProp } from "@react-navigation/native";

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledButton = styled(Button);


const ListMensajes: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Mensajes">>();
  const { chatRoomId, currentUserId } = route.params;
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
    <StyledView className="flex-1 bg-white">
      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StyledView className="p-4">
            <StyledText
              className={`${
                item.usuarioID === currentUserId ? "text-right" : "text-left"
              }`}
            >
              {item.texto}
            </StyledText>
          </StyledView>
        )}
      />
      <StyledView className="flex-row items-center p-4 border-t border-gray-200">
        <StyledTextInput
          className="flex-1 border rounded-lg p-2 mr-2"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <StyledButton title="Enviar" onPress={sendMessage} />
      </StyledView>
    </StyledView>
  );
};
export default ListMensajes;
