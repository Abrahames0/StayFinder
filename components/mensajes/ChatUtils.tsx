import { DataStore, ModelInit } from "@aws-amplify/datastore";
import { ChatRoom, UsuarioChatRoom } from "@/src/models";

export const createChatRoom = async (
  currentUserId: string,
  selectedUserId: string
): Promise<ChatRoom> => {
  try {
    // Crear la sala de chat vacía
    const newChatRoom = await DataStore.save(new ChatRoom({}));

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
