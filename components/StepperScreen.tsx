import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const StepperScreen = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-lg">Paso {step}</Text>
      <View className="flex-row space-x-4 mt-4">
        {step > 1 && <Button title="Anterior" onPress={prevStep} />}
        <Button title="Siguiente" onPress={nextStep} />
      </View>
    </View>
  );
};

export default StepperScreen;
