import { TextInput, Text, View } from "react-native";
import { styles } from "./styles";

export function Input() {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>
            <TextInput style={styles.input}>

            </TextInput>
        </Text>
    </View>
  )
}