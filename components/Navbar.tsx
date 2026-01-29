
import React from 'react';

interface NavbarProps {
  onOpenNewTab: () => void;
  onDownload: () => void;
  onShare: () => void;
  isSharing: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenNewTab, onDownload, onShare, isSharing }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="bg-blue-600 p-2 rounded-lg shadow-md hidden sm:block">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800">مشغل أكواد HTML</h1>
          <p className="text-[10px] sm:text-xs text-blue-600 font-medium leading-tight">إشراف: سليمان خالد الحميد</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 space-x-reverse overflow-x-auto">
        <button
          onClick={onShare}
          disabled={isSharing}
          className={`flex items-center px-3 py-2 ${isSharing ? 'bg-gray-100 text-gray-400' : 'bg-green-50 text-green-700 hover:bg-green-100'} rounded-lg transition-colors font-medium text-xs sm:text-sm border border-green-100`}
        >
          {isSharing ? (
            <svg className="animate-spin h-4 w-4 ml-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          )}
          {isSharing ? 'جاري الحفظ...' : 'حفظ ومشاركة'}
        </button>

        <button
          onClick={onOpenNewTab}
          className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-xs sm:text-sm border border-indigo-100"
        >
          <svg className="w-4 h-4 ml-2 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          تبويب جديد
        </button>
        
        <button
          onClick={onDownload}
          className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs sm:text-sm shadow-sm"
        >
          <svg className="w-4 h-4 ml-2 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          تنزيل
        </button>
      </div>
    </nav>
  );
};
