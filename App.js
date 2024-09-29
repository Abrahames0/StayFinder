import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, View } from "react-native";

import awsconfig from './src/aws-exports'; 

Amplify.configure(awsconfig);

const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

const Index = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <View style={styles.container}>
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = {
  signOutButton: {
    alignSelf: "flex-end",
    margin: "10px"
  },
  container: {
    padding: "10px"
  }
};

export default Index;
