import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AddUserModal({ visible, onClose, onSubmit }: { visible: boolean; onClose: () => void; onSubmit?: (data: any) => void }) {
  const [userName, setUserName] = useState('');
  const [type, setType] = useState('Admin');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const typeOptions = ['Admin', 'Operator', 'Viewer'];
  const [email, setEmail] = useState('');
  const [project, setProject] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response && response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri || '');
      }
    });
  };

  const handleSubmit = () => {
    onSubmit?.({ userName, type, email, project, photo });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Cashbook Operators</Text>
            <Text style={styles.modalLabel}>User Name</Text>
            <TextInput
              style={styles.modalInput}
              value={userName}
              onChangeText={setUserName}
              placeholder="Rain Renolt"
              placeholderTextColor="#888"
            />
            <Text style={styles.modalLabel}>Type</Text>
            <View style={{ position: 'relative' }}>
              <TouchableOpacity
                style={styles.modalInput}
                activeOpacity={0.7}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Text style={{ color: '#222' }}>{type}</Text>
                <FontAwesome name="chevron-down" size={18} color="#666666" style={{ position: 'absolute', right: 12, top: 12 }} />
              </TouchableOpacity>
              {dropdownOpen && (
                <View style={styles.dropdown}>
                  {typeOptions.map(option => (
                    <TouchableOpacity key={option} onPress={() => { setType(option); setDropdownOpen(false); }}>
                      <Text style={styles.dropdownOption}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
            <Text style={styles.modalLabel}>Email Id or Phone Number</Text>
            <TextInput
              style={styles.modalInput}
              value={email}
              onChangeText={setEmail}
              placeholder="rainrenolt@gmail.com"
              placeholderTextColor="#888"
            />
            <Text style={styles.modalLabel}>Project</Text>
            <TextInput
              style={styles.modalInput}
              value={project}
              onChangeText={setProject}
              placeholder="Project1"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.uploadContainer} onPress={pickImage}>
              {photo ? (
                <Image source={{ uri: photo }} style={styles.uploadImage} />
              ) : (
                <View style={styles.uploadPlaceholder}>
                  <FontAwesome name="user" size={48} color="#888" />
                </View>
              )}
              <View style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload Your Photo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={{ marginTop: 16 }}>
              <Text style={{ color: '#00A86B', fontWeight: 'bold', textAlign: 'center' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    width: '90%',
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: 15,
    color: '#000000',
    alignSelf: 'center',
    marginBottom: 21,
  },
  modalLabel: {
    fontWeight: 600,
    fontSize: 14,
    marginBottom: 8,
    color: '#000000',
  },
  modalInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0E4EE',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 13,
    marginBottom: 8,
    color: '#222',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D6E4FF',
    borderRadius: 8,
    marginTop: 0,
    marginBottom: 8,
    zIndex: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    boxShadow: '0px 4px 12px 0px rgba(0, 0, 0, 0.1)',
  },
  dropdownOption: {
    padding: 12,
    fontSize: 13,
    color: '#222',
  },
  uploadContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  uploadPlaceholder: {
    width: 180,
    height: 80,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  uploadImage: {
    width: 180,
    height: 80,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  uploadButton: {
    width: 180,
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#000000',
    fontWeight: 600,
    fontSize: 10,
  },
  submitBtn: {
    backgroundColor: '#00D1E6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  submitBtnText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 20,
  },
}); 