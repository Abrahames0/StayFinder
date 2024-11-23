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

const { Mensaje, Chat, Reserva, Alojamineto, Usuario, Ubicacion } = initSchema(schema);

export {
  Mensaje,
  Chat,
  Reserva,
  Alojamineto,
  Usuario,
  Ubicacion,
  EstadoReserva,
  TipoUsuario
};