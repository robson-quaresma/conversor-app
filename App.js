import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { Button } from './src/components/Button';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { Input } from './src/components/Input';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { convertCurrency } from './src/utils/convertCurrency';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  async function fetchExchangeRate() {
    try {
      setLoading(true);
      
      if (!amount) return;

      const data = await exchangeRateApi(fromCurrency);
      const rate = data.rates[toCurrency];
      setExchangeRate(rate);
      const convertedAmount = convertCurrency(amount, rate);
      setResult(convertedAmount);

    } catch (error) {
      console.error("Error during conversion:", error);
    } finally {
      setLoading(false);
    }
  }

  function swapCurrency() {
    const previousFromCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(previousFromCurrency);
    setResult('');
    
  }




  {/* Keyboard to avoid overlay */}
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0f172a' }}>
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
                <Button
                  key={currency.code}
                  currency={currency}
                  onPress={() => setFromCurrency(currency.code)}
                  isSelected={fromCurrency === currency.code}
                />
              ))}
            </View>
            <Input label="Valor: " value={amount} onChangeText={setAmount} />

            <TouchableOpacity style={styles.swapButton} onPress={swapCurrency}>
              <Text style={styles.swapButtonText}>↑↓</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para:</Text>
            <View style={styles.currencyGrid}>
              {currencies.map((currency) => (
                <Button
                  key={currency.code}
                  variant="secondary"
                  currency={currency}
                  onPress={() => setToCurrency(currency.code)}
                  isSelected={toCurrency === currency.code}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.convertButton, ( !amount || loading) && styles.convertButtonDisabled]}
            onPress={fetchExchangeRate}
            disabled={!amount || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.swapButtonText}>Converter</Text>
            )}
          </TouchableOpacity>

          <ResultCard
            exchangeRate={exchangeRate}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            result={result}
            currencies={currencies}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


