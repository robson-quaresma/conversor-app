import { Text, View } from "react-native";
import { styles } from "./styles";

export function ResultCard({
  exchangeRate,
  fromCurrency,
  toCurrency,
  result,
  currencies,
}) {

  if(!result || !exchangeRate) return null;

  const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || '';
  const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || '';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Resultado: </Text>
      <Text style={styles.amount}>
        {toSymbol} {result}
      </Text>
      <Text style={styles.rate}>
        Taxa de câmbio 1: {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
      </Text>
    </View>
  );
}