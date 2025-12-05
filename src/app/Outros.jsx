import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons";
import Campo from "../components/Campo";
import Btn from "../components/Btn";
import { ThemeContext } from '../contexts/ThemeContext';

export default function Outros() {
  const { useDark, toggle } = useContext(ThemeContext)
  const router = useRouter()

  const colors = useDark ? {
    bg: "#0a0a0a",
    text: "#fff",
    iconColor: "#ff6b00",
    input: "#2a2a2a"
  } : {
    bg: "#fff",
    text: "#1a1a1a",
    iconColor: "#ff6b00",
    input: "#fff"
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <View style={styles.header}>

        <TouchableOpacity style={styles.themeToggle} onPress={toggle}>
          <Ionicons
            name={useDark ? "moon" : "sunny"}
            size={24}
            style={[{ color: colors.iconColor }]}
          />
        </TouchableOpacity>

      </View>

      <Text style={styles.title}>Recupere sua senha</Text>

      <Campo title="Nova senha" st="campo" />
      <Campo title="Senha antiga" st="campo" />

      <View style={styles.btns}>

        <View style={{ flex: 1, marginRight: 6 }}>
          <Btn title="Voltar" onPress={() => router.replace("/")} style={{ width: '100%' }} />
        </View>
        <View style={{ flex: 1, marginLeft: 6 }}>
          <Btn title="Enviar" onPress={() => Alert.alert('Enviado')} style={{ width: '100%' }} />
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
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
  btns: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    textAlign: "center",
    alignContent: "center",
    paddingBottom: 18,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff6b00',
    marginBottom: 10,
  }
})


