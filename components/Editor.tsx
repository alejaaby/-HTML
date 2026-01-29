
import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  return (
    <div className="h-full flex flex-col bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-400 text-xs font-mono uppercase tracking-wider">
        <span>محرر الكود</span>
        <button 
          onClick={() => navigator.clipboard.writeText(value)}
          className="hover:text-white transition-colors"
        >
          نسخ الكود
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        placeholder="الصق كود HTML هنا..."
        className="flex-1 w-full p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 leading-relaxed"
        dir="ltr"
      />
    </div>
  );
};
