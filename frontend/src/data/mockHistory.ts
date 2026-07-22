export interface HistoryItem {
  id: string;
  timestamp: string;
  text: string;
  risk: 'safe' | 'needs_human_review' | 'high_risk';
  confidence: number;
  category: string;
  redFlags: string[];
}

export const mockHistoryItems: HistoryItem[] = [
  {
    id: 'H-901',
    timestamp: '2026-07-13 13:20:11',
    text: 'CBI Officer speaking. You are placed under digital arrest for Money Laundering. Do not disconnect the video call.',
    risk: 'high_risk',
    confidence: 0.96,
    category: 'Digital Arrest',
    redFlags: ['police_impersonation', 'fear_language', 'urgency'],
  },
  {
    id: 'H-902',
    timestamp: '2026-07-13 12:45:02',
    text: 'ALERT: Share the 6-digit OTP code sent to your mobile. SBI Customer care needs to verify your Aadhar card linking.',
    risk: 'high_risk',
    confidence: 0.94,
    category: 'OTP Scam',
    redFlags: ['otp_request', 'authority_impersonation'],
  },
  {
    id: 'H-903',
    timestamp: '2026-07-13 10:11:43',
    text: 'Are you available to attend the sync call on Friday morning? Let me know if that works.',
    risk: 'safe',
    confidence: 0.99,
    category: 'Safe Message',
    redFlags: [],
  },
  {
    id: 'H-904',
    timestamp: '2026-07-12 18:32:00',
    text: 'URGENT: Your loan application of Rs 25,000 has been approved. Click this link to confirm transfer to your bank: http://instant-pay-loan.in',
    risk: 'high_risk',
    confidence: 0.92,
    category: 'Loan Fraud',
    redFlags: ['link_present', 'financial_incentive'],
  },
  {
    id: 'H-905',
    timestamp: '2026-07-12 14:15:22',
    text: 'Hello, your courier package could not be delivered due to wrong house address. Pay Rs 25 redelivery charge to update address: http://ind-post-delivery.co.in',
    risk: 'needs_human_review',
    confidence: 0.82,
    category: 'Courier Scam',
    redFlags: ['urgency', 'suspicious_link'],
  },
  {
    id: 'H-906',
    timestamp: '2026-07-11 09:05:12',
    text: 'OTP for online transaction of Rs 14,999 on Flipkart is 829103. Do not share this OTP with anyone.',
    risk: 'safe',
    confidence: 0.97,
    category: 'Safe Transaction OTP',
    redFlags: [],
  },
];
