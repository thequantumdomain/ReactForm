import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FormExample = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const validate = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!phone.trim() || phone.trim().length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      isValid = false;
    } else {
      setPhoneError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      const formData = { name, email, phone };
      fetch('https://example.com/api/form-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          // Handle success actions
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error actions
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Enter your name"
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}

      <Button
        title="Submit"
        onPress={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FormExample;
