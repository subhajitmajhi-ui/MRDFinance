import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MainTabs } from '../App';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddCashbookForm from '../screens/AddCashbookModal';

const DrawerNav = createDrawerNavigator();

const cashbooks = [
  {
    type: 'debit',
    name: 'My Family Cashbook',
    bank: 'HTDC',
    balance: 25450,
    icon: require('../assets/icons/bank-yellow.png'),
    selected: true,
    bgColor: '#D2F3EA',
    bankTextColor: '#6A7D7D',
    check: true,
  },
  {
    type: 'debit',
    name: 'Company Cashbook',
    bank: 'ST BANK',
    balance: 36500,
    icon: require('../assets/icons/bank-red.png'),
    selected: false,
    bgColor: '#FFE7C2',
    bankTextColor: '#A08A4A',
    check: false,
  },
  {
    type: 'credit',
    name: 'My Personal Cashbook',
    bank: 'JFCBI',
    balance: 54500,
    icon: require('../assets/icons/payment-system-4.png'),
    selected: false,
    bgColor: '#FFD6D6',
    bankTextColor: '#A06A6A',
    check: false,
  },
];

function DrawerContent() {
  const [addCashbookVisible, setAddCashbookVisible] = useState(false);
  const handleAddCashbookSubmit = () => {
    // You can handle the submitted data here if needed
    setAddCashbookVisible(false);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: '#FAFAFA' }}
        contentContainerStyle={{ padding: 20, paddingTop: 50 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* User Profile Section */}
        <View style={styles.userRow}>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
          <Text style={styles.userName}>Cody Rose</Text>
          <TouchableOpacity style={styles.backBtn}>
            <Text style={styles.backText}>Back</Text>
            <Text style={styles.backArrow}>
              <FontAwesome name={'chevron-right'} size={12} color={'#666666'} />
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        {/* User Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>
            <FontAwesome name={'user-circle'} size={16} color={'#FF9900'} />
            </Text>
            <Text style={styles.infoText}>id. 25498785DS3</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>
              <MaterialCommunityIcons name={'email-variant'} size={16} color={'#FF9900'} />
            </Text>
            <Text style={styles.infoText}>info@finance.gmail.com</Text>
          </View>
        </View>
        {/* Family Card */}
        <View style={styles.familyCard}>
          <Image source={require('../assets/icons/family.png')} style={styles.familyIcon} />
          <Text style={styles.familyText}>Family</Text>
          <Image source={require('../assets/icons/reload-icon.png')} style={styles.familyRefreshIcon} />
        </View>
        {/* All Cashbook Section */}
        <Text style={styles.sectionTitle}>All Cashbook</Text>
        {/* Debit Cards */}
        <Text style={styles.subSectionTitle}>Debit Cards</Text>
        {cashbooks.filter(c => c.type === 'debit').map((c, i) => (
          <View key={i} style={[styles.card, { backgroundColor: c.bgColor }]}> 
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 50, marginRight: 20 }}>
              <Image source={c.icon} style={styles.cardIcon} />
              <Text style={[styles.cardBank, { textAlign: 'center', width: '100%' }]}>{c.bank}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{c.name}</Text>
              <Text style={styles.cardBalance}>Avl Balance:${c.balance}</Text>
            </View>
            {c.check && (
              <Text style={styles.checkMark}>
                <FontAwesome name={'check'} size={18} color={'#208e4e'} />
              </Text>
            )}
          </View>
        ))}
        {/* Credit Cards */}
        <Text style={styles.subSectionTitle}>Credit Cards</Text>
        {cashbooks.filter(c => c.type === 'credit').map((c, i) => (
          <View key={i} style={[styles.card, { backgroundColor: c.bgColor }]}> 
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: 50, marginRight: 20 }}>
              <Image source={c.icon} style={styles.cardIcon} />
              <Text style={[styles.cardBank, { textAlign: 'center', width: '100%' }]}>{c.bank}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{c.name}</Text>
              <Text style={styles.cardBalance}>Avl Balance:${c.balance}</Text>
            </View>
          </View>
        ))}
        {/* Add Cashbook */}
        <TouchableOpacity style={styles.addCard} onPress={() => setAddCashbookVisible(v => !v)}>
          <Image source={require('../assets/icons/bank-green.png')} style={styles.addCardIcon} />
          <Text style={styles.addCardText}>Add Cashbook</Text>
          <Text style={styles.addCardPlus}>
            <FontAwesome name={'plus'} size={18} color={'#7F3DFF'} />
          </Text>
        </TouchableOpacity>
        {addCashbookVisible && (
          <AddCashbookForm onSubmit={handleAddCashbookSubmit} />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 22,
    marginRight: 10,
    boxShadow: '0px 2px 0px 0px #0000001F',
  },
  userName: {
    fontSize: 12,
    fontWeight: 700,
    color: '#000000',
    flex: 1,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  backText: {
    fontSize: 12,
    fontWeight: 500,
    color: '#666666',
    marginRight: 5,
  },
  backArrow: {
    fontSize: 16,
    color: '#666666',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  infoText: {
    fontSize: 10,
    fontWeight: 500,
    color: '#666666',
  },
  familyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9C8FF',
    borderRadius: 16,
    padding: 10,
    paddingLeft: 13,
    paddingRight: 25,
    marginTop: 20,
  },
  familyIcon: {
    width: 29,
    height: 29,
    marginRight: 12,
  },
  familyText: {
    fontSize: 11,
    fontWeight: 700,
    color: '#000000',
    flex: 1,
  },
  familyRefreshIcon: {
    width: 24,
    height: 24,
    tintColor: '#A259FF',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 21,
    color: '#000000',
  },
  subSectionTitle: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 10,
    color: '#666666',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 13,
    paddingHorizontal: 11,
    paddingRight: 20,
    marginTop: 15,
  },
  cardIcon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#000000',
  },
  cardBank: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    width: '100%',
    marginTop: 2,
  },
  cardBalance: {
    fontSize: 10,
    fontWeight: 500,
    color: '#666666',
    marginTop: 5,
  },
  checkMark: {
    fontSize: 22,
    color: '#2ECC71',
    marginLeft: 8,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9C8FF',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  addCardIcon: {
    width: 25,
    marginRight: 12,
  },
  addCardText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000000',
    flex: 1,
  },
  addCardPlus: {
    fontSize: 28,
    color: '#A259FF',
    marginLeft: 8,
  },
});

export default function Drawer() {
  return (
    <DrawerNav.Navigator
      drawerContent={() => <DrawerContent />}
      screenOptions={{ headerShown: false }}
    >
      <DrawerNav.Screen
        name="MainTabs"
        component={MainTabs}
        options={{
          drawerLabel: () => null,
          drawerIcon: () => null,
        }}
      />
    </DrawerNav.Navigator>
  );
} 