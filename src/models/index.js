// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EstadoReserva = {
  "PENDIENTE": "PENDIENTE",
  "CONFIRMADA": "CONFIRMADA",
  "CANCELADA": "CANCELADA"
};

const TipoUsuario = {
  "ESTUDIANTE": "ESTUDIANTE",
  "ANFITRION": "ANFITRION"
};

const { Mensaje, ChatRoom, Reserva, Alojamiento, Usuario, Ubicacion, UsuarioChatRoom } = initSchema(schema);

export {
  Mensaje,
  ChatRoom,
  Reserva,
  Alojamiento,
  Usuario,
  Ubicacion,
  UsuarioChatRoom,
  EstadoReserva,
  TipoUsuario
};