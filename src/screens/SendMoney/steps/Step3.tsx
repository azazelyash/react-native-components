import React from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import FormLabel from '../components/FormLabel';
import HintText from '../components/HintText';
import SectionCard from '../components/SectionCard';
import SectionTitle from '../components/SectionTitle';
import { inputStyle } from '../styles';
import { Colors } from '../../../constants/colors';
import { SendMoneyForm } from '../types';

type Props = {
  form: SendMoneyForm;
  setForm: (form: SendMoneyForm) => void;
};

const Step3 = ({ form, setForm }: Props) => (
  <View>
    <View style={{ marginBottom: 16 }}>
      <FormLabel text="Note / Reason" />
      <TextInput
        style={[inputStyle, { height: 100, textAlignVertical: 'top', paddingTop: 12 }]}
        placeholder="e.g. Rent payment for March..."
        placeholderTextColor={Colors.gray}
        multiline
        value={form.note}
        onChangeText={(v) => setForm({ ...form, note: v })}
      />
      <HintText text="A short note helps the recipient identify your transfer." />
    </View>

    <SectionCard>
      <SectionTitle text="Delivery Schedule" />
      <Text
        style={{ fontSize: 11, color: Colors.darkGray2, marginBottom: 8, letterSpacing: 0.5 }}
      >
        SEND DATE & TIME
      </Text>
      <TextInput
        style={[inputStyle, { color: Colors.gray }]}
        placeholder="mm/dd/yyyy  --:-- --"
        placeholderTextColor={Colors.gray}
        value={form.scheduleDate}
        onChangeText={(v) => setForm({ ...form, scheduleDate: v })}
      />
    </SectionCard>

    {/* Repeat toggle */}
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        padding: 14,
        borderRadius: 12,
        backgroundColor: '#f7f8ff',
        borderWidth: 1,
        borderColor: '#e8eaff',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: Colors.black }}>
          Repeat Transfer
        </Text>
        <Text style={{ fontSize: 12, color: Colors.darkGray2, marginTop: 2 }}>
          Set up recurring payments
        </Text>
      </View>
      <Switch
        value={form.repeat}
        onValueChange={(v) => setForm({ ...form, repeat: v })}
        trackColor={{ false: '#e2e8f0', true: Colors.primaryDark }}
        thumbColor="#fff"
      />
    </View>
  </View>
);

export default Step3;
