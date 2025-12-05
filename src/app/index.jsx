import { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import Btn from '../components/Btn';
import { ThemeContext } from '../contexts/ThemeContext';

export default function App() {
  const { useDark, toggle } = useContext(ThemeContext)
  const router = useRouter()

  const [visivelSenha, setVisivelSenha] = useState(false)
  const [useValueSenha, setValueSenha] = useState("")
  const [useValueEmail, setValueEmail] = useState("")
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  function entrar() {
    if (useValueEmail === "") {
      setErrorMessage("Email inválido")
      setError(true)
    } else if (useValueSenha.length < 6) {
      setError(true)
      setErrorMessage("A senha tem que ter mais de 6 caracteres.")
    }
    else {
      setError(false)
      setLoading(true)
      setTimeout(() => {
        router.push("/Tarefa")
      }, 2000)
    }
  }

  const colors = useDark ? {
    bg: "#0a0a0a",
    text: "#fff",
    iconColor: "#ff6b00",
    cardSecondary: "#252525",
    succes: "#10b931",
    warning: "#f59e0b",
    accent: "#ff6b00",
    subText: "#888",
    error: "#ef4444",
    card: "#1a1a1a",
    accent: "#ff6b00",
    border: "#333",
    input: "#2a2a2a"
  } : {
    bg: "#fff",
    text: "#1a1a1a",
    iconColor: "#ff6b00",
    cardSecondary: "#f8f8f8",
    succes: "#10b931",
    warning: "#f59e0b",
    accent: "#ff6b00",
    subText: "#666",
    error: "#ef4444",
    card: "#fff",
    accent: "#ff6b00",
    border: "#c0c0c0",
    input: "#fff"
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.subtitle}>Entre para continuar</Text>

      <View style={styles.header}>
        <TouchableOpacity style={styles.themeToggle} onPress={toggle}>
          <Ionicons
            name={useDark ? "moon" : "sunny"}
            size={24}
            style={[{ color: colors.iconColor }]}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder='Email'
          style={styles.input}
          value={useValueEmail}
          onChangeText={setValueEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder='Senha'
            secureTextEntry={!visivelSenha}
            style={[styles.input, styles.inputPassword]}
            value={useValueSenha}
            onChangeText={setValueSenha}
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

        {error && <Text>{errorMessage}</Text>}

        {loading ? (
          <ActivityIndicator
            size={"small"}
            color="#ff6b00"
            style={{ marginTop: 20 }} />
        ) : (
          <Btn title="Entrar" onPress={entrar} style={{ marginTop: 18 }} />)
        }
        <TouchableOpacity
          onPress={() => router.navigate("/Outros")}
        >
          <Text style={styles.link}>Esqueceu sua senha</Text>
        </TouchableOpacity>
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
  header: {
    width: "100%",
    position: "absolute",
    top: 15,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    zIndex: 10
  },
  themeToggle: {
    top: 10,
    padding: 5
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
    marginBottom: 35
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
    marginBottom: 15,
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
