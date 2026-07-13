# Frontend Development Plan & Backend Overview

## Project Understanding

**Project Name**: AI Digital Public Safety Platform (CyberRakshak AI)
**Core Purpose**: A proactive cyber-fraud detection platform. It analyzes suspicious text messages, transcripts, and images (via OCR) to detect potential scams (e.g., digital arrests, OTP scams, UPI scams) and alerts users.

### Architecture
- **Backend Framework**: FastAPI (Python 3.11+)
- **Database**: SQLite
- **Machine Learning**: Transformer-based text classification (`xlm-roberta-base`), with fallback deterministic guardrails.
- **Key Modules**: API, Prediction Services, Language Detector, Translator Hook, Guardrail, and Database.

### Core Logic & Flow
1. **Input**: User submits suspicious text or an image (which is converted to text via OCR).
2. **Preprocessing & Translation**: Text is normalized. Multilingual support is handled via a translation hook.
3. **Classification**: The ML model scores the text for risk.
4. **Guardrail Logic**:
   - `Confidence > 90%` -> **High Risk**
   - `Confidence 70% - 90%` -> **Needs Human Review** (Sent to a review queue)
   - `Confidence < 70%` -> **Safe**
5. **Database Storage**: Predictions are saved to `predictions` and `history`. Uncertain predictions are added to `review_queue`.

### API Endpoints (Integration Points for Frontend)
- `GET /` : Health check.
- `POST /classify` : Accepts JSON `{"text": "..."}` and returns risk level, confidence score, category, red flags, and recommendation.
- `POST /ocr` : Accepts multipart form data (image upload) and returns the extracted text along with the same classification payload as above.
- *(Planned)* `POST /chat` : Conversational interface for interacting with the AI about scams.
- *(Planned)* `POST /review` : For admin dashboard to review queued mid-confidence alerts.
- *(Planned)* `GET /history` : For fetching past scans by a user.

### Database Schema (What Data Exists)
- **predictions**: Stores the input text, language, risk, confidence score, category, red flags, recommendation, and whether it needs review.
- **review_queue**: Stores predictions that need human verification.
- **history**: Stores the history of actions for predictions.
- **logs**: Application event logs.

---

## AI Prompt for Generating UI Mockups / Code

*Copy and paste the prompt below into any AI UI generator (or you can ask me to start generating the frontend codebase right here!).*

```text
Act as a Senior Frontend Web Developer and Expert UI/UX Designer. I need you to generate a modern, premium, and highly responsive frontend web application for an "AI Digital Public Safety Platform" (CyberRakshak AI) that detects cyber-fraud and scams (like digital arrests, OTP scams, etc.).

### Tech Stack Required
- React (Next.js or Vite)
- Vanilla CSS (or Tailwind if you strongly prefer, but prioritize modern aesthetics like glassmorphism and smooth animations)
- Lucide Icons (or similar modern icon set)

### Design Aesthetics (CRITICAL)
The design must WOW the user. Use a dark mode theme with vibrant accent colors (e.g., deep purples, neon blues, and warning reds for high risk). Use smooth gradients, micro-animations on hover, and modern typography (e.g., Inter or Outfit). Do not use generic plain colors; use polished HSL color palettes and glassmorphic cards to make it feel state-of-the-art.

### Core Screens & Components to Generate

1. **Dashboard / Home Page (User View)**
   - **Hero Section**: A bold headline about AI fraud detection, with a sleek, animated input box prominently displayed.
   - **Text Analysis Tool**: A large textarea for users to paste suspicious SMS, emails, or chat transcripts. A glowing "Analyze Risk" button.
   - **OCR / Image Upload Tool**: A drag-and-drop zone to upload screenshots of suspicious messages.
   - **Result Card (Conditional Render)**: Once analyzed, display a visually striking card showing:
     - Risk Level indicator (Safe (Green), Needs Review (Yellow), High Risk (Red)).
     - Confidence Score (e.g., a circular progress bar showing 94%).
     - Scam Category (e.g., "Digital Arrest", "OTP Scam").
     - Red Flags (rendered as small pill tags, e.g., "Urgency", "Police Impersonation").
     - Actionable Recommendation.

2. **History Page**
   - A modern data table or list view showing a history of previously scanned texts/images with their risk statuses, dates, and snippets of the text.

3. **Admin Review Queue Dashboard**
   - A layout for moderators to review flagged content (confidence between 70% and 90%).
   - Needs to show the prediction details and have "Mark as Safe" and "Confirm Scam" buttons.

### Interaction & Logic Notes
- The frontend needs to eventually connect to a FastAPI backend containing endpoints like `POST /classify` (JSON payload) and `POST /ocr` (multipart form data).
- Ensure loading states (e.g., skeletons or a sleek spinner) are included when the "Analyze" button is clicked.

Please generate the complete UI code (HTML/JS/CSS or React components) for these screens, ensuring the styling is impeccable and production-ready.
```

---

### My Recommendation as your Senior Developer
I have the ability to generate images/mockups and also write the complete frontend application code right here in your workspace using React/Vite/Next.js. If you want me to set up the frontend project and build out these screens with premium designs (glassmorphism, dark mode, animations), just let me know which framework you prefer (e.g., "Let's build it with Vite + React"), and I'll get started!
