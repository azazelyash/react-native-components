import React from 'react';
import { View, Text } from 'react-native';
import SectionCard from '../components/SectionCard';
import SectionTitle from '../components/SectionTitle';
import { Colors } from '../../../constants/colors';
import { SendMoneyForm } from '../types';

type Props = {
  form: SendMoneyForm;
};

const Step4 = ({ form }: Props) => {
  const rows = [
    { label: 'Recipient', value: form.recipientName || '—' },
    { label: 'Account', value: form.accountNumber || '—' },
    { label: 'Bank', value: form.bank || '—' },
    { label: 'Transfer Type', value: form.transferType },
    { label: 'Amount', value: `${form.amount || '0.00'} ${form.currency}` },
    { label: 'Speed', value: form.speedTags[0] || 'Standard' },
    { label: 'Cover Fees', value: form.coverFees ? 'Yes' : 'No' },
    { label: 'Note', value: form.note || '—' },
    { label: 'Scheduled', value: form.scheduleDate || 'Immediately' },
  ];

  return (
    <View>
      <SectionCard>
        <SectionTitle text="Transaction Summary" />
        {rows.map((r, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 8,
              borderBottomWidth: i < rows.length - 1 ? 1 : 0,
              borderBottomColor: '#e8eaff',
            }}
          >
            <Text style={{ fontSize: 13, color: Colors.darkGray2, flex: 1 }}>{r.label}</Text>
            <Text
              style={{ fontSize: 13, color: Colors.black, fontWeight: '500', flex: 2, textAlign: 'right' }}
              numberOfLines={1}
            >
              {r.value}
            </Text>
          </View>
        ))}
      </SectionCard>

      {/* Total box */}
      <View
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 14,
          backgroundColor: Colors.primaryDark,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>You Pay</Text>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 2 }}>
            ${form.amount
              ? (parseFloat(form.amount) * (form.coverFees ? 1.015 : 1)).toFixed(2)
              : '0.00'}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>They Receive</Text>
          <Text style={{ color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 2 }}>
            ${form.amount ? parseFloat(form.amount).toFixed(2) : '0.00'}
          </Text>
        </View>
      </View>

      <Text
        style={{
          marginTop: 12,
          fontSize: 12,
          color: Colors.darkGray2,
          textAlign: 'center',
          lineHeight: 18,
        }}
      >
        By tapping Send, you agree to our{' '}
        <Text style={{ color: Colors.primaryDark, fontWeight: '600' }}>Terms & Conditions</Text>.
      </Text>
    </View>
  );
};

export default Step4;
