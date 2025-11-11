import React, { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet
} from "react-native";

export default function HomeScreen() {
  const [usevalue, setValue] = useState<string>("");
  const [uselista, setLista] = useState<string[]>(["Kawan"]);
  
  function addList() {
    if (usevalue.trim() === "") return;
    setLista(prev => [...prev, usevalue]);
    console.log(uselista);
    setValue("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo-list</Text>

      <TextInput
        placeholder="Digite aqui"
        value={usevalue}
        onChangeText={setValue}
        style={styles.input}
      />
      <Button
        title="Clique aqui"
        onPress={addList}
      />

      <FlatList
        data={uselista}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        style={{ marginTop: 10 }}
      />
    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 8,
    fontSize: 16,
  },
});