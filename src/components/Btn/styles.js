import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    buttonBase: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        // flex: 1 removed to prevent automatic full-stretch; control sizing at layout
    },
    textBase: {
        fontSize: 18,
        fontWeight: "600"
    },
    primaryButton: {
        backgroundColor: "#ff6b00",
        shadowColor: "#ff6b00",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
    },
    primaryText: {
        color: "#fff"
    },
    secondaryButton: {
        backgroundColor: "#222",
    },
    secondaryText: {
        color: "#fff"
    },
    outlineButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#ff6b00",
    },
    outlineText: {
        color: "#ff6b00"
    }
});

export default styles;
