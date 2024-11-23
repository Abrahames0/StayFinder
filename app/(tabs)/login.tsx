import { Image, StyleSheet, Platform } from 'react-native';
import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, View } from "react-native";
import awsconfig from "../../src/amplifyconfiguration.json";

Amplify.configure(awsconfig);


const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View className="self-end m-2">
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );
};


const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <View className="p-4">
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
};

export default App;
