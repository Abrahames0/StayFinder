import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Reserva } from '@/src/models';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);


const AllReservationsScreen = () => {
  const [reservations, setReservations] = useState<Reserva[]>([]);

  // Fetch all reservations from Amplify
  useEffect(() => {
    const fetchReservations = async () => {
      const allReservations = await DataStore.query(Reserva);
      setReservations(allReservations);
    };

    fetchReservations();
  }, []);

  // Render each reservation
  const renderReservation = ({ item }: { item: Reserva }) => (
    <StyledView className="flex-row p-4 bg-white rounded-lg shadow mb-4">
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }} // Reemplaza con tu URL de imágenes
        className="w-20 h-20 rounded-lg"
      />
      <StyledView className="ml-4 flex-1">
        <StyledText className="font-bold text-lg">{item.alojamientoID}</StyledText>
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
      <StyledText className="text-2xl font-bold text-left mb-4">Todas las reservaciones</StyledText>

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
