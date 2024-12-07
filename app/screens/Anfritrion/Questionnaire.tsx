import React, { useState } from "react";
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

const Questionnaire = () => {
  const { user } = useAuthenticator((context) => [context.user]); // Obtén el usuario autenticado
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
    usuarioid: 'f1a3154e-e6f2-4dc2-92d0-1ecdc3d9d153',
  });

  const handleNext = () => {
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
          fotosAlojamiento: formData.imagenes,
          banos: formData.bathrooms,
          camas: formData.beds,
          reglas: formData.rules,
          tiempoRenta: formData.time,
        })
      );
      Alert.alert("Éxito", "¡Cuestionario guardado exitosamente!");
    } catch (error) {
      console.error("Error al guardar:", error);
      Alert.alert("Error", "Hubo un problema al guardar los datos.");
    }
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
            onAddImage={(action: any) =>
              handleChange("imagenes", [...formData.imagenes, `Nueva imagen ${action}`])
            }
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
