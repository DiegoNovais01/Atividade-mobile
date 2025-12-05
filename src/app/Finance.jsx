import { useState } from "react";
import { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Campo from "../components/Campo";
import Btn from "../components/Btn";
import { ThemeContext } from '../contexts/ThemeContext';

export default function Finance() {
  const { useDark, toggle } = useContext(ThemeContext);

  // Lista de ações financeiras
  const [actions, setActions] = useState([
    { id: 1, desc: "Salário", value: 1000 },
    { id: 2, desc: "Comprar pão", value: -8 },
    { id: 3, desc: "Freela", value: 250 },
    { id: 4, desc: "Cinema", value: -30 },
  ]);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [desc, setDesc] = useState("");
  const [value, setValue] = useState("");

  // Tema dinâmico (igual ao de Tarefa.jsx)
  const colors = useDark ? {
    bg: "#0a0a0a",
    text: "#fff",
    iconColor: "#ff6b00",
    addColor: "#252525",
    cardSecondary: "#252525",
    succes: "#10b931",
    accent: "#252525",
    subText: "#888",
    error: "#ef4444",
    card: "#1a1a1a",
  } : {
    bg: "#f5f5f5",
    text: "#1a1a1a",
    iconColor: "#ff6b00",
    addColor: "#ff6b00",
    cardSecondary: "#f8f8f8",
    succes: "#10b931",
    accent: "#fff",
    subText: "#666",
    error: "#ef4444",
    card: "#fff",
  };

  // Saldo total (reduce)
  const saldo = actions.reduce((acc, item) => acc + item.value, 0);

  // Adiciona nova ação
  function addAction() {
    if (!desc || !value) return;
    setActions([
      ...actions,
      {
        id: actions.length + 1,
        desc,
        value: Number(value)
      }
    ]);
    setDesc("");
    setValue("");
    setModalVisible(false);
  }

  // Renderiza cada item (map)
  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.accent }]}>
      <View style={styles.cardLeft}>
        <Text style={[styles.cardDesc, { color: colors.text }]}>{item.desc}</Text>
        <Text style={[styles.cardValueSmall, { color: item.value >= 0 ? colors.succes : colors.error }]}>
          {item.value >= 0 ? "+" : ""}{item.value} R$
        </Text>
      </View>
    </View>
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView style={[styles.container, { backgroundColor: colors.bg }]}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftButtons}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
            <Text style={[{}, { color: colors.text }]}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.financesButton} onPress={() => router.push("/Tarefa")}>
            <Text style={[{}, { color: colors.text }]}>Tarefas</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Minhas Finanças
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.text }]}>
            Controle seus gastos
          </Text>
        </View>

        <TouchableOpacity onPress={toggle}>
          <Ionicons
            name={useDark ? "moon" : "sunny"}
            size={24}
            style={[{ color: colors.iconColor }]}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>

        {/* Card de saldo */}
        <View style={[styles.saldoCard, { backgroundColor: colors.accent }]}>
          <Text style={[styles.saldoLabel, { color: useDark ? "#fff" : "#000" }]}>Saldo Total</Text>
          <Text style={[styles.saldoValue]}>R$ {saldo.toFixed(2).replace(".", ",")}</Text>
        </View>

        {/* Lista de ações (FlatList + map) */}
        <FlatList
          scrollEnabled={false}
          data={actions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />

      </ScrollView>

      {/* Botão FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.addColor }]}
        onPress={openModal}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color={useDark ? colors.iconColor : "#fff"} />
      </TouchableOpacity>

      {/* Modal de adicionar ação */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.4)" }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>

            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Adicionar Ação
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color={colors.subText} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={[styles.label, { color: colors.text }]}>Descrição</Text>
              <Campo
                st="campo"
                title="Descrição da ação..."
                valor={desc}
                onText={setDesc}
              />

              <Text style={[styles.label, { color: colors.text }]}>Valor</Text>
              <Campo
                st="campo"
                title="Use negativo para gastos (-30)"
                valor={value}
                onText={setValue}
              />
            </View>

            <View style={styles.modalFooter}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <Btn title="Cancelar" variant="outline" onPress={closeModal} />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Btn title="Adicionar" onPress={addAction} />
              </View>
            </View>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    elevation: 3,
  },
  leftButtons: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 8,
  },
  backButton: {
    paddingRight: 8,
  },
  financesButton: {
    paddingTop: 6,
    paddingRight: 8,
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  saldoCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#666",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saldoLabel: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  saldoValue: {
    color: "#46b800ff",
    fontSize: 32,
    fontWeight: "bold",
  },
  list: {
    gap: 12,
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    flex: 1,
  },
  cardDesc: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardValueSmall: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  modalBody: {
    gap: 15,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 16,
  },
});
