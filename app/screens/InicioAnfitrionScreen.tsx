import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Reserva, Alojamiento } from '@/src/models';
import { styled } from 'nativewind';
import AllReservationsScreen from '@/components/AllReservationsScreen';
import { useUser } from '@/components/hooks/UserContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

// Tipo extendido para incluir alojamientoImage
type ExtendedReserva = Reserva & { alojamientoImage: string, name: string , banos:string , camas:string};

const ReservationsScreen = () => {
  const { user } = useUser();
  const [reservations, setReservations] = useState<ExtendedReserva[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<ExtendedReserva[]>([]);
  const [filter, setFilter] = useState<'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA'>('PENDIENTE');

  useEffect(() => {
    const fetchReservationsWithAlojamiento = async () => {
      const allReservations = await DataStore.query(Reserva); 
      console.log(allReservations);
           
  
      const reservationsWithAlojamiento = await Promise.all(
        allReservations.map(async (reservation) => {
          const alojamiento = await DataStore.query(Alojamiento, reservation.alojamientoID);
          return {
            ...reservation,
            alojamientoImage:
              (Array.isArray(alojamiento?.fotosAlojamiento) && alojamiento?.fotosAlojamiento[0]) || // Extrae la primera imagen
              'https://via.placeholder.com/100', // Imagen por defecto
              name: alojamiento?.titulo,
              banos: alojamiento?.banos,
              camas: alojamiento?.camas
          };
        })
      );
      console.log(reservationsWithAlojamiento);
      
  
      setReservations(reservationsWithAlojamiento as ExtendedReserva[]); // Asegura que el tipo sea consistente
      setFilteredReservations(reservationsWithAlojamiento as ExtendedReserva[]);
    };
  
    fetchReservationsWithAlojamiento();
  }, []);
  

  // Filtro de reservaciones
  useEffect(() => {
    setFilteredReservations(reservations.filter((res) => res.estado === filter));
  }, [filter, reservations]);

  const handleCreateReserv = () => {
    // Función de ejemplo
  };

  // Renderizar cada reservación
  const renderReservation = ({ item }: { item: ExtendedReserva }) => (
    <StyledView className="flex-row p-4 bg-white rounded-lg shadow mb-4 border  border-black">
      <Image
        source={{ uri: item.alojamientoImage }} // Usar el campo correcto
        className="w-20 h-30    rounded-lg"
      />
      <StyledView className="ml-4 flex-1">
        <StyledText className="font-bold text-lg">{item.name}</StyledText>
        <StyledText className="text-gray-600">
          { item.banos} - { item.camas}
        </StyledText>
        <StyledText className="text-gray-500">{item.estado}</StyledText>
      </StyledView>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 p-4 bg-gray-100">
      {/* Encabezado */}
      <StyledText className="text-2xl font-bold text-center mb-4">Te damos la bienvenida</StyledText>
      <StyledText className="text-2xl font-bold text-center">{user?.nombre}</StyledText>
      <View className="mt-8 items-center mb-4">
        <TouchableOpacity
          onPress={handleCreateReserv}
          className="flex-row items-center justify-center rounded-full px-6 py-3 w-52 border border-black shadow-md"
          style={{ backgroundColor: 'white' }}
        >
          <Text className="text-black font-semibold text-base text-center">Crear tu anuncio</Text>
        </TouchableOpacity>
      </View>

      {/* Título de reservaciones */}
      <StyledText className="text-xl font-bold text-left mb-4">
        Tus reservaciones 
      </StyledText>

      {/* Filtros */}
      <StyledView className="flex-row justify-between mb-4">
        {['PENDIENTE', 'CONFIRMADA', 'CANCELADA'].map((status) => (
          <StyledTouchable
            key={status}
            onPress={() => setFilter(status as typeof filter)}
            className={`px-4 py-2 rounded-full w-35 border border-black ${
              filter === status ? 'bg-customPurple' : 'bg-white'
            }`}
          >
            <StyledText
              className={`font-bold ${
                filter === status ? 'text-white' : 'text-gray-700'
              }`}
            >
              {status}
            </StyledText>
          </StyledTouchable>
        ))}
      </StyledView>

      {/* Línea horizontal */}
      <StyledView className="h-[3px] bg-black mb-4 " />

      {/* Lista de reservaciones */}
      <FlatList
        data={filteredReservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservation}
        ListEmptyComponent={
          <StyledText className="text-center text-gray-500 mt-10">
            No hay reservaciones disponibles.
          </StyledText>
        }
      />
      <AllReservationsScreen />
    </StyledView>
  );
};

export default ReservationsScreen;
