import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Usuario, Alojamiento } from "@/src/models";
import { Ionicons } from "@expo/vector-icons"; // Íconos

const AnunciosAnfitrionScreen: React.FC = () => {
  const { user, authStatus } = useAuthenticator(); // Obtenemos la sesión
  const [profileUser, setProfileUser] = useState<Usuario | null>(null);
  const [ads, setAds] = useState<Alojamiento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Obtener el usuario autenticado
  const fetchUser = async () => {
    setLoading(true);
    try {
      if (authStatus === "authenticated" && user) {
        const email = user.signInDetails?.loginId || user.username;

        if (!email) {
          console.error("No se encontró un email válido para el usuario.");
          return;
        }

        // Consultar el usuario autenticado en DataStore
        const users = await DataStore.query(Usuario, (u) => u.email.eq(email));

        if (users.length > 0) {
          setProfileUser(users[0]);
        } else {
          console.error("Usuario no encontrado en DataStore.");
        }
      }
    } catch (err) {
      console.error("Error al obtener el usuario:", err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener alojamientos asociados al usuario
  const fetchAlojamientos = async () => {
    if (!profileUser) return;

    try {
      setLoading(true);
      const alojamientos = await DataStore.query(Alojamiento, (a) =>
        a.usuarioID.eq(profileUser.id)
      );
      setAds(alojamientos);
    } catch (error) {
      console.error("Error al obtener los alojamientos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [authStatus, user]);

  useEffect(() => {
    if (profileUser) {
      fetchAlojamientos();
    }
  }, [profileUser]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Título y botón */}
      <View style={styles.header}>
        <Text style={styles.title2}>Tus anuncios creadas</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Anuncios */}
      <ScrollView style={styles.scrollContainer}>
        {ads.map((ad) => (
          <View key={ad.id} style={styles.cardContainer}>
            <ImageBackground
              source={{
                uri:
                  ad.fotosAlojamiento?.[0] || "https://via.placeholder.com/150",
              }}
              style={styles.cardBackground}
              imageStyle={styles.cardImage}
            >
              <View style={styles.overlay}>
                <Text style={styles.title}>{ad.titulo}</Text>
                <Text style={styles.details}>
                  {ad.camas} camas - {ad.banos} baño
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Creado</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginTop: 16,
    color: "#999",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 52, // Altura desde el top
    marginBottom:5
  },
  title2: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DF96F9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#DF96F9",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cardContainer: {
    marginBottom: 16,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "black",
  },
  cardBackground: {
    height: 180,
    justifyContent: "flex-end",
  },
  cardImage: {
    flex: 1,
    opacity: 0.2,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    justifyContent: "flex-end",
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#DF96F9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default AnunciosAnfitrionScreen;
