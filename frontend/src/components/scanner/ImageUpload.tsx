import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, Loader2 } from 'lucide-react';
import { ScanBeam } from '../ui/ScanBeam';

interface ImageUploadProps {
  onAnalyzeImage: (file: File) => Promise<void>;
  isLoading: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onAnalyzeImage, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      onAnalyzeImage(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onAnalyzeImage(file);
    }
  };

  return (
    <div className="scan-container">
      {isLoading && <ScanBeam />}
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragActive ? 'var(--accent-cyan)' : 'var(--border-color)'}`,
          borderRadius: '16px',
          padding: '4.5rem 2rem',
          textAlign: 'center',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          background: dragActive ? 'rgba(6, 182, 212, 0.04)' : 'rgba(7, 11, 20, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.25rem',
          position: 'relative',
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          disabled={isLoading}
        />

        <div
          style={{
            padding: '1.25rem',
            borderRadius: '50%',
            backgroundColor: dragActive ? 'var(--accent-cyan-glow)' : 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: dragActive ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            display: 'flex',
            transition: 'all 0.3s',
          }}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={32} color="var(--accent-cyan)" />
          ) : fileName ? (
            <FileImage size={32} color="var(--accent-cyan)" />
          ) : (
            <UploadCloud size={32} />
          )}
        </div>

        <div>
          <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
            {isLoading ? 'Scanning OCR & Extracting...' : fileName ? fileName : 'Upload Chat Screenshot'}
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {isLoading
              ? 'AI is running OCR text recognition algorithms...'
              : 'Drag & Drop screenshot or browse local files. Supports PNG, JPG, WEBP.'}
          </p>
        </div>
      </div>
    </div>
  );
};
