import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import { Colors } from "../../constants/colors";

type ButtonType = "logout" | "change";

interface Props {
    type: ButtonType;
    onPress: () => void;
    symbol: React.ReactNode
}

const ActionButton: React.FC<Props> = ({type, onPress, symbol}) => {
    const isLogout = type === "logout";
    const label = isLogout ? "Log Out" : "Change Password";

    return (
        <TouchableOpacity 
            style={[
                styles.button,
                isLogout ? styles.logoutButton : styles.changeButton,
                { flexDirection: 'row' }, {justifyContent: 'center'}, {gap: 6}
            ]} 
            onPress={onPress}
        >
            {symbol}
            <Text style={[ styles.text, isLogout ? styles.logoutText : styles.changeText, ]} >
        {label}
      </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginVertical: 8,
        width: '90%'
    },
    text: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: "600",
    },
    logoutButton: { 
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.red, 
    },
    logoutText: { 
        color: Colors.red, 
    },
    changeButton: { 
        backgroundColor: Colors.primary, 
    }, 
    changeText: { 
        color: Colors.background, 
    },
});

export default ActionButton;