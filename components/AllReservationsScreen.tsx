import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Reserva, Alojamiento } from '@/src/models';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

type ExtendedReserva = Reserva & {
  alojamientoImage: string;
  name: string // Campo adicional para almacenar la imagen del alojamiento
};

const AllReservationsScreen = () => {
  const [reservations, setReservations] = useState<ExtendedReserva[]>([]);

  // Fetch all reservations from Amplify
  useEffect(() => {
    const fetchReservations = async () => {
      const allReservations = await DataStore.query(Reserva);

      // Map each reservation to include the image of its associated alojamiento
      const reservationsWithImages = await Promise.all(
        allReservations.map(async (reservation) => {
          // Buscar el alojamiento relacionado
          const alojamiento = await DataStore.query(Alojamiento, reservation.alojamientoID);

          return {
            ...reservation,
            alojamientoImage:
              (Array.isArray(alojamiento?.fotosAlojamiento) && alojamiento?.fotosAlojamiento[0]) ||
              'https://via.placeholder.com/100', // URL de imagen predeterminada
            name: alojamiento?.titulo
          };
        })
      );

      setReservations(reservationsWithImages as ExtendedReserva[]);
    };

    fetchReservations();
  }, []);

  // Render each reservation
  const renderReservation = ({ item }: { item: ExtendedReserva }) => (
    <StyledView className="flex-row p-4 bg-white rounded-lg shadow mb-4 border  border-black">
      <Image
        source={{ uri: item.alojamientoImage }} // URL dinámica de la imagen
        className="w-20 h-30    rounded-lg"
      />
      <StyledView className="ml-4 flex-1">
        <StyledText className="font-bold text-lg">{item.name}</StyledText>
        <StyledText className="text-gray-600">
          {item.fechaInicio} - {item.fechaFin}
        </StyledText>
        <StyledText className="text-gray-500">{item.estado}</StyledText>
      </StyledView>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 p-4 bg-gray-100">
      {/* Title */}
      <StyledText className="text-2xl font-bold text-left mb-4">
        Todas las reservaciones ({reservations.length})
      </StyledText>

      {/* Reservation List */}
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservation}
        ListEmptyComponent={
          <StyledText className="text-center text-gray-500 mt-10">
            No hay reservaciones disponibles.
          </StyledText>
        }
      />
    </StyledView>
  );
};

export default AllReservationsScreen;
