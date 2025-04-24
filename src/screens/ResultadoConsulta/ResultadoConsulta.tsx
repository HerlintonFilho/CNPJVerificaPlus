import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ResultadoConsulta() {
  const route = useRoute();
  const navigation = useNavigation();
  const { dadosEmpresa } = route.params;

  const handleSalvar = async () => {
    try {
      const clientesSalvos = await AsyncStorage.getItem('clientes');
      const lista = clientesSalvos ? JSON.parse(clientesSalvos) : [];
      lista.push(dadosEmpresa);
      await AsyncStorage.setItem('clientes', JSON.stringify(lista));
      Alert.alert('Cliente salvo com sucesso!');
      navigation.navigate('ListaClientes');
    } catch (error) {
      Alert.alert('Erro ao salvar cliente');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>📋 Dados da Empresa</Text>

        <Text style={styles.label}><Text style={styles.field}>Razão Social:</Text> {dadosEmpresa.nome}</Text>
        <Text style={styles.label}><Text style={styles.field}>Nome Fantasia:</Text> {dadosEmpresa.fantasia}</Text>
        <Text style={styles.label}><Text style={styles.field}>CNPJ:</Text> {dadosEmpresa.cnpj}</Text>
        <Text style={styles.label}><Text style={styles.field}>Situação:</Text> {dadosEmpresa.situacao}</Text>
        <Text style={styles.label}><Text style={styles.field}>Telefone:</Text> {dadosEmpresa.telefone}</Text>
        <Text style={styles.label}><Text style={styles.field}>Email:</Text> {dadosEmpresa.email}</Text>
        <Text style={styles.label}><Text style={styles.field}>Endereço:</Text> {dadosEmpresa.logradouro}, {dadosEmpresa.numero} - {dadosEmpresa.bairro}</Text>
        <Text style={styles.label}><Text style={styles.field}>Cidade:</Text> {dadosEmpresa.municipio} - {dadosEmpresa.uf}</Text>

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar Cliente</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  container: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    color: '#ccc',
    marginBottom: 10,
    fontSize: 16,
  },
  field: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#0A84FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
