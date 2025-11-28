import {
    Text,
    TouchableOpacity
} from "react-native";
import styles from "./styles.js";

export default function Btn({ nav, onPress, title, variant = "primary" }) {

    // Seleciona o estilo baseado na prop variant
    const variantStyle = {
        primary: styles.primaryButton,
        secondary: styles.secondaryButton,
        outline: styles.outlineButton,
    }[variant];

    const textVariantStyle = {
        primary: styles.primaryText,
        secondary: styles.secondaryText,
        outline: styles.outlineText,
    }[variant];

    const handlePress = typeof onPress === 'function' ? onPress : nav

    return (
        <TouchableOpacity
            style={[styles.buttonBase, variantStyle]}
            onPress={handlePress}
        >
            <Text style={[styles.textBase, textVariantStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
