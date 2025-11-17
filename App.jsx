import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [useDark, setDark] = useState(false)
  const colors = useDark ? {
    bg: "#0a0a0a",
    text: "#fff",
    iconColor: "#ff6b00"
  } : {
    bg: "#f5f5f5",
    text: "#1a1a1a",
    iconColor: "#ff6b00"
  }

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.bg }]}>

      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Minhas tarefas
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.text }]}>
            Organize seu dia
          </Text>
        </View>
        <TouchableOpacity onPress={() => setDark(!useDark)}>
          <Ionicons
            name="sunny"
            size={24}
            onPress={() => { setDark(!useDark) }}
            style={[{ color: colors.iconColor }]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons
              name="list"
              size={24}
              style={[{ color: colors.iconColor }]}
            />
            <Text style={[{ color: colors.text }]}>{status.total} Comer muriçoca</Text>
            <Text style={[{ color: colors.text }]}>total</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons 
              name="time"
              size={24}
              style={[{ color: colors.iconColor }]}
            />
            <Text style={[{ color: colors.text }]}>{status.emAndamento}</Text>
            <Text style={[{ color: colors.text }]}>total</Text>
          </View>
        </View>
      </ScrollView>

    </KeyboardAvoidingView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700"
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 13,
    marginBottom: 20
  },
  statusCard: {
    flex: 1,
    minWidth: "47%",
    borderRadius: 16,
    padding: 13,
    alignItems: "center",
    gap: 4
  }
})