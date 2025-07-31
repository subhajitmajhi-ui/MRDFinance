import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get('window');

export type PopupType = 'success' | 'error' | 'info' | 'warning';

interface CustomPopupProps {
  visible: boolean;
  type: PopupType;
  title: string;
  message: string;
  buttonText?: string;
  onPress?: () => void;
  onClose?: () => void;
}

const getPopupConfig = (type: PopupType) => {
  switch (type) {
    case 'success':
      return {
        icon: 'check',
        iconColor: '#00A86B',
        backgroundColor: '#00A86B',
        titleColor: '#ffffff',
        messageColor: '#000000',
      };
    case 'error':
      return {
        icon: 'x-octagon',
        iconColor: '#FD3C4A',
        backgroundColor: '#FD3C4A',
        titleColor: '#ffffff',
        messageColor: '#000000',
      };
    case 'info':
      return {
        icon: 'alert-octagon',
        iconColor: '#FF9900',
        backgroundColor: '#FF9900',
        titleColor: '#ffffff',
        messageColor: '#000000',
      };
    case 'warning':
      return {
        icon: 'radio',
        iconColor: '#FF9800',
        backgroundColor: '#FF9800',
        titleColor: '#F57C00',
        messageColor: '#000000',
      };
    default:
      return {
        icon: 'slash',
        iconColor: '#2196F3',
        backgroundColor: '#2196F3',
        titleColor: '#ffffff',
        messageColor: '#000000',
      };
  }
};

const CustomPopup: React.FC<CustomPopupProps> = ({
  visible,
  type,
  title,
  message,
  buttonText = 'Done',
  onPress,
  onClose,
}) => {
  const config = getPopupConfig(type);

  const handleButtonPress = () => {
    if (onPress) {
      onPress();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#fac57f', '#fac57f', '#fcf0de']}
          style={styles.popupContainer}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: config.iconColor }]}>
            <Feather name={config.icon} size={40} color="#fff" />
          </View>
          
          {/* Title */}
          <Text style={[styles.title, { color: config.titleColor }]}>
            {title}
          </Text>
          
          {/* Message */}
          <Text style={[styles.message, { color: config.messageColor }]}>
            {message}
          </Text>
          
          {/* Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: config.backgroundColor }]}
            onPress={handleButtonPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    minWidth: width * 0.8,
    maxWidth: width * 0.9,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -70,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 30,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomPopup; 