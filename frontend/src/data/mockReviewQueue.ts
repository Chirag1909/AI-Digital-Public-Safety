export interface QueueItem {
  id: string;
  timestamp: string;
  text: string;
  confidence: number;
  category: string;
  redFlags: string[];
  language: string;
}

export const mockReviewQueueItems: QueueItem[] = [
  {
    id: 'Q-401',
    timestamp: '2026-07-13 13:41:22',
    text: 'Congratulations! You won a cashback prize of Rs 1,999 on PhonePe. Click this link to claim in your account: http://cashback-phonepe-reward.in',
    confidence: 0.88,
    category: 'UPI Refund Scam',
    redFlags: ['cashback_offer', 'link_present'],
    language: 'English',
  },
  {
    id: 'Q-402',
    timestamp: '2026-07-13 12:12:05',
    text: 'प्रिय ग्राहक, आपका सिम कार्ड ब्लॉक हो गया है। कृपया अपने आधार कार्ड विवरण को सत्यापित करने के लिए इस नंबर पर संपर्क करें।',
    confidence: 0.74,
    category: 'KYC Phishing',
    redFlags: ['sim_block_warning', 'hindi_language'],
    language: 'Hindi',
  },
  {
    id: 'Q-403',
    timestamp: '2026-07-13 11:30:19',
    text: 'Hey mate, can you check if the website has gone live? Let me know if you face any issues while accessing it.',
    confidence: 0.71,
    category: 'General Text',
    redFlags: [],
    language: 'English',
  },
  {
    id: 'Q-404',
    timestamp: '2026-07-12 17:45:00',
    text: 'ALERT: Your electricity bill is pending for past 3 months. Avoid immediate suspension of power. Call helper 9821738221.',
    confidence: 0.81,
    category: 'Electricity Scam',
    redFlags: ['urgency', 'suspicious_number'],
    language: 'English',
  },
];
