import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function App() {
  const [useDark, setDark] = useState(false)
  const [useTask, setTask] = useState([
    { id: 1, desc: "estudar react native", status: "pendente" },
    { id: 2, desc: "estudar react native", status: "emAndamento" },
    { id: 3, desc: "estudar react native", status: "emAndamento" },
    { id: 4, desc: "estudar react native", status: "concluido" },
  ])

  const getStatus = () => {
    const total = useTask.length
    const pendente = useTask.filter((t) => t.status === "pendente").length
    const emAndamento = useTask.filter((t) => t.status === "emAndamento").length
    const concluido = useTask.filter((t) => t.status === "concluido").length
    return { total, pendente, emAndamento, concluido }
  }
  const status = getStatus()

  const getStatusIcon = (statusTask) => {
    switch (statusTask) {
      case "concluido":
        return "checkmark-circle"
      case "emAndamento":
        return "time"
      case "pendente":
        return "ellipse-outline"
      default:
        return "ellipse-outline"
    }
  }

  const getStatusColors = (statusTask) => {
    switch (statusTask) {
      case "concluido":
        return colors.succes;
      case "emAndamento":
        return colors.warning;
      case "pendente":
        return colors.subText;
      default:
        return colors.subText;
    }
  };

  const getStatusLabel = (statusTask) => {
    switch (statusTask) {
      case 'concluido':
        return 'Concluído';
      case 'emAndamento':
        return 'Em andamento';
      case 'pendente':
        return 'Pendente';
      default:
        return '';
    }
  };


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
    bg: "#f5f5f5",
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
            <Text style={[{ color: colors.text }]}>{status.total}</Text>
            <Text style={[{ color: colors.text }]}>Total</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons
              name="time"
              size={24}
              style={[{ color: colors.iconColor }]}
            />
            <Text style={[{ color: colors.text }]}>{status.emAndamento}</Text>
            <Text style={[{ color: colors.text }]}>Em andamento</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={24}
              style={[{ color: colors.iconColor }]}
            />
            <Text style={[{ color: colors.text }]}>{status.pendente}</Text>
            <Text style={[{ color: colors.text }]}>Pendente</Text>
          </View>

          <View style={[styles.statusCard, { backgroundColor: colors.cardSecondary }]}>
            <Ionicons
              name="checkmark"
              size={24}
              style={[{ color: colors.succes }]}
            />
            <Text style={[{ color: colors.text }]}>{status.pendente}</Text>
            <Text style={[{ color: colors.text }]}>Concluído</Text>
          </View>
        </View>

        {useTask.length === 0 ?
          (
            <Text>Nenhuma tarefa</Text>
          ) : (
            useTask.map((t, index) => (
              <View
                key={index}
                style={[styles.todoCard, { backgroundColor: colors.cardSecondary }]}
              >
                <View style={[styles.todoLeft]}>
                  <Ionicons
                    name={getStatusIcon(t.status)}
                    size={24}
                    color={getStatusColors(t.status)}
                  />
                  <View style={styles.todoInfo} >
                    <Text
                      style={[
                        styles.subTitle,
                        { color: colors.text },
                        t.status === "concluido" && styles.todoCompleted
                      ]}
                    >{t.desc}
                    </Text>
                    <Text
                      style={[
                        styles.todoStatus,
                        { color: getStatusColors(t.status) }
                      ]}>
                      {getStatusLabel(t.status)}
                    </Text>
                  </View>
                </View>

                <View style={[styles.todoActions]}>
                  <TouchableOpacity
                    style={styles.actionButton}
                  >
                    <Ionicons
                      name="create-outline"
                      size={20}
                      color={colors.accent}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={20}
                      color={colors.error}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}

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
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4
  },
  content: {
    flex: 1,
    padding: 20
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 11,
    marginBottom: 20
  },
  statusCard: {
    flex: 1,
    minWidth: "47%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 4
  },
  todoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2
  },
  todoLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  todoInfo: {
    flex: 1,
    gap: 4
  },
  todoCompleted: {
    textDecorationLine: "line-through",
    opacity: 0.6
  },
  todoStatus: {
    fontSize: 12,
    fontWeight: "500"
  },
  todoActions: {
    flexDirection: "row",
    gap: 8
  },
  actionButton: {
    padding: 8
  },
  fab: {
    position: "absolute",
    right: 20,
    button: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0, height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8
  },
  modalOverlay: {
    flex: 8
  }
})