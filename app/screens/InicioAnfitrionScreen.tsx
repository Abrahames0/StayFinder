import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Reserva } from '@/src/models';
import { Image } from 'react-native';
import { styled } from 'nativewind';
import AllReservationsScreen from '@/components/AllReservationsScreen';
import { useUser } from '@/components/hooks/UserContext';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchable = styled(TouchableOpacity);

const ReservationsScreen = () => {
  const { user } = useUser();
  const [reservations, setReservations] = useState<Reserva[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<Reserva[]>([]);
  const [filter, setFilter] = useState<'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA' >('PENDIENTE');
  useEffect(() => {
    console.log('====================================');
    console.log(user);
    console.log('====================================');
  }, [user]);

  useEffect(() => {
    // Fetch reservations from Amplify
    const fetchReservations = async () => {
      const allReservations = await DataStore.query(Reserva);
      setReservations(allReservations);
      setFilteredReservations(allReservations);
    };

    fetchReservations();
  }, []);

  // Filter logic
  useEffect(() => {
    if (filter === 'PENDIENTE') { 
      setFilteredReservations(reservations.filter((res) => res.estado === filter));
    } else if(filter === 'CONFIRMADA'){
      setFilteredReservations(reservations.filter((res) => res.estado === filter));
    }else if(filter === 'CANCELADA'){
      setFilteredReservations(reservations.filter((res) => res.estado === filter));
    }
  }, [filter, reservations]);

  const handleCreateReserv = () =>{

  }

  // Render each reservation
  const renderReservation = ({ item }: { item: Reserva }) => (
    <StyledView className="flex-row p-4 bg-white rounded-lg shadow mb-4">
      <Image
        source={{ uri: 'https://via.placeholder.com/100' }}
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
      {/* Header */}
      <StyledText className="text-2xl font-bold text-center mb-4">Te damos la bienvenida</StyledText>
      <StyledText className="text-2xl font-bold text-center ">{user?.nombre}</StyledText>

      <View className="mt-8 items-center mb-4">
        <TouchableOpacity
          onPress={handleCreateReserv}
          className="flex-row items-center justify-center rounded-full px-6 py-3 w-52 border border-black shadow-md"
          style={{ backgroundColor: "white" }}
        >
          <Text className="text-black font-semibold text-base text-center">
            Crear tu anuncio
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reservaciones titulo */}
      <StyledText className="text-xl font-bold text-left mb-4">Tus reservaciones</StyledText>

      {/* Filters */}
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

      {/* Reservation List */}
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
      <AllReservationsScreen/>
    </StyledView>
  );
};

export default ReservationsScreen;
