export type TransferType = 'Bank Transfer' | 'Mobile Wallet' | 'Crypto' | 'Card';
export type SpeedTag = 'Instant' | 'Standard' | 'Scheduled' | 'Economy';

export type SendMoneyForm = {
  // Step 1
  recipientName: string;
  accountNumber: string;
  bank: string;
  transferType: TransferType;
  // Step 2
  amount: string;
  currency: string;
  coverFees: boolean;
  speedTags: SpeedTag[];
  // Step 3
  note: string;
  scheduleDate: string;
  repeat: boolean;
};
