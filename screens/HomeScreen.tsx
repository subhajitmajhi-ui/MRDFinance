import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const users = [
  { name: 'Jaxon Reed', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Zara Monroe', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Avery Parker', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Nova Sinclair', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { name: 'Maya Chen', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { name: 'Liam Rodriguez', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { name: 'Sophia Kim', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { name: 'Ethan Thompson', role: 'Admin', avatar: 'https://randomuser.me/api/portraits/men/8.jpg' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fac57f', '#fac57f', '#fcf0de']}
        style={styles.headerContainerMain}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
          <View style={styles.headerRow}>
            <Image source={{ uri: users[0].avatar }} style={styles.profilePic} />
            <TouchableOpacity style={styles.switchBtn}>
              <Text style={styles.switchBtnText}>Switch Accountbook</Text>
              <Image source={require('../assets/icons/custom-down-arrow.png')} style={styles.downArrow} />
            </TouchableOpacity>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconBtn}>
                <Image source={require('../assets/icons/setting-icon.png')} style={styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
                <Image source={require('../assets/icons/notification-icon.png')} style={styles.headerIcon} />
                <View style={styles.badge}><Text style={styles.badgeText}>3</Text></View>
              </TouchableOpacity>
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
              <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/income-icon.png')} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.incomeLabel}>Income</Text>
                <Text style={styles.incomeValue}>$5,000</Text>
              </View>
            </View>
            <View style={styles.expenseBox}>
              <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/expense-icon.png')} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.expenseLabel}>Expenses</Text>
                <Text style={styles.expenseValue}>$1,200</Text>
              </View>
            </View>
          </View>
      </LinearGradient>
      <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarRow}>
        {users.map((user, idx) => (
          <View key={idx} style={styles.avatarCol}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <Text style={styles.avatarName}>{user.name}</Text>
          </View>
        ))}
      </ScrollView>
      </View>
        <View style={styles.operatorsHeaderRow}>
          <Text style={styles.operatorsHeader}>Cashbook Operators</Text>
          <TouchableOpacity style={styles.seeAllBtnContainer}>
            <Text style={styles.seeAllBtnText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingLeft: 16, paddingRight: 16}}>
          {users.map((user, idx) => (
            <View key={idx} style={styles.operatorRow}>
              <Image source={{ uri: user.avatar }} style={styles.operatorAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.operatorName}>{user.name}</Text>
                <Text style={styles.operatorRole}>{user.role}</Text>
              </View>
              <TouchableOpacity style={styles.iconBtn}>
              <FontAwesome
              name={'edit'}
              size={20}
              color={'#666666'}
            />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn}>
              <FontAwesome
              name={'eye'}
              size={20}
              color={'#666666'}
            />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      
      <TouchableOpacity style={styles.addUserBtn}>
        <View style={styles.addUserBtnContent}>
          <Text style={styles.addUserBtnText}>AddUser Page</Text>
          <FontAwesome
            name={'angle-double-right'}
            size={20}
            color={'#ffffff'}
            style={styles.addUserBtnArrow}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingBottom: 80 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  headerContainerMain: { paddingLeft: 16, paddingRight: 16, paddingTop: 60, paddingBottom: 23, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  profilePic: { 
    width: 45, 
    height: 45, 
    borderRadius: 50, 
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#FF9900',
  },
  switchBtn: { 
    backgroundColor: '#EEE5FF', 
    borderRadius: 40, 
    paddingHorizontal: 12, 
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchBtnText: { 
    color: '#000000', 
    fontWeight: 500,
    fontSize: 12,
    marginRight: 4,
  },
  downArrow: {
    width: 11,
    height: 5,
    marginTop: 3,
  },
  headerIcons: { flexDirection: 'row', marginLeft: 'auto' },
  iconBtn: { marginLeft: 12, position: 'relative' },
  headerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  badge: { position: 'absolute', top: -6, right: -6, backgroundColor: '#FD3C4A', borderRadius: 8, paddingHorizontal: 4, paddingVertical: 1 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  balanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  balanceBox: { flex: 1, padding: 12, marginHorizontal: 4, alignItems: 'center' },
  balanceLabel: { color: '#0E0E0E', fontSize: 14, fontWeight: 500 },
  balanceValue: { color: '#161719', fontSize: 30, fontWeight: 600 },
  incomeExpenseRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  incomeBox: { 
    flex: 1, 
    backgroundColor: '#00A86B', 
    borderRadius: 28, 
    padding: 16, 
    marginHorizontal: 4, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  expenseBox: { 
    flex: 1, 
    backgroundColor: '#FD3C4A', 
    borderRadius: 28, 
    padding: 16, 
    marginHorizontal: 4, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    // backgroundColor: '#fff',
    marginRight: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  incomeLabel: { 
    color: '#FCFCFC', 
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 2,
  },
  incomeValue: { 
    color: '#FCFCFC', 
    fontSize: 22, 
    fontWeight: 600
  },
  expenseLabel: { 
    color: '#FCFCFC', 
    fontWeight: 500,
    fontSize: 14,
    marginBottom: 2,
  },
  expenseValue: { 
    color: '#FCFCFC', 
    fontSize: 22, 
    fontWeight: 600 
  },
  avatarRow: { marginTop: 12, paddingLeft: 16, paddingRight: 16, marginBottom: 0 },
  avatarCol: { alignItems: 'center', marginRight: 16 },
  avatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginBottom: 4,
    borderWidth: 2,
    borderColor: '#FF9900',
  },
  avatarName: { fontSize: 13, fontWeight: 500, color: '#91919F' },
  operatorsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    marginTop: 32,
  },
  operatorsHeader: {
    fontWeight: 600,
    fontSize: 15,
    color: '#7F7F7F',
  },
  seeAllBtnContainer: {
    backgroundColor: '#D6E4FF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  seeAllBtnText: {
    color: '#000000',
    fontWeight: 700,
    fontSize: 10,
  },
  operatorRow: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  operatorAvatar: { width: 50, height: 50, borderWidth: 2, borderColor: '#FF9900', borderRadius: 50, marginRight: 10 },
  operatorName: { fontWeight: 600, color: '#3A343A', fontSize: 12 },
  operatorRole: { color: '#91919F', fontSize: 13, fontWeight: 500 },
  addUserBtn: {
    backgroundColor: '#00A86B',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 7,
    marginHorizontal: 16,
    maxWidth: 164,
  },
  addUserBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addUserBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  addUserBtnArrow: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
}); 