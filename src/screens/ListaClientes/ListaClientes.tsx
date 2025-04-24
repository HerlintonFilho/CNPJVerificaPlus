// ListaClientes.tsx com layout moderno e tema escuro
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const carregarClientes = async () => {
      const dados = await AsyncStorage.getItem('clientes');
      if (dados) {
        setClientes(JSON.parse(dados));
      }
    };
    carregarClientes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.label}>CNPJ: <Text style={styles.valor}>{item.cnpj}</Text></Text>
      <Text style={styles.label}>Situação: <Text style={styles.valor}>{item.situacao}</Text></Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>📁 Clientes Ativos Salvos</Text>
        <FlatList
          data={clientes}
          keyExtractor={(item, index) => `${item.cnpj}-${index}`}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum cliente salvo ainda.</Text>}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2c2c2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
  },
  label: {
    color: '#bbb',
  },
  valor: {
    color: '#fff',
    fontWeight: '500',
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
});