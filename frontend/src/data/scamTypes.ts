export interface ScamTypeDetail {
  id: string;
  name: string;
  hindiName: string;
  icon: string;
  shortDesc: string;
  longDesc: string;
  steps: string[];
  examples: string[];
  redFlags: string[];
  mitigation: string[];
}

export const scamEncyclopedia: ScamTypeDetail[] = [
  {
    id: 'digital-arrest',
    name: 'Digital Arrest Scam',
    hindiName: 'डिजिटल अरेस्ट घोटाला',
    icon: 'ShieldAlert',
    shortDesc: 'Scammers pose as CBI, Police, or Customs officials over video calls, claiming you are under "digital arrest" for illegal packages or money laundering.',
    longDesc: 'In this rapidly rising scam, victims receive phone calls from automated bots or fake customs officers claiming that a courier package containing illegal items (like narcotics or fake passports) was registered under their name. They are immediately routed to a fake police station setup over Skype/WhatsApp video calls where officers in uniform keep them online under constant observation ("digital arrest") to extort large sums of money in exchange for closing the case.',
    steps: [
      'Victim receives a call stating an illegal parcel in their name has been intercepted.',
      'The call is transferred to fake law enforcement officials (CBI, Police, Customs).',
      'Victim is forced to connect via WhatsApp/Skype video call immediately.',
      'Scammers show fake credentials, court orders, and police setups.',
      'Victim is forced to keep their camera on 24/7 under "digital arrest" and forbidden to call family.',
      'Scammers ask the victim to transfer money to a secure government escrow account for verification, promising refunds.'
    ],
    examples: [
      '"This is Mumbai Customs. We found 50g MDMA drug in a parcel sent from Taiwan to your Aadhaar card number. Transferring your line to CBI Headquarters."',
      '"You are under digital arrest under section 144. If you turn off your video camera or inform anyone, we will send local police to arrest you right now."'
    ],
    redFlags: [
      'Demand to stay on video call continuously (Digital Arrest is not legally recognized in India).',
      'Asking to transfer funds to bank accounts of individuals instead of official government portals.',
      'Creating intense fear and calling from mobile numbers instead of landlines.'
    ],
    mitigation: [
      'Hang up immediately! No police or CBI official will ever ask you to connect via WhatsApp or Skype for inspection.',
      'Do not transfer money to any account for "verification purposes."',
      'Report the number on Chakshu Portal (Sanchar Saathi) and call 1930 immediately.'
    ]
  },
  {
    id: 'upi-refund',
    name: 'UPI / Refund Error Scam',
    hindiName: 'यूपीआई गलत ट्रांसफर घोटाला',
    icon: 'DollarSign',
    shortDesc: 'Fraudsters send a fake screenshot or SMS saying they transferred money by mistake, and ask you to return it via a UPI link that drains your account.',
    longDesc: 'Fraudsters exploit the convenience of UPI systems. They send you a fake bank notification SMS or call you frantically, crying that they accidentally transferred their child\'s school fees or hospital bills to your UPI ID. They request you to click a link or scan a QR code to "refund" their money, which instead initiates a request that debits your account.',
    steps: [
      'Scammer sends a spoofed SMS that looks like a bank credit notification.',
      'Scammer calls the victim claiming a mistaken fund transfer of Rs 5000 / Rs 10,000.',
      'They play on emotion, claiming a medical emergency or immediate necessity.',
      'They send a UPI collect request or QR code to the victim.',
      'When the victim scans it and inputs their UPI PIN, money is debited from their account instead of credited.'
    ],
    examples: [
      '"Dear Bank customer, Rs. 10,000 has been credited to your A/c... (fake SMS template)"',
      '"Bhaiya, mistakenly transferred Rs 5,000 to your GPay instead of my brother. My mother is in the hospital. Please return it, please save her!"'
    ],
    redFlags: [
      'Receiving requests to input UPI PIN to receive money (UPI PIN is ONLY required for sending money).',
      'Urging to scan a QR code sent over WhatsApp.',
      'Credit SMS coming from standard mobile numbers instead of official bank shortcodes (e.g. AX-BANKIN).'
    ],
    mitigation: [
      'Check your official bank account statement directly from your banking app to see if money actually arrived.',
      'Never input your UPI PIN to receive any refund or payment.',
      'If someone actually transferred money by mistake, ask them to resolve it via their bank or contact bank customer service.'
    ]
  },
  {
    id: 'otp-phishing',
    name: 'Aadhaar / Sim Card Block OTP Scam',
    hindiName: 'आधार / सिम ब्लॉक ओटीपी घोटाला',
    icon: 'Smartphone',
    shortDesc: 'Threat actors send urgent alerts claiming your SIM card or Aadhaar card is blocked, prompting you to share OTPs to verify and unlock it.',
    longDesc: 'By capitalizing on fear of digital isolation, scammers send bulk text alerts claiming the victim\'s SIM card KYC is incomplete, or Aadhaar card has been locked by UIDAI due to fraudulent activities. They instruct victims to call a helpline number where fake telecom agents ask them to read out OTPs, which are actually used to trigger SIM swaps or hijack netbanking profiles.',
    steps: [
      'Bulk SMS sent warning: "Your SIM card will be deactivated within 24 hours due to KYC."',
      'Victim calls the provided mobile number out of panic.',
      'Scammers impersonate Jio, Airtel, or UIDAI executives.',
      'They ask the victim to download a remote screen sharing application (like AnyDesk or TeamViewer).',
      'They trigger a transaction and ask the victim to share the OTP received on their phone.'
    ],
    examples: [
      '"ALERT: Your Airtel SIM KYC is pending. To avoid deactivation today call support at 9283748271."',
      '"UIDAI Alert: Your Aadhaar card is locked due to suspicious linking. Unlock immediately at http://uidai-aadhar-unlock.gov.in"'
    ],
    redFlags: [
      'Messages from personal 10-digit mobile numbers claiming to represent major telecom brands or government offices.',
      'Demands to download screen sharing software.',
      'Asking to forward SMS or read out OTP codes.'
    ],
    mitigation: [
      'Ignore messages demanding immediate KYC updates. Genuine companies send messages via verified brand IDs.',
      'Never download remote screen control apps on instructions from unknown callers.',
      'Official UIDAI services can only be verified on the official website: uidai.gov.in.'
    ]
  }
];
