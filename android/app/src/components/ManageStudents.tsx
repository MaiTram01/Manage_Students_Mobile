import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

interface Contact {
  name: string;
  phone: string;
}

const ManageStudents = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (!name || !phone) return;

    if (editIndex !== null) {
      const updated = [...contacts];
      updated[editIndex] = {name, phone};
      setContacts(updated);
      setEditIndex(null);
    } else {
      setContacts([...contacts, {name, phone}]);
    }

    setName('');
    setPhone('');
  };

  const handleDelete = (index: number) => {
    const newList = contacts.filter((_, i) => i !== index);
    setContacts(newList);
  };

  const handleEdit = (index: number) => {
    setName(contacts[index].name);
    setPhone(contacts[index].phone);
    setEditIndex(index);
  };

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📒 Danh Bạ Cute của Mai Trâm</Text>
      <TextInput style={styles.input} placeholder="🌸 Nhập tên" value={name} onChangeText={setName}/>
      <TextInput style={styles.input} placeholder="📱 Nhập số điện thoại" keyboardType="phone-pad" value={phone} onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Text style={styles.addText}>
          {editIndex !== null ? '💾 Lưu' : '+ THÊM'}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Tìm kiếm..."
        value={search}
        onChangeText={setSearch} />
      <FlatList
        data={filteredContacts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>
              👤 {item.name} - {item.phone}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(index)}>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ManageStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffeef5',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ff4da6',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffd6e8',
    padding: 10,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: '#ff66b3',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  addText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffd6e8',
    padding: 10,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe0eb',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  contactText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
  },
  editIcon: {
    marginHorizontal: 6,
    fontSize: 18,
  },
  deleteIcon: {
    marginHorizontal: 6,
    fontSize: 18,
  },
});
