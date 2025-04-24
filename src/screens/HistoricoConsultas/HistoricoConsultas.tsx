// HistoricoConsultas.tsx com layout moderno e tema escuro
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

export default function HistoricoConsultas() {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      const dados = await AsyncStorage.getItem('historico');
      if (dados) {
        setHistorico(JSON.parse(dados));
      }
    };
    carregarHistorico();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.label}>CNPJ: <Text style={styles.valor}>{item.cnpj}</Text></Text>
      <Text style={styles.label}>Consultado em: <Text style={styles.valor}>{item.dataConsulta}</Text></Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🕘 Histórico de Consultas</Text>
        <FlatList
          data={historico}
          keyExtractor={(item, index) => `${item.cnpj}-${index}`}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>Nenhuma consulta registrada ainda.</Text>}
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
