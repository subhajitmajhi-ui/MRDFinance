import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../src/contexts/AuthContext';
import CustomPopup from '../src/components/CustomPopup';

const MeScreen = () => {
  const { user, logout } = useAuth();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupConfig, setPopupConfig] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  }>({
    type: 'info',
    title: '',
    message: '',
  });

  const showPopup = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    console.log('Showing popup:', { type, title, message });
    setPopupConfig({ type, title, message });
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleLogout = () => {
    showPopup('info', 'Logout', 'Are you sure you want to logout?');
  };

  const handleLogoutConfirm = async () => {
    try {
      await logout();
      showPopup('success', 'Success', 'You have been logged out successfully');
    } catch (error: any) {
      showPopup('error', 'Logout Failed', error.message || 'An error occurred during logout');
    }
  };

  const handlePopupAction = () => {
    if (popupConfig.type === 'info' && popupConfig.title === 'Logout') {
      // This is the logout confirmation popup
      handleLogoutConfirm();
    }
    setPopupVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#fac57f', '#fac57f', '#fcf0de']}
        style={styles.header}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>
      
      <View style={styles.container}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <FontAwesome name="user-circle" size={80} color="#de9228" />
          </View>
          <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <Text style={styles.userPhone}>{user?.phone || '+1234567890'}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="user" size={20} color="#666" />
            <Text style={styles.menuText}>Edit Profile</Text>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="bell" size={20} color="#666" />
            <Text style={styles.menuText}>Notifications</Text>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="lock" size={20} color="#666" />
            <Text style={styles.menuText}>Privacy & Security</Text>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="question-circle" size={20} color="#666" />
            <Text style={styles.menuText}>Help & Support</Text>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name="info-circle" size={20} color="#666" />
            <Text style={styles.menuText}>About</Text>
            <FontAwesome name="chevron-right" size={16} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LinearGradient
            colors={['#ff6b6b', '#ee5a52']}
            style={styles.logoutGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <FontAwesome name="sign-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Custom Popup */}
      <CustomPopup
        visible={popupVisible}
        type={popupConfig.type}
        title={popupConfig.title}
        message={popupConfig.message}
        buttonText={popupConfig.type === 'info' ? 'Logout' : 'OK'}
        onPress={popupConfig.type === 'info' ? handlePopupAction : undefined}
        onClose={handlePopupClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 100, // Account for bottom navigation
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default MeScreen; 