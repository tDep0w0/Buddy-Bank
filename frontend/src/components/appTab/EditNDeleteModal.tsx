import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors'

interface EditNDeleteModalProps {
  isVisible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  position: { x: number; y: number }; 
}

const EditNDeleteModal: React.FC<EditNDeleteModalProps> = ({
  isVisible,
  onClose,
  onEdit,
  onDelete,
  position,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { top: position.y, left: position.x}]}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onEdit();
                onClose();
              }}>
              <Ionicons name="create" size={24} color="white" />
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => {
                onDelete();
                onClose();
              }}>
              <Ionicons name="trash" size={24} color="red" />
              <Text style={styles.delText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    position: 'absolute',
    width: 150, 
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white'
  },
  delText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'red'
  },
});

export default EditNDeleteModal;