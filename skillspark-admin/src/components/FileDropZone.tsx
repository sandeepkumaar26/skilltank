import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props { 
  onFilesAdded(files: File[]): void;
  acceptedTypes?: 'video' | 'image' | 'document' | 'presentation' | 'all';
  maxSize?: number;
  multiple?: boolean;
}

const getAcceptConfig = (type: string) => {
  switch (type) {
    case 'video':
      return { 
        accept: { 'video/*': ['.mp4', '.mov', '.avi', '.webm', '.mkv'] },
        description: 'Videos (MP4, MOV, AVI, WebM, MKV)'
      };
    case 'image':
      return { 
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'] },
        description: 'Images (JPG, PNG, GIF, WebP, SVG)'
      };
    case 'document':
      return { 
        accept: {
          'application/pdf': ['.pdf'],
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          'text/plain': ['.txt']
        },
        description: 'Documents (PDF, DOC, DOCX, TXT)'
      };
    case 'presentation':
      return { 
        accept: {
          'application/vnd.ms-powerpoint': ['.ppt'],
          'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
        },
        description: 'Presentations (PPT, PPTX)'
      };
    case 'all':
    default:
      return { 
        accept: {
          'video/*': ['.mp4', '.mov', '.avi', '.webm'],
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          'application/pdf': ['.pdf'],
          'application/vnd.ms-powerpoint': ['.ppt'],
          'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
          'application/msword': ['.doc'],
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          'text/plain': ['.txt']
        },
        description: 'Videos, Images, Documents, Presentations'
      };
  }
};

export const FileDropZone: React.FC<Props> = ({ 
  onFilesAdded, 
  acceptedTypes = 'all',
  maxSize = 100 * 1024 * 1024, // 100MB default
  multiple = false
}) => {
  const [error, setError] = useState<string | null>(null);
  
  const acceptConfig = getAcceptConfig(acceptedTypes);
  const { description, accept } = acceptConfig;
  
  const onDrop = useCallback((accepted: File[], rejected: any[]) => {
    if (rejected.length) {
      const reasons = rejected.map((r: any) => r.errors.map((e: any) => e.message).join(', ')).join('; ');
      setError(`Some files were rejected: ${reasons}`);
    } else { 
      setError(null); 
      onFilesAdded(accepted); 
    }
  }, [onFilesAdded]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, 
    accept,
    maxSize,
    multiple
  });
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <div 
      {...getRootProps()} 
      className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="text-center">
        <div className="mb-4">
          {acceptedTypes === 'video' && <span className="text-4xl">🎥</span>}
          {acceptedTypes === 'image' && <span className="text-4xl">🖼️</span>}
          {acceptedTypes === 'document' && <span className="text-4xl">📄</span>}
          {acceptedTypes === 'presentation' && <span className="text-4xl">📊</span>}
          {acceptedTypes === 'all' && <span className="text-4xl">📁</span>}
        </div>
        <p className="text-lg font-medium text-gray-700">
          {isDragActive ? 'Drop here…' : `Drag & drop ${multiple ? 'files' : 'file'} or click to select`}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Max size: {formatFileSize(maxSize)} {multiple ? '(per file)' : ''}
        </p>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </div>
    </div>
  );
};