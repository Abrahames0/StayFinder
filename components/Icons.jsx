import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export const SearchIcon = (props) => (
  <Feather name="search" size={30} color="black" {...props} />
);

export const MapPinIcon = (props) => (
  <Feather name="map-pin" size={30} color="black" {...props} />
);

export const MessageIcon = (props) => (
  <AntDesign name="message1" size={30} color="black" {...props} />
);

export const UserPerfilIcon = (props) => (
  <FontAwesome5 name="user-circle" size={30} color="black" {...props} />
);
