import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const users = [
  { name: 'Jaxon Reed', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Zara Monroe', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Avery Parker', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Nova Sinclair', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={{ uri: users[0].avatar }} style={styles.profilePic} />
        <TouchableOpacity style={styles.switchBtn}><Text style={styles.switchBtnText}>Switch Accountbook</Text></TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.icon}>⚙️</Text></TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}><Text style={styles.icon}>🔔</Text><View style={styles.badge}><Text style={styles.badgeText}>3</Text></View></TouchableOpacity>
        </View>
      </View>
      <View style={styles.balanceRow}>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Account Balance</Text>
          <Text style={styles.balanceValue}>$33,000</Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Minimum Balance</Text>
          <Text style={styles.balanceValue}>$2,000</Text>
        </View>
      </View>
      <View style={styles.incomeExpenseRow}>
        <View style={styles.incomeBox}>
          <Text style={styles.incomeLabel}>Income</Text>
          <Text style={styles.incomeValue}>$5,000</Text>
        </View>
        <View style={styles.expenseBox}>
          <Text style={styles.expenseLabel}>Expenses</Text>
          <Text style={styles.expenseValue}>$1,200</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarRow}>
        {users.map((user, idx) => (
          <View key={idx} style={styles.avatarCol}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.avatarName}>{user.name}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.operatorsHeaderRow}>
        <Text style={styles.operatorsHeader}>Cashbook Operators</Text>
        <TouchableOpacity><Text style={styles.seeAllBtn}>See All</Text></TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {users.map((user, idx) => (
          <View key={idx} style={styles.operatorRow}>
            <Image source={{ uri: user.avatar }} style={styles.operatorAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.operatorName}>{user.name}</Text>
              <Text style={styles.operatorRole}>{user.role}</Text>
            </View>
            <TouchableOpacity style={styles.iconBtn}><Text style={styles.icon}>✏️</Text></TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}><Text style={styles.icon}>👁️</Text></TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addUserBtn}>
        <Text style={styles.addUserBtnText}>AddUser Page  ➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingBottom: 70 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  profilePic: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  switchBtn: { backgroundColor: '#f5f6fa', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  switchBtnText: { color: '#333', fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', marginLeft: 'auto' },
  iconBtn: { marginLeft: 12, position: 'relative' },
  icon: { fontSize: 22 },
  badge: { position: 'absolute', top: -6, right: -6, backgroundColor: '#de9228', borderRadius: 8, paddingHorizontal: 4, paddingVertical: 1 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  balanceBox: { flex: 1, backgroundColor: '#fcf0de', borderRadius: 12, padding: 12, marginHorizontal: 4, alignItems: 'center' },
  balanceLabel: { color: '#888', fontSize: 13 },
  balanceValue: { color: '#222', fontSize: 22, fontWeight: 'bold' },
  incomeExpenseRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  incomeBox: { flex: 1, backgroundColor: '#e6f7ec', borderRadius: 12, padding: 12, marginHorizontal: 4, alignItems: 'center' },
  incomeLabel: { color: '#1db954', fontWeight: 'bold' },
  incomeValue: { color: '#1db954', fontSize: 18, fontWeight: 'bold' },
  expenseBox: { flex: 1, backgroundColor: '#fde8e8', borderRadius: 12, padding: 12, marginHorizontal: 4, alignItems: 'center' },
  expenseLabel: { color: '#e53935', fontWeight: 'bold' },
  expenseValue: { color: '#e53935', fontSize: 18, fontWeight: 'bold' },
  avatarRow: { marginVertical: 12 },
  avatarCol: { alignItems: 'center', marginRight: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24, marginBottom: 4 },
  avatarName: { fontSize: 12, color: '#333' },
  operatorsHeaderRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, marginBottom: 4 },
  operatorsHeader: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  seeAllBtn: { color: '#1877F3', marginLeft: 12, fontWeight: 'bold', fontSize: 13 },
  operatorRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f5f6fa', borderRadius: 10, padding: 8, marginBottom: 8 },
  operatorAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10 },
  operatorName: { fontWeight: 'bold', color: '#333' },
  operatorRole: { color: '#888', fontSize: 12 },
  addUserBtn: { backgroundColor: '#1db954', borderRadius: 20, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  addUserBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
}); 