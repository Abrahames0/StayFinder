import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Carousel } from '@aws-amplify/ui-react-native/dist/primitives';

interface Property {
  fotosAlojamiento: string[];
}

interface PropertyImagesProps {
  selectedProperty: Property;
}

const PropertyImages: React.FC<PropertyImagesProps> = ({ selectedProperty }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = selectedProperty.fotosAlojamiento.length > 0
    ? selectedProperty.fotosAlojamiento
    : [
        "https://via.placeholder.com/300x200",
        "https://via.placeholder.com/300x200?text=2",
        "https://via.placeholder.com/300x200?text=3"
      ];

  const { width: screenWidth } = Dimensions.get('window'); 

  // Renderizamos cada imagen en el carrusel
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => {
      setSelectedImage(item);
      setModalVisible(true);
    }}>
      <Image
        source={{ uri: item }}
        style={{ width: screenWidth, height: 200, borderRadius: 10 }}
        resizeMode="cover" // Usamos cover para ajustar las imágenes sin distorsionarlas
      />
    </TouchableOpacity>
  );

  return (
    <View>
      {/* Carrusel con react-native-snap-carousel */}
      <Carousel
        data={images}
        renderItem={renderItem}
      />

      {/* Modal para ver la imagen en grande */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)}>
          <Image
            source={{ uri: selectedImage || "" }}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }} // Mantén la proporción de la imagen en el modal
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PropertyImages;
