export interface ClassificationResponse {
  risk: 'safe' | 'needs_human_review' | 'high_risk';
  confidence: number;
  category: string;
  red_flags: string[];
  recommendation: string;
  language?: string;
  extracted_text?: string;
}

const API_BASE_URL = 'http://127.0.0.1:8000';

export const apiClient = {
  async classifyText(text: string): Promise<ClassificationResponse> {
    const response = await fetch(`${API_BASE_URL}/classify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  },

  async classifyImage(file: File): Promise<ClassificationResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/ocr`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }
};
