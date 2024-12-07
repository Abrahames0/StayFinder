import { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Usuario } from "../../src/models";
import { useAuthenticator } from "@aws-amplify/ui-react-native";

export const useUserId = () => {
  const { user, authStatus } = useAuthenticator();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      setLoading(true);
      try {
        if (authStatus === "authenticated" && user) {
          const email = user.signInDetails?.loginId || user.username;
          if (!email) {
            setError("No se encontró un email válido para el usuario.");
            return;
          }
          const users = await DataStore.query(Usuario, (u) => u.email.eq(email));
          if (users.length > 0) {
            setUserId(users[0].id); // Solo se guarda el ID
          } else {
            setError("Usuario no encontrado en DataStore.");
          }
        }
      } catch (err) {
        setError("Error al obtener el ID del usuario.");
        console.error("Error al obtener el ID del usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserId();
  }, [authStatus, user]);

  return { userId, loading, error };
};
