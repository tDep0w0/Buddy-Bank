import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";

type ButtonType = "logout" | "change";

interface Props {
    type: ButtonType;
    onPress: () => void;
}

const ActionButton: React.FC<Props> = ({type, onPress}) => {
    const isLogout = type === "logout";
    const label = isLogout ? "Logout" : "Change Password";

    return (
        <TouchableOpacity 
            style={[
                styles.button,
                isLogout ? styles.logoutButton : styles.changeButton,
            ]} 
            onPress={onPress}
        >
            <Text style={[ styles.text, isLogout ? styles.logoutText : styles.changeText, ]} >
        {label}
      </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 8,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: "600",
    },
    logoutButton: { 
        backgroundColor: "#FF3B30", 
    },
    logoutText: { 
        color: "#fff", 
    },
    changeButton: { 
        backgroundColor: "#007AFF", 
    }, 
    changeText: { 
        color: "#fff", 
    },
});

export default ActionButton;