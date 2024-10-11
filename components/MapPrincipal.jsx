import { View, Text } from 'react-native';
import MapView from 'react-native-maps';

const REGION_DOLORES_HIDALGO = {
  latitude: 21.1561,
  longitude: -100.9315,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MapPrincipal = () => {
  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} initialRegion={REGION_DOLORES_HIDALGO} />
    </View>
  );
};

export default MapPrincipal;
