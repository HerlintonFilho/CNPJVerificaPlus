import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  ScrollView,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getCNPJData } from '../../services/api';
import MaskedInput from '../../components/MaskedInputCNPJ';

const bgImage = require('../../../assets/images/background.png');

export default function ConsultaCNPJ() {
  const [cnpj, setCnpj] = useState('');
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current?.getElement) {
        inputRef.current.getElement().focus();
      }
    }, 500);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleConsulta = async () => {
    const rawCNPJ = cnpj.replace(/[^\d]/g, '');
    if (rawCNPJ.length !== 14) {
      Alert.alert('CNPJ inválido', 'Digite um CNPJ com 14 números.');
      return;
    }

    try {
      const data = await getCNPJData(rawCNPJ);
      const historico = await AsyncStorage.getItem('historico');
      const lista = historico ? JSON.parse(historico) : [];
      const dataConsulta = new Date().toLocaleString('pt-BR');
      lista.unshift({ ...data, dataConsulta });
      await AsyncStorage.setItem('historico', JSON.stringify(lista));

      if (data.situacao === 'ATIVA') {
        navigation.navigate('ResultadoConsulta', { dadosEmpresa: data });
      } else {
        Alert.alert('CNPJ inativo ou inválido.');
      }
    } catch {
      Alert.alert('Erro', 'Não foi possível consultar. Tente novamente mais tarde.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.background}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <Text style={styles.title}>🔎 Consulta de CNPJ</Text>
          <View style={styles.inputWrapper}>
            <MaskedInput value={cnpj} onChangeText={setCnpj} ref={inputRef} />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleConsulta}>
            <Text style={styles.buttonText}>Consultar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('ListaClientes')}>
          <Text style={styles.linkText}>🗂 Ver Clientes Salvos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('HistoricoConsultas')}>
          <Text style={styles.linkText}>🕘 Ver Histórico de Consultas</Text>
        </TouchableOpacity>
        </Animated.View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  inputWrapper: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0A84FF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#0A84FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 16,
    paddingVertical: 10,
    backgroundColor: '#2c2c2e',
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  }
});
