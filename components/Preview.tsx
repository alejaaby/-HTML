
import React from 'react';

interface PreviewProps {
  code: string;
}

export const Preview: React.FC<PreviewProps> = ({ code }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-200 text-gray-500 text-xs font-medium uppercase tracking-wider">
        <span>المعاينة المباشرة</span>
      </div>
      <iframe
        title="Live Preview"
        srcDoc={code}
        className="flex-1 w-full border-none bg-white"
        sandbox="allow-scripts allow-forms allow-popups allow-modals"
      />
    </div>
  );
};
