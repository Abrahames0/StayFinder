// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ReservaEstado = {
  "PENDIENTE": "PENDIENTE",
  "CONFIRMADA": "CONFIRMADA",
  "CANCELADA": "CANCELADA"
};

const UsuarioTipo = {
  "ESTUDIANTE": "ESTUDIANTE",
  "ANFITRION": "ANFITRION"
};

const { Reserva, Ubicacion, Alojamiento, Usuario } = initSchema(schema);

export {
  Reserva,
  Ubicacion,
  Alojamiento,
  Usuario,
  ReservaEstado,
  UsuarioTipo
};