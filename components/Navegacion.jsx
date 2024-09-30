import { Pressable, Text, View } from "react-native";
import { Link, usePathname } from "expo-router";

import { MapPinIcon, MessageIcon, SearchIcon, UserPerfilIcon } from "./Icons";

export default function Navegacion() {
  const pathname = usePathname();

  const isActive = (route) => pathname === route; 

  return (
    <View className="absolute bottom-4 w-full h-20 bg-[#F1F0F0] rounded-full border border-solid border-black flex-row items-center justify-around">

      <Link asChild href="/">
        <Pressable className="items-center justify-center">
          <View className={`p-3 items-center justify-center ${isActive('/') ? 'bg-pink-300 rounded-full' : ''}`}>
            <SearchIcon />
            <Text className={`text-xs font-normal ${isActive('/') ? 'text-white' : 'text-black'}`}>Explorar</Text>
          </View>
        </Pressable>
      </Link>

      <Link asChild href="/mapa">
        <Pressable className="items-center justify-center">
          <View className={`p-3 items-center justify-center ${isActive('/mapa') ? 'bg-pink-300 rounded-full' : ''}`}>
            <MapPinIcon />
            <Text className={`text-xs font-normal ${isActive('/mapa') ? 'text-white' : 'text-black'}`}>Mapa</Text>
          </View>
        </Pressable>
      </Link>

      <Link asChild href="/mensajes">
        <Pressable className="items-center justify-center">
          <View className={`p-3 items-center justify-center ${isActive('/mensajes') ? 'bg-pink-300 rounded-full' : ''}`}>
            <MessageIcon />
            <Text className={`text-xs font-normal ${isActive('/mensajes') ? 'text-white' : 'text-black'}`}>Mensajes</Text>
          </View>
        </Pressable>
      </Link>

      <Link asChild href="/perfil">
        <Pressable className="items-center justify-center">
          <View className={`p-3 items-center justify-center ${isActive('/perfil') ? 'bg-pink-300 rounded-full' : ''}`}>
            <UserPerfilIcon />
            <Text className={`text-xs font-normal ${isActive('/perfil') ? 'text-white' : 'text-black'}`}>Perfil</Text>
          </View>
        </Pressable>
      </Link>

    </View>
  );
}
