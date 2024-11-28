import { DataStore, ModelInit } from "@aws-amplify/datastore";
import { ChatRoom, UsuarioChatRoom } from "@/src/models";

export const createChatRoom = async (
  currentUserId: string,
  selectedUserId: string
): Promise<ChatRoom> => {
  try {
    // Generar el chatKey concatenando los IDs de los usuarios en orden alfabético
    const chatKey =
      currentUserId < selectedUserId
        ? `${currentUserId}_${selectedUserId}`
        : `${selectedUserId}_${currentUserId}`;

    // Crear la sala de chat con el chatKey
    const newChatRoom = await DataStore.save(
      new ChatRoom({
        chatKey, // Agregar el chatKey
      })
    );

    // Relacionar usuarios con la sala
    await Promise.all([
      DataStore.save(
        new UsuarioChatRoom({
          chatRoomId: newChatRoom.id,
          usuarioId: currentUserId,
        } as unknown as ModelInit<UsuarioChatRoom>)
      ),
      DataStore.save(
        new UsuarioChatRoom({
          chatRoomId: newChatRoom.id,
          usuarioId: selectedUserId,
        } as unknown as ModelInit<UsuarioChatRoom>)
      ),
    ]);

    return newChatRoom;
  } catch (error) {
    console.error("Error al crear el chatroom:", error);
    throw new Error("No se pudo crear el chatroom.");
  }
};
