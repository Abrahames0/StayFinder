import { View } from "react-native";
import Navegacion from "../components/Navegacion";
import MapPrincipal from "../components/MapPrincipal";

export default function Mapa() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <MapPrincipal />
      </View>
      <Navegacion />
    </>
  );
}
