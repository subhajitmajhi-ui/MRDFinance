import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const getPasswordStrength = (password: string) => {
  if (password.length > 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
    return { label: 'Strong', color: '#4caf50', bars: 3 };
  } else if (password.length > 5) {
    return { label: 'Medium', color: '#ffb300', bars: 2 };
  } else if (password.length > 0) {
    return { label: 'Weak', color: '#f44336', bars: 1 };
  } else {
    return { label: '', color: '#ccc', bars: 0 };
  }
};

const SignupScreen = ({ onSignInPress }: { onSignInPress?: () => void }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const strength = getPasswordStrength(password);

  const allFilled = email && name && password && phone;

  const handleSignUp = () => {
    setSubmitted(true);
    if (allFilled) {
      // Proceed with signup logic
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#fac57f', '#fac57f', '#fcf0de']}
        style={styles.topContainer}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.haveAccountText}>Already have an account?</Text>
        <TouchableOpacity style={styles.signInButtonTop} onPress={onSignInPress}>
          <Text style={styles.signInButtonTopText}>Sign in</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MRD Finance</Text>
      </LinearGradient>
      <View style={styles.container}>
        <Text style={styles.header}>Get started free.</Text>
        <Text style={styles.subheader}>Free forever. No credit card needed.</Text>
        <TextInput
          style={[styles.input, submitted && !email ? styles.inputError : null]}
          placeholder="Email Address"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, submitted && !name ? styles.inputError : null]}
          placeholder="Your name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.passwordInput, submitted && !password ? styles.inputError : null]}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
          <View style={styles.strengthContainer}>
            {[1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.strengthBar,
                  { backgroundColor: i <= strength.bars ? strength.color : '#eee' },
                ]}
              />
            ))}
            <Text style={[styles.strengthLabel, { color: strength.color }]}>{strength.label}</Text>
          </View>
        </View>
        <TextInput
          style={[styles.input, submitted && !phone ? styles.inputError : null]}
          placeholder="Phone No."
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={[styles.signUpButton, !allFilled && styles.signUpButtonDisabled]} onPress={handleSignUp} disabled={!allFilled}>
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or sign up with</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>G</Text>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>f</Text>
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  topContainer: {
    paddingTop: 80,
    paddingBottom: 70,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  haveAccountText: {
    color: '#000',
    fontSize: 14,
    position: 'absolute',
    top: 70,
    left: 20,
  },
  signInButtonTop: {
    position: 'absolute',
    top: 65,
    right: 20,
    backgroundColor: '#de9228',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  signInButtonTopText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    color: '#333333',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 40,
  },
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -40,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
    width: '100%',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    height: 48,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    minHeight: 48,
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#222',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    padding: 0,
    top: 12,
  },
  eyeText: {
    fontSize: 18,
    color: '#888',
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 60,
    top: 12,
  },
  strengthBar: {
    width: 16,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
  strengthLabel: {
    fontSize: 12,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#de9228',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  orText: {
    marginHorizontal: 8,
    color: '#888',
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    flex: 1,
    marginHorizontal: 4,
  },
  socialIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  socialText: {
    fontSize: 16,
    color: '#222',
  },
  inputError: {
    borderColor: '#f44336',
    borderWidth: 1,
  },
  signUpButtonDisabled: {
    opacity: 0.5,
  },
});

export default SignupScreen; 