import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';

export default function App() {
  return (
    <NavigationContainer>
        <Root/>
    </NavigationContainer>
  );
}