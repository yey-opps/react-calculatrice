import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [v1, setV1] = useState('');
  const [v2, setV2] = useState('');
  const [op, setOp] = useState(null);
  const [result, setResult] = useState('');

  const calculate = () => {
    const a = parseFloat(v1);
    const b = parseFloat(v2);

    if (isNaN(a) || isNaN(b)) {
      setResult('Entrer deux nombres');
      return;
    }
    if (!op) {
      setResult('Choisir une opération');
      return;
    }

    let r = 0;
    if (op === '+') r = a + b;
    else if (op === '-') r = a - b;
    else if (op === '*') r = a * b;

    setResult(String(r));
  };

  const clearAll = () => {
    setV1('');
    setV2('');
    setOp(null);
    setResult('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TP Calculatrice</Text>

      <TextInput
        style={styles.input}
        placeholder="Valeur 1"
        keyboardType="numeric"
        value={v1}
        onChangeText={setV1}
      />
      <TextInput
        style={styles.input}
        placeholder="Valeur 2"
        keyboardType="numeric"
        value={v2}
        onChangeText={setV2}
      />

      <View style={styles.row}>
        {['+', '-', '*'].map(symbol => (
          <Pressable
            key={symbol}
            style={[
              styles.opBtn,
              op === symbol && styles.opBtnSelected,
            ]}
            onPress={() => setOp(symbol)}
          >
            <Text
              style={[
                styles.opText,
                op === symbol && styles.opTextSelected,
              ]}
            >
              {symbol}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.row}>
        <Button title="Calculer" onPress={calculate} />
        <View style={{ width: 10 }} />
        <Button title="Clear" onPress={clearAll} />
      </View>

      <Text style={styles.result}>
        {result !== '' ? `Résultat : ${result}` : 'Résultat : '}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  opBtn: {
    borderWidth: 1,
    borderColor: '#007aff',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 5,
  },
  opBtnSelected: {
    backgroundColor: '#007aff',
  },
  opText: { fontSize: 18, color: '#007aff', fontWeight: '600' },
  opTextSelected: { color: '#fff' },
  result: { marginTop: 20, fontSize: 18 },
});
