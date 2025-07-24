import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function AddCashbookForm({ onSubmit }: { onSubmit?: (data: any) => void }) {
  const [cashbookName, setCashbookName] = useState('');
  const [cardType, setCardType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [cardTypeError, setCardTypeError] = useState(false);

  const handleSubmit = () => {
    if (!cardType) {
      setCardTypeError(true);
      return;
    }
    setCardTypeError(false);
    onSubmit?.({ cashbookName, cardType, accountNumber, initialBalance });
    setCashbookName('');
    setCardType('');
    setAccountNumber('');
    setInitialBalance('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.formContainer}>
        <View style={styles.formSection}>
          <Text style={[styles.label, { marginTop: 0 }]}>Cashbook Name</Text>
          <TextInput
            style={styles.input}
            value={cashbookName}
            onChangeText={setCashbookName}
            placeholder="Enter Cashbook Name"
            placeholderTextColor="#C1BFBF"
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Credit Card or Debit Card</Text>
            <Text style={styles.required}>*Required</Text>
          </View>
          <TextInput
            style={[styles.input, cardTypeError && { borderColor: 'red' }]}
            value={cardType}
            onChangeText={setCardType}
            placeholder="Enter Credit Card or Debit Card"
            placeholderTextColor="#BDBDBD"
          />
          <Text style={styles.label}>Add Account Number</Text>
          <TextInput
            style={styles.input}
            value={accountNumber}
            onChangeText={setAccountNumber}
            placeholder="Enter Add Account Number"
            placeholderTextColor="#BDBDBD"
            keyboardType="number-pad"
          />
          <Text style={styles.label}>Initial Balance of Card</Text>
          <TextInput
            style={styles.input}
            value={initialBalance}
            onChangeText={setInitialBalance}
            placeholder="Enter Initial Balance of Card"
            placeholderTextColor="#BDBDBD"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
  },
  headerTitle: {
    backgroundColor: '#E9C8FF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    fontWeight: '700',
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    flexDirection: 'row',
  },
  formSection: {
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  label: {
    fontWeight: '700',
    fontSize: 11,
    color: '#504C4C',
    marginBottom: 5,
    marginTop: 10,
  },
  required: {
    color: 'red',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: 'bold',
    marginTop: 2,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 11,
    color: '#222',
  },
  submitBtn: {
    backgroundColor: '#00A86B',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 700,
    fontSize: 14,
  },
}); 