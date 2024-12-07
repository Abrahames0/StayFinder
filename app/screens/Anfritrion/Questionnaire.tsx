import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Step1 from "@/components/Anfrition/Step1";
import Step2 from "@/components/Anfrition/Step2";
import Step3 from "@/components/Anfrition/Step3";
import Step4 from "@/components/Anfrition/Step4";
import Step5 from "@/components/Anfrition/Step5";
import Step6 from "@/components/Anfrition/Step6";
import Step7 from "@/components/Anfrition/Step7";
import Step8 from "@/components/Anfrition/Step8";
import { DataStore } from "@aws-amplify/datastore";
import { Alojamiento, Usuario } from "@/src/models";
import { Ionicons } from "@expo/vector-icons";
import { useAuthenticator } from "@aws-amplify/ui-react-native"; // Importa useAuthenticator
import { uploadData } from 'aws-amplify/storage';
import { useUserId } from "../../../components/hooks/UserId";
import { useNavigation } from '@react-navigation/native'; // Importa el hook useNavigation


const Questionnaire = () => {
  const { user } = useAuthenticator((context) => [context.user]); // Obtén el usuario autenticado
  const { userId, loading, error } = useUserId(); // Obtén el ID usando el hook
  const navigation = useNavigation(); // Usa el hook de navegación

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagenes: [] as string[],
    personas: [] as string[],
    servicios: [] as string[],
    precioMensual: "",
    bathrooms: 0,
    direccion:'',
    ciudad: '',
    estado:'',
    codigoPostal: '',
    latitud: 0,
    longitud: 0,
    beds: 0,
    time: 0,
    rules: "",
    tipoEstancia: "",
    usuarioid: "", // Inicializa como vacío
  });

  // Establecer el ID del usuario cuando el hook lo obtenga
  useEffect(() => {
    if (userId) {
      setFormData((prev) => ({ ...prev, usuarioid: userId }));
    }
  }, [userId]);

  const handleNext = () => {
    if (step === 5 && formData.imagenes.length < 4) {
      Alert.alert(
        "Validación",
        "Por favor, sube al menos 4 imágenes antes de continuar."
      );
      return;
    }
    if (step === 1 && !formData.tipoEstancia) {
      Alert.alert("Validación", "Por favor, selecciona el tipo de estancia.");
      return;
    }
    if (step === 2 && !formData.direccion) {
      Alert.alert("Validación", "Por favor, completa la dirección.");
      return;
    }
    if (step === 8 && !formData.precioMensual) {
      Alert.alert("Validación", "Por favor, establece un precio.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 8));
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (key: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (formData.imagenes.length < 4) {
      Alert.alert(
        "Validación",
        "Por favor, asegúrate de subir al menos 4 imágenes del alojamiento."
      );
      return;
    }
  
    if (
      !formData.titulo ||
      !formData.descripcion ||
      !formData.direccion ||
      !formData.precioMensual
    ) {
      Alert.alert("Validación", "Por favor, completa todos los campos requeridos.");
      return;
    }
  
    try {
      // Subir imágenes a S3
      const uploadedImages = await Promise.all(
        formData.imagenes.map(async (uri, index) => {
          const response = await fetch(uri);
          const blob = await response.blob();
          const filename = `imagen-${Date.now()}-${index}.jpg`;
  
          const result = await uploadData({
            key: `${filename}`,
            data: blob,
          }).result;
  
          return `https://stayfinder-storage-771fbe21d527c-dev.s3.us-east-1.amazonaws.com/public/${result.key}`;
        })
      );
  
      // Guardar en DataStore
      await DataStore.save(
        new Alojamiento({
          titulo: formData.titulo,
          descripcion: formData.descripcion,
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          estado: formData.estado,
          codigoPostal: formData.codigoPostal,
          latitud: formData.latitud,
          longitud: formData.longitud,
          personas: formData.personas,
          servicios: formData.servicios,
          usuarioID: formData.usuarioid,
          precioMensual: parseFloat(formData.precioMensual),
          fotosAlojamiento: uploadedImages,
          banos: formData.bathrooms,
          camas: formData.beds,
          reglas: formData.rules,
          tiempoRenta: formData.time,
        })
      );
  
      Alert.alert("Éxito", "¡Cuestionario guardado exitosamente!");
      navigation.navigate("TabsAnfitrion");
    } catch (error) {
      console.error("Error al guardar:", error);
      Alert.alert("Error", "Hubo un problema al guardar los datos.");
    }
  };
    const handleAddImage = (newImages: string[]) => {
    setFormData((prev) => ({ ...prev, imagenes: newImages }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 onChange={(value) => handleChange("tipoEstancia", value)} />;
        case 2:
          return (
            <Step2
              value={{
                direccion: formData.direccion,
                ciudad: formData.ciudad,
                estado: formData.estado,
                codigoPostal: formData.codigoPostal,
                latitud: formData.latitud,
                longitud: formData.longitud,
              }}
              onChange={(key, value) => handleChange(key, value)}
            />
          );
        
      case 3:
        return (
          <Step3
            onChange={(key, value) => setFormData((prev) => ({ ...prev, [key]: value }))}
          />
        );
      case 4:
        return (
          <Step4
            onChange={(key, value) => setFormData((prev) => ({ ...prev, [key]: value }))}
          />
        );
      case 5:
        return (
          <Step5
          images={formData.imagenes} // Pasar las imágenes actuales
          onAddImage={handleAddImage} // Actualizar las imágenes al agregar nuevas
        />

        );
      case 6:
        return (
          <Step6
            titulo={formData.titulo}
            descripcion={formData.descripcion}
            onChange={(key, value) => handleChange(key, value)}
          />
        );
      case 7:
        return (
          <Step7
            precio={formData.precioMensual}
            onChange={(value) => handleChange("precioMensual", value)}
          />
        );
      case 8:
        return (
          <Step8
            bathrooms={formData.bathrooms}
            time={formData.time}
            beds={formData.beds}
            rules={formData.rules}
            onChange={(key, value) => setFormData((prev) => ({ ...prev, [key]: value }))}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <TouchableOpacity className="absolute left-4">
        <Ionicons name="close" size={24} color="#000" />
      </TouchableOpacity>

      {/* Barra de progreso */}
      <View className="h-2 bg-gray-200 rounded-full mb-5">
        <View
          className="h-full bg-[#DF96F9] rounded-full"
          style={{ width: `${(step / 8) * 100}%` }}
        />
      </View>

      {/* Renderizar paso actual */}
      {renderStep()}

      {/* Botones de navegación */}
      <View className="flex-row justify-between mt-4">
        {step > 1 && (
          <TouchableOpacity
            className="bg-gray-400 py-3 px-5 rounded-3xl"
            onPress={handleBack}
          >
            <Text className="text-white text-base text-center">Atrás</Text>
          </TouchableOpacity>
        )}
        {step < 8 ? (
          <TouchableOpacity
            className="bg-[#DF96F9] py-3 px-5 rounded-3xl"
            onPress={handleNext}
          >
            <Text className="text-white text-base text-center">Siguiente</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity className="bg-blue-400 py-3 px-5 rounded-3xl" onPress={handleSubmit}>
            <Text className="text-white text-base text-center">Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Questionnaire;
