export interface ThreatActivityPoint {
  time: string;
  scans: number;
  threats: number;
}

export interface ScamDistribution {
  name: string;
  value: number;
}

export interface LanguageDistribution {
  language: string;
  count: number;
  fullMark: number;
}

export interface LiveThreatEvent {
  id: string;
  time: string;
  text: string;
  risk: 'safe' | 'needs_human_review' | 'high_risk';
  category: string;
}

export const mockThreatActivity: ThreatActivityPoint[] = [
  { time: '00:00', scans: 140, threats: 12 },
  { time: '04:00', scans: 95, threats: 8 },
  { time: '08:00', scans: 210, threats: 28 },
  { time: '12:00', scans: 340, threats: 64 },
  { time: '16:00', scans: 290, threats: 48 },
  { time: '20:00', scans: 410, threats: 76 },
  { time: '24:00', scans: 180, threats: 22 },
];

export const mockScamDistribution: ScamDistribution[] = [
  { name: 'Digital Arrest', value: 34 },
  { name: 'OTP Scam', value: 28 },
  { name: 'UPI/Payment Fraud', value: 20 },
  { name: 'Aadhaar / KYC Update', value: 12 },
  { name: 'Lottery / Job Offers', value: 6 },
];

export const mockLanguageDistribution: LanguageDistribution[] = [
  { language: 'English', count: 120, fullMark: 150 },
  { language: 'Hindi', count: 98, fullMark: 150 },
  { language: 'Marathi', count: 64, fullMark: 150 },
  { language: 'Tamil', count: 42, fullMark: 150 },
  { language: 'Telugu', count: 35, fullMark: 150 },
  { language: 'Bengali', count: 28, fullMark: 150 },
];

export const mockLiveThreats: LiveThreatEvent[] = [
  {
    id: 'TR-8942',
    time: '2 mins ago',
    text: 'Your electricity connection will be disconnected today night. Pay bill immediately to officer Sharma on 8928372332.',
    risk: 'high_risk',
    category: 'Electricity Scam',
  },
  {
    id: 'TR-8941',
    time: '5 mins ago',
    text: 'Hello friend, I have transferred Rs 5000 to your GPay by mistake. Please transfer back immediately to my mobile number.',
    risk: 'high_risk',
    category: 'UPI Refund Scam',
  },
  {
    id: 'TR-8940',
    time: '12 mins ago',
    text: 'Congratulations! Selected for Part-time remote work. Earning potential Rs 3000-8000 daily. Open Telegram link to join.',
    risk: 'high_risk',
    category: 'Job Offer Phishing',
  },
  {
    id: 'TR-8939',
    time: '18 mins ago',
    text: 'Dear customer, your bank account KYC has expired. Please log in to http://secure-netbanking-verification.com/login to update details.',
    risk: 'high_risk',
    category: 'KYC Phishing',
  },
  {
    id: 'TR-8938',
    time: '25 mins ago',
    text: 'Hi Mom, I lost my phone. Texting from a friend\'s mobile. Can you send Rs 2500 urgently? Will explain later.',
    risk: 'needs_human_review',
    category: 'Impersonation Scam',
  },
  {
    id: 'TR-8937',
    time: '42 mins ago',
    text: 'Let\'s meet for coffee tomorrow at 5 PM. Let me know if you are free.',
    risk: 'safe',
    category: 'General Message',
  },
];
