import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum EstadoReserva {
  PENDIENTE = "PENDIENTE",
  CONFIRMADA = "CONFIRMADA",
  CANCELADA = "CANCELADA"
}

export enum TipoUsuario {
  ESTUDIANTE = "ESTUDIANTE",
  ANFITRION = "ANFITRION"
}



type EagerMensaje = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mensaje, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly texto?: string | null;
  readonly chatroomID: string;
  readonly usuarioID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMensaje = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mensaje, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly texto?: string | null;
  readonly chatroomID: string;
  readonly usuarioID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Mensaje = LazyLoading extends LazyLoadingDisabled ? EagerMensaje : LazyMensaje

export declare const Mensaje: (new (init: ModelInit<Mensaje>) => Mensaje) & {
  copyOf(source: Mensaje, mutator: (draft: MutableModel<Mensaje>) => MutableModel<Mensaje> | void): Mensaje;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Mensajes?: (Mensaje | null)[] | null;
  readonly usuarios?: (UsuarioChatRoom | null)[] | null;
  readonly LastMensaje?: Mensaje | null;
  readonly chatKey?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMensajeId?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Mensajes: AsyncCollection<Mensaje>;
  readonly usuarios: AsyncCollection<UsuarioChatRoom>;
  readonly LastMensaje: AsyncItem<Mensaje | undefined>;
  readonly chatKey?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMensajeId?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerReserva = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reserva, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fechaInicio?: string | null;
  readonly fechaFin?: string | null;
  readonly estado?: EstadoReserva | keyof typeof EstadoReserva | null;
  readonly alojamientoID: string;
  readonly usuarioID: string;
  readonly Usuario?: Usuario | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReserva = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reserva, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fechaInicio?: string | null;
  readonly fechaFin?: string | null;
  readonly estado?: EstadoReserva | keyof typeof EstadoReserva | null;
  readonly alojamientoID: string;
  readonly usuarioID: string;
  readonly Usuario: AsyncItem<Usuario | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reserva = LazyLoading extends LazyLoadingDisabled ? EagerReserva : LazyReserva

export declare const Reserva: (new (init: ModelInit<Reserva>) => Reserva) & {
  copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva>) => MutableModel<Reserva> | void): Reserva;
}

type EagerAlojamiento = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Alojamiento, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly fotosAlojamiento?: (string | null)[] | null;
  readonly precioMensual?: number | null;
  readonly reservas?: (Reserva | null)[] | null;
  readonly esRecomendado?: boolean | null;
  readonly Usuario?: Usuario | null;
  readonly banos?: string | null;
  readonly reglas?: string | null;
  readonly wifi?: string | null;
  readonly usuarioID: string;
  readonly tiempoRenta?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAlojamiento = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Alojamiento, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly fotosAlojamiento?: (string | null)[] | null;
  readonly precioMensual?: number | null;
  readonly reservas: AsyncCollection<Reserva>;
  readonly esRecomendado?: boolean | null;
  readonly Usuario: AsyncItem<Usuario | undefined>;
  readonly banos?: string | null;
  readonly reglas?: string | null;
  readonly wifi?: string | null;
  readonly usuarioID: string;
  readonly tiempoRenta?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Alojamiento = LazyLoading extends LazyLoadingDisabled ? EagerAlojamiento : LazyAlojamiento

export declare const Alojamiento: (new (init: ModelInit<Alojamiento>) => Alojamiento) & {
  copyOf(source: Alojamiento, mutator: (draft: MutableModel<Alojamiento>) => MutableModel<Alojamiento> | void): Alojamiento;
}

type EagerUsuario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre?: string | null;
  readonly apellido?: string | null;
  readonly email?: string | null;
  readonly telefono?: string | null;
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario | null;
  readonly fotoUsuario?: string | null;
  readonly Alojamientos?: (Alojamiento | null)[] | null;
  readonly Reservas?: (Reserva | null)[] | null;
  readonly edad?: string | null;
  readonly Mensajes?: (Mensaje | null)[] | null;
  readonly ChatRooms?: (UsuarioChatRoom | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsuario = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Usuario, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly nombre?: string | null;
  readonly apellido?: string | null;
  readonly email?: string | null;
  readonly telefono?: string | null;
  readonly tipo?: TipoUsuario | keyof typeof TipoUsuario | null;
  readonly fotoUsuario?: string | null;
  readonly Alojamientos: AsyncCollection<Alojamiento>;
  readonly Reservas: AsyncCollection<Reserva>;
  readonly edad?: string | null;
  readonly Mensajes: AsyncCollection<Mensaje>;
  readonly ChatRooms: AsyncCollection<UsuarioChatRoom>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Usuario = LazyLoading extends LazyLoadingDisabled ? EagerUsuario : LazyUsuario

export declare const Usuario: (new (init: ModelInit<Usuario>) => Usuario) & {
  copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario>) => MutableModel<Usuario> | void): Usuario;
}

type EagerUbicacion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ubicacion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly direccion?: string | null;
  readonly ciudad?: string | null;
  readonly estado?: string | null;
  readonly codigoPostal?: string | null;
  readonly latitud?: number | null;
  readonly longitud?: number | null;
  readonly Alojamiento?: Alojamiento | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ubicacionAlojamientoId?: string | null;
}

type LazyUbicacion = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ubicacion, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly direccion?: string | null;
  readonly ciudad?: string | null;
  readonly estado?: string | null;
  readonly codigoPostal?: string | null;
  readonly latitud?: number | null;
  readonly longitud?: number | null;
  readonly Alojamiento: AsyncItem<Alojamiento | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ubicacionAlojamientoId?: string | null;
}

export declare type Ubicacion = LazyLoading extends LazyLoadingDisabled ? EagerUbicacion : LazyUbicacion

export declare const Ubicacion: (new (init: ModelInit<Ubicacion>) => Ubicacion) & {
  copyOf(source: Ubicacion, mutator: (draft: MutableModel<Ubicacion>) => MutableModel<Ubicacion> | void): Ubicacion;
}

type EagerUsuarioChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UsuarioChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly usuarioId?: string | null;
  readonly chatRoom: ChatRoom;
  readonly usuario: Usuario;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsuarioChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UsuarioChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly usuarioId?: string | null;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly usuario: AsyncItem<Usuario>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UsuarioChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerUsuarioChatRoom : LazyUsuarioChatRoom

export declare const UsuarioChatRoom: (new (init: ModelInit<UsuarioChatRoom>) => UsuarioChatRoom) & {
  copyOf(source: UsuarioChatRoom, mutator: (draft: MutableModel<UsuarioChatRoom>) => MutableModel<UsuarioChatRoom> | void): UsuarioChatRoom;
}