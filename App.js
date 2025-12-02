import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Button,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [operator, setOperator] = useState(null); 
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const a = parseFloat(val1);
    const b = parseFloat(val2);

    // Vérifications de base
    if (isNaN(a) || isNaN(b)) {
      setResult('Veuillez saisir deux nombres valides.');
      return;
    }

    if (!operator) {
      setResult('Veuillez choisir une opération.');
      return;
    }

    let res;
    switch (operator) {
      case '+':
        res = a + b;
        break;
      case '-':
        res = a - b;
        break;
      case '*':
        res = a * b;
        break;
      default:
        res = 'Opérateur invalide.';
    }

    setResult(String(res));
  };

  const handleClear = () => {
    setVal1('');
    setVal2('');
    setOperator(null);
    setResult(null);
  };

  const renderOperatorButton = (symbol) => (
    <Pressable
      key={symbol}
      style={[
        styles.opButton,
        operator === symbol && styles.opButtonSelected,
      ]}
      onPress={() => setOperator(symbol)}
    >
      <Text
        style={[
          styles.opButtonText,
          operator === symbol && styles.opButtonTextSelected,
        ]}
      >
        {symbol}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TP Calculatrice</Text>

      <TextInput
        style={styles.input}
        placeholder="Valeur 1"
        keyboardType="numeric"
        value={val1}
        onChangeText={setVal1}
      />

      <TextInput
        style={styles.input}
        placeholder="Valeur 2"
        keyboardType="numeric"
        value={val2}
        onChangeText={setVal2}
      />

      <Text style={styles.label}>Choisir une opération :</Text>

      <View style={styles.opRow}>
        {['+', '-', '*'].map(renderOperatorButton)}
      </View>

      <View style={styles.buttonsRow}>
        <Button title="Calculer" onPress={handleCalculate} />
        <View style={styles.spacer} />
        <Button title="Clear" onPress={handleClear} />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Résultat :</Text>
        <Text style={styles.resultValue}>
          {result !== null ? result : 'Aucun calcul effectué pour le moment.'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  label: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 16,
  },
  opRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  opButton: {
    borderWidth: 1,
    borderColor: '#007aff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  opButtonSelected: {
    backgroundColor: '#007aff',
  },
  opButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007aff',
  },
  opButtonTextSelected: {
    color: '#ffffff',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  spacer: {
    width: 16,
  },
  resultContainer: {
    marginTop: 24,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 18,
  },
});
