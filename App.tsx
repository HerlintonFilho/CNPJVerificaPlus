import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import ConsultaCNPJ from './src/screens/ConsultaCNPJ/ConsultaCNPJ';
import ResultadoConsulta from './src/screens/ResultadoConsulta/ResultadoConsulta';
import ListaClientes from './src/screens/ListaClientes/ListaClientes';
import HistoricoConsultas from './src/screens/HistoricoConsultas/HistoricoConsultas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="ConsultaCNPJ"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1c1c1e', // dark header
          },
          headerTintColor: '#fff', // white text/icons
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          animation: 'slide_from_right',
          contentStyle: {
            backgroundColor: '#1c1c1e', // fundo escuro em todas as telas
          },
        }}
      >
        <Stack.Screen name="ConsultaCNPJ" component={ConsultaCNPJ} options={{ title: '🔍 Consultar CNPJ' }} />
        <Stack.Screen name="ResultadoConsulta" component={ResultadoConsulta} options={{ title: 'Resultado' }} />
        <Stack.Screen name="ListaClientes" component={ListaClientes} options={{ title: 'Clientes Salvos' }} />
        <Stack.Screen name="HistoricoConsultas" component={HistoricoConsultas} options={{ title: 'Histórico de Consultas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});