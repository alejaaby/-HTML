
import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl }) => {
  if (!isOpen) return null;

  const editorUrl = shareUrl;
  const viewUrl = `${shareUrl}&view=true`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // يمكن استبدال التنبيه بـ Toast لاحقاً
    const btn = document.activeElement as HTMLButtonElement;
    const originalText = btn.innerHTML;
    btn.innerHTML = 'تم النسخ!';
    btn.classList.add('bg-green-600');
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove('bg-green-600');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-md transition-all">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 animate-in fade-in zoom-in slide-in-from-bottom-10 duration-500">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">تم حفظ الكود بنجاح!</h3>
            <p className="text-blue-600 text-sm font-medium">بإشراف سليمان خالد الحميد</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 text-right" dir="rtl">
          {/* Editor Link */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">رابط المحرر (للتعديل والمراجعة):</label>
            <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-blue-200 transition-all">
              <input 
                readOnly 
                value={editorUrl}
                className="flex-1 bg-transparent border-none px-3 py-2 text-xs font-mono text-left outline-none text-blue-800"
                dir="ltr"
              />
              <button 
                onClick={() => copyToClipboard(editorUrl)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm font-bold text-xs"
              >
                <span>نسخ</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>

          {/* View Link */}
          <div className="group">
            <label className="block text-sm font-bold text-gray-700 mb-2 mr-1">رابط العرض المباشر (كصفحة ويب):</label>
            <div className="flex items-center gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100 group-hover:border-green-200 transition-all">
              <input 
                readOnly 
                value={viewUrl}
                className="flex-1 bg-transparent border-none px-3 py-2 text-xs font-mono text-left outline-none text-green-800"
                dir="ltr"
              />
              <button 
                onClick={() => copyToClipboard(viewUrl)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-sm font-bold text-xs"
              >
                <span>نسخ</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">تطوير وإشراف</p>
          <p className="text-gray-900 font-black text-lg">سليمان خالد الحميد</p>
          <p className="text-blue-500 text-[10px]">مدرب أدوات الذكاء الاصطناعي</p>
        </div>
      </div>
    </div>
  );
};
