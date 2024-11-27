import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

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
  readonly chatID: string;
  readonly Chat?: Chat | null;
  readonly contenido?: string | null;
  readonly timestamp?: string | null;
  readonly remitente?: Usuario | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly mensajeRemitenteId?: string | null;
}

type LazyMensaje = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Mensaje, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatID: string;
  readonly Chat: AsyncItem<Chat | undefined>;
  readonly contenido?: string | null;
  readonly timestamp?: string | null;
  readonly remitente: AsyncItem<Usuario | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly mensajeRemitenteId?: string | null;
}

export declare type Mensaje = LazyLoading extends LazyLoadingDisabled ? EagerMensaje : LazyMensaje

export declare const Mensaje: (new (init: ModelInit<Mensaje>) => Mensaje) & {
  copyOf(source: Mensaje, mutator: (draft: MutableModel<Mensaje>) => MutableModel<Mensaje> | void): Mensaje;
}

type EagerChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Chat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mensajes?: (Mensaje | null)[] | null;
  readonly usuario1?: Usuario | null;
  readonly usuario2?: Usuario | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatUsuario1Id?: string | null;
  readonly chatUsuario2Id?: string | null;
}

type LazyChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Chat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly mensajes: AsyncCollection<Mensaje>;
  readonly usuario1: AsyncItem<Usuario | undefined>;
  readonly usuario2: AsyncItem<Usuario | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatUsuario1Id?: string | null;
  readonly chatUsuario2Id?: string | null;
}

export declare type Chat = LazyLoading extends LazyLoadingDisabled ? EagerChat : LazyChat

export declare const Chat: (new (init: ModelInit<Chat>) => Chat) & {
  copyOf(source: Chat, mutator: (draft: MutableModel<Chat>) => MutableModel<Chat> | void): Chat;
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
  readonly alojaminetoID: string;
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
  readonly alojaminetoID: string;
  readonly usuarioID: string;
  readonly Usuario: AsyncItem<Usuario | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reserva = LazyLoading extends LazyLoadingDisabled ? EagerReserva : LazyReserva

export declare const Reserva: (new (init: ModelInit<Reserva>) => Reserva) & {
  copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva>) => MutableModel<Reserva> | void): Reserva;
}

type EagerAlojamineto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Alojamineto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly fotosAlojamiento?: (string | null)[] | null;
  readonly precioMensual?: number | null;
  readonly reservas?: (Reserva | null)[] | null;
  readonly usuarioID: string;
  readonly Usuario?: Usuario | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAlojamineto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Alojamineto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly fotosAlojamiento?: (string | null)[] | null;
  readonly precioMensual?: number | null;
  readonly reservas: AsyncCollection<Reserva>;
  readonly usuarioID: string;
  readonly Usuario: AsyncItem<Usuario | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Alojamineto = LazyLoading extends LazyLoadingDisabled ? EagerAlojamineto : LazyAlojamineto

export declare const Alojamineto: (new (init: ModelInit<Alojamineto>) => Alojamineto) & {
  copyOf(source: Alojamineto, mutator: (draft: MutableModel<Alojamineto>) => MutableModel<Alojamineto> | void): Alojamineto;
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
  readonly Alojaminetos?: (Alojamineto | null)[] | null;
  readonly Reservas?: (Reserva | null)[] | null;
  readonly edad?: string | null;
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
  readonly Alojaminetos: AsyncCollection<Alojamineto>;
  readonly Reservas: AsyncCollection<Reserva>;
  readonly edad?: string | null;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Ubicacion = LazyLoading extends LazyLoadingDisabled ? EagerUbicacion : LazyUbicacion

export declare const Ubicacion: (new (init: ModelInit<Ubicacion>) => Ubicacion) & {
  copyOf(source: Ubicacion, mutator: (draft: MutableModel<Ubicacion>) => MutableModel<Ubicacion> | void): Ubicacion;
}