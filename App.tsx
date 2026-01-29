
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { ShareModal } from './components/ShareModal';

const App: React.FC = () => {
  const [code, setCode] = useState<string>(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>مشروع جديد - سليمان الحميد</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; }
        .card { background: rgba(255, 255, 255, 0.1); padding: 3rem; border-radius: 1.5rem; backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); text-align: center; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        h1 { margin-bottom: 1rem; font-size: 2.5rem; }
        p { opacity: 0.9; font-size: 1.1rem; }
    </style>
</head>
<body>
    <div class="card">
        <h1>مرحباً بك!</h1>
        <p>هذا التطبيق بإشراف المدرب: سليمان خالد الحميد</p>
        <p>ابدأ بكتابة كود HTML في المحرر الجانبي.</p>
    </div>
</body>
</html>`);

  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewOnly, setViewOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load code from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const isView = params.get('view') === 'true';
    
    if (isView) setViewOnly(true);

    if (id) {
      setIsLoading(true);
      fetch(`https://jsonblob.com/api/jsonBlob/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch');
          return res.json();
        })
        .then(data => {
          if (data && data.html) {
            setCode(data.html);
          }
        })
        .catch(err => {
          console.error('Error loading shared code:', err);
          alert('تعذر تحميل الكود المشارك، قد يكون الرابط منتهي الصلاحية.');
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleOpenInNewTab = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    
    try {
      // استخدام JSONBlob مع إعدادات تضمن الحصول على المعرف
      const response = await fetch('https://jsonblob.com/api/jsonBlob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          html: code,
          author: "سليمان خالد الحميد",
          timestamp: new Date().toISOString()
        })
      });
      
      if (!response.ok) throw new Error('Server responded with ' + response.status);

      // الحصول على المعرف من رأس الاستجابة (Location)
      const location = response.headers.get('Location');
      let blobId = '';
      
      if (location) {
        blobId = location.split('/').pop() || '';
      } else {
        // محاولة بديلة: قراءة محتوى الاستجابة إذا كان الرأس غير متاح
        const data = await response.json();
        blobId = data.id || '';
      }

      if (blobId) {
        const baseUrl = window.location.origin + window.location.pathname;
        const fullUrl = `${baseUrl}?id=${blobId}`;
        setShareUrl(fullUrl);
        setIsModalOpen(true);
      } else {
        throw new Error('Could not retrieve Blob ID');
      }
    } catch (err) {
      console.error('Sharing Error:', err);
      alert('عذراً، حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى لاحقاً.');
    } finally {
      setIsSharing(false);
    }
  };

  if (viewOnly) {
    return (
      <div className="h-screen w-screen overflow-hidden relative bg-white">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 font-medium">جاري تحميل الصفحة...</p>
          </div>
        ) : (
          <Preview code={code} />
        )}
        <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-blue-100 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">إشراف: <span className="font-bold text-blue-700">سليمان خالد الحميد</span></span>
          </div>
          <a 
            href={window.location.href.split('&view=true')[0]}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-blue-700 shadow-lg transition-all"
          >
            فتح في المحرر
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-sans">
      <Navbar 
        onOpenNewTab={handleOpenInNewTab} 
        onDownload={handleDownload} 
        onShare={handleShare}
        isSharing={isSharing}
      />
      
      <main className="flex flex-1 overflow-hidden flex-col md:flex-row">
        {/* Editor Section */}
        <div className="flex-1 border-b md:border-b-0 md:border-l border-gray-200">
          <Editor value={code} onChange={setCode} />
        </div>

        {/* Preview Section */}
        <div className="flex-1 bg-white relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 z-20 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-2"></div>
              <p className="text-sm text-gray-500">جاري المزامنة...</p>
            </div>
          )}
          <Preview code={code} />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-3 px-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold italic tracking-tighter">AI TOOLS</span>
          <span className="font-medium">بواسطة سليمان خالد الحميد</span>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <span>الحقوق محفوظة © {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-gray-500">مدرب معتمد في أدوات الذكاء الاصطناعي</span>
        </div>
      </footer>

      <ShareModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        shareUrl={shareUrl} 
      />
    </div>
  );
};

export default App;
