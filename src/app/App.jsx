import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from "expo-router";

export default function App() {
  const [visivelSenha, setVisivelSenha] = useState(false)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.subtitle}>Entre para continuar</Text>

      <View style={styles.form}>
        <TextInput
          placeholder='Email'
          style={styles.input}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder='Senha'
            secureTextEntry={!visivelSenha}
            style={[styles.input, styles.inputPassword]}
          />
          <TouchableOpacity
            onPress={() => setVisivelSenha(v => !v)}
            style={styles.eyeButton}
            accessibilityLabel={visivelSenha ? 'Ocultar senha' : 'Mostrar senha'}
          >
            <MaterialCommunityIcons
              name={visivelSenha ? 'eye-off' : 'eye'}
              size={22}
              color="#777"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.link}>Esqueceu a senha?</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff6b00',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 40
  },
  form: {
    width: '100%'
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 12,
    color: "#333",
    marginBottom: 15
  },
  button: {
    backgroundColor: "#ff6b00",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#ff6b00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  },
  link: {
    color: "#ff6b00",
    textAlign: "center",
    marginTop: 15,
    fontSize: 15
  },
  passwordContainer: {
    position: 'relative',
    width: '100%'
  },
  inputPassword: {
    paddingRight: 50,
    marginBottom: 0,
  },
  eyeButton: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: '100%'
  }
});
