import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native';
import FormLabel from '../components/FormLabel';
import HintText from '../components/HintText';
import SectionCard from '../components/SectionCard';
import SectionTitle from '../components/SectionTitle';
import { inputStyle } from '../styles';
import { Colors } from '../../../constants/colors';
import { TransferType, SendMoneyForm } from '../types';
import { TouchableOpacity, Text } from 'react-native';

type Props = {
  form: SendMoneyForm;
  setForm: (form: SendMoneyForm) => void;
};

const Step1 = ({ form, setForm }: Props) => (
  <View>
    <View style={{ marginBottom: 16 }}>
      <FormLabel text="Recipient Name" />
      <TextInput
        style={inputStyle}
        placeholder="e.g. Jane Doe"
        placeholderTextColor={Colors.gray}
        value={form.recipientName}
        onChangeText={(v) => setForm({ ...form, recipientName: v })}
      />
      <HintText text="Enter the full name as it appears on their account." />
    </View>

    <View style={{ marginBottom: 16 }}>
      <FormLabel text="Account / Phone Number" />
      <TextInput
        style={inputStyle}
        placeholder="e.g. +1 555 000 0000"
        placeholderTextColor={Colors.gray}
        keyboardType="phone-pad"
        value={form.accountNumber}
        onChangeText={(v) => setForm({ ...form, accountNumber: v })}
      />
      <HintText text="Mobile number or bank account number." />
    </View>

    <View style={{ marginBottom: 16 }}>
      <FormLabel text="Recipient Bank / Provider" />
      <TextInput
        style={inputStyle}
        placeholder="e.g. Chase, PayPal, Binance..."
        placeholderTextColor={Colors.gray}
        value={form.bank}
        onChangeText={(v) => setForm({ ...form, bank: v })}
      />
    </View>

    <SectionCard>
      <SectionTitle text="Transfer Type" />
      <Text style={{ fontSize: 12, color: Colors.darkGray2, marginBottom: 2 }}>
        TRANSFER METHOD
      </Text>
      {(['Bank Transfer', 'Mobile Wallet', 'Crypto', 'Card'] as TransferType[]).map((type) => (
        <TouchableOpacity
          key={type}
          onPress={() => setForm({ ...form, transferType: type })}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#e8eaff',
          }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              borderWidth: 2,
              borderColor: form.transferType === type ? Colors.primaryDark : Colors.gray,
              marginRight: 12,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {form.transferType === type && (
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: Colors.primaryDark,
                }}
              />
            )}
          </View>
          <Text style={{ fontSize: 14, color: Colors.black }}>{type}</Text>
        </TouchableOpacity>
      ))}
    </SectionCard>
  </View>
);

export default Step1;
