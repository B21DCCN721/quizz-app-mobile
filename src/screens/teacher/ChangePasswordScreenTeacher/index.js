

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import DefaultLayout from '../../../layouts/DefaultLayout';
import IconHideEye from '../../../../assets/icons/hideEye.svg'; // Assuming you have an icon for showing/hiding password
import HeaderLayout from '../../../layouts/HeaderLayout';

function ChangePasswordScreenTeacher({ navigation }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    navigation.goBack();
  }

  const handleCancel = () => {
    // Logic to cancel the password change
    navigation.goBack();
  }

  return (
    <HeaderLayout>
      <View style={styles.container}>
      <View className="flex-row items-center p-4">
        <Text className="font-interBold text-2xl text-center flex-1">
          Đổi mật khẩu
        </Text>
      </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu cũ</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nhập mật khẩu cũ của bạn"
              secureTextEntry={!showOldPassword}
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                <Text style={styles.eyeIcon}> 
                  {showOldPassword ? (
                    "🙈"
                  ) : (
                    <IconHideEye width="20px" height="20px"/>
                  )}
                </Text>
              </TouchableOpacity> 
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mật khẩu mới</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Mật khẩu mới phải có ít nhất 8 ký tự"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Text style={styles.eyeIcon}> 
                  {showNewPassword ? (
                    "🙈"
                  ) : (
                    <IconHideEye width="20px" height="20px"/>
                  )}
                </Text>
              </TouchableOpacity> 
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nhập lại mật khẩu</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nhập lại mật khẩu"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={styles.eyeIcon}> 
                  {showConfirmPassword ? (
                    "🙈"
                  ) : (
                    <IconHideEye width="20px" height="20px"/>
                  )}
                </Text>
              </TouchableOpacity> 
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
            <Text style={styles.buttonText}>Lưu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E7784C',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
    color: '#333',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  eyeIcon: {
    fontSize: 18,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    fontFamily: 'Inter-SemiBold',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#a6a4a4',
  },
  saveButton: {
    backgroundColor: '#E7784C',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreenTeacher;
