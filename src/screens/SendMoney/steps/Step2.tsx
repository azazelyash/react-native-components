import React from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import FormLabel from '../components/FormLabel';
import HintText from '../components/HintText';
import SectionCard from '../components/SectionCard';
import SectionTitle from '../components/SectionTitle';
import SpeedTagChip from '../components/SpeedTagChip';
import { inputStyle } from '../styles';
import { Colors } from '../../../constants/colors';
import { SpeedTag, SendMoneyForm } from '../types';

type Props = {
  form: SendMoneyForm;
  setForm: (form: SendMoneyForm) => void;
};

const Step2 = ({ form, setForm }: Props) => (
  <View>
    {/* Amount + Currency side by side */}
    <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
      <View style={{ flex: 2 }}>
        <FormLabel text="Amount" />
        <TextInput
          style={inputStyle}
          placeholder="0.00"
          placeholderTextColor={Colors.gray}
          keyboardType="decimal-pad"
          value={form.amount}
          onChangeText={(v) => setForm({ ...form, amount: v })}
        />
      </View>
      <View style={{ flex: 1 }}>
        <FormLabel text="Currency" />
        <TextInput
          style={inputStyle}
          placeholder="USD"
          placeholderTextColor={Colors.gray}
          autoCapitalize="characters"
          maxLength={3}
          value={form.currency}
          onChangeText={(v) => setForm({ ...form, currency: v })}
        />
      </View>
    </View>

    <HintText text="Recipient receives in their local currency after conversion." />

    {/* Fee + Notify row */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
      <View style={{ flex: 1 }}>
        <FormLabel text="Cover Fees" />
        <Text style={{ fontSize: 13, color: Colors.darkGray2 }}>
          {form.coverFees ? 'I pay fees' : 'Recipient pays'}
        </Text>
      </View>
      <Switch
        value={form.coverFees}
        onValueChange={(v) => setForm({ ...form, coverFees: v })}
        trackColor={{ false: '#e2e8f0', true: Colors.primaryDark }}
        thumbColor="#fff"
      />
    </View>

    {/* Speed tags */}
    <SectionCard>
      <SectionTitle text="Transfer Speed" />
      <Text
        style={{ fontSize: 11, color: Colors.darkGray2, marginBottom: 8, letterSpacing: 0.5 }}
      >
        DELIVERY OPTIONS
      </Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {(['Instant', 'Standard', 'Scheduled', 'Economy'] as SpeedTag[]).map((tag) => (
          <SpeedTagChip
            key={tag}
            label={tag}
            selected={form.speedTags.includes(tag)}
            onPress={() => {
              const existing: SpeedTag[] = form.speedTags;
              const updated = existing.includes(tag)
                ? existing.filter((t) => t !== tag)
                : [tag]; // single-select for speed
              setForm({ ...form, speedTags: updated });
            }}
          />
        ))}
      </View>
    </SectionCard>

    {/* Estimated fee summary */}
    <View
      style={{
        marginTop: 16,
        padding: 14,
        borderRadius: 12,
        backgroundColor: Colors.primaryAlpha,
        borderWidth: 1,
        borderColor: Colors.primaryLite,
      }}
    >
      <Text style={{ fontSize: 13, color: Colors.primaryDark, fontWeight: '600' }}>
        Estimated Fee
      </Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color: Colors.primaryDark, marginTop: 4 }}>
        ${form.amount ? (parseFloat(form.amount || '0') * 0.015).toFixed(2) : '0.00'}
      </Text>
      <Text style={{ fontSize: 12, color: Colors.darkGray2, marginTop: 2 }}>
        1.5% of transfer amount
      </Text>
    </View>
  </View>
);

export default Step2;
