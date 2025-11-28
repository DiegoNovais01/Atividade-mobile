import {
    TextInput,
} from "react-native";
import styles from "./styles.js"

export default function Campo({ st, title, color, secure, valor, onText, text, unColor }) {
    return (
        <TextInput
            style={st === "campo" ? styles.campo : styles.campoPass}
            placeholder={title}
            placeholderTextColor={color}
            secureTextEntry={secure}
            value={valor}
            onChangeText={onText}
            underlineColor={unColor}
        />
    )
}


