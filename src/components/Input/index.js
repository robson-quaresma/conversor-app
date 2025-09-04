import { TextInput, Text, View } from "react-native";
import { styles } from "./styles";

export function Input({value, onChangeText, label}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder="0.00"
        placeholderTextColor="#b4bbc5ff"
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}