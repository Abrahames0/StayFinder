import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum ReservaEstado {
  PENDIENTE = "PENDIENTE",
  CONFIRMADA = "CONFIRMADA",
  CANCELADA = "CANCELADA"
}

export enum UsuarioTipo {
  ESTUDIANTE = "ESTUDIANTE",
  ANFITRION = "ANFITRION"
}



type EagerReserva = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reserva, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly fechaInicio?: string | null;
  readonly fechaFin?: string | null;
  readonly estado?: ReservaEstado | keyof typeof ReservaEstado | null;
  readonly usuarioID: string;
  readonly alojamientoID: string;
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
  readonly estado?: ReservaEstado | keyof typeof ReservaEstado | null;
  readonly usuarioID: string;
  readonly alojamientoID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reserva = LazyLoading extends LazyLoadingDisabled ? EagerReserva : LazyReserva

export declare const Reserva: (new (init: ModelInit<Reserva>) => Reserva) & {
  copyOf(source: Reserva, mutator: (draft: MutableModel<Reserva>) => MutableModel<Reserva> | void): Reserva;
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

type EagerAlojamiento = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Alojamiento, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly precioPorMes?: number | null;
  readonly fotos?: (string | null)[] | null;
  readonly reservas?: (Reserva | null)[] | null;
  readonly anfitrionID: string;
  readonly ubicacion?: Ubicacion | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly alojamientoUbicacionId?: string | null;
}

type LazyAlojamiento = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Alojamiento, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly titulo?: string | null;
  readonly descripcion?: string | null;
  readonly precioPorMes?: number | null;
  readonly fotos?: (string | null)[] | null;
  readonly reservas: AsyncCollection<Reserva>;
  readonly anfitrionID: string;
  readonly ubicacion: AsyncItem<Ubicacion | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly alojamientoUbicacionId?: string | null;
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
  readonly tipo?: UsuarioTipo | keyof typeof UsuarioTipo | null;
  readonly reservas?: (Reserva | null)[] | null;
  readonly alojamientos?: (Alojamiento | null)[] | null;
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
  readonly tipo?: UsuarioTipo | keyof typeof UsuarioTipo | null;
  readonly reservas: AsyncCollection<Reserva>;
  readonly alojamientos: AsyncCollection<Alojamiento>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Usuario = LazyLoading extends LazyLoadingDisabled ? EagerUsuario : LazyUsuario

export declare const Usuario: (new (init: ModelInit<Usuario>) => Usuario) & {
  copyOf(source: Usuario, mutator: (draft: MutableModel<Usuario>) => MutableModel<Usuario> | void): Usuario;
}