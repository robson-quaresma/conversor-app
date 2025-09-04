import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/ResultCard';

export default function App() {

  {/* Keyboard to avoid overlay */}
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />

          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moeda</Text>
            <Text style={styles.subtitle}>
              Converta valores entre diferentes moedas
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button key={currency.code} currency={currency} />
              ))}
            </View>

            <Input label="Valor: " />

            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>
                ↑↓
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button key={currency.code} variant="secondary" currency={currency} />
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.convertButton}>
            <Text style={styles.swapButtonText}>
              Converter
            </Text>
          </TouchableOpacity>

          <ResultCard />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}


