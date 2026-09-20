import React from 'react';

interface ToastProps {
  message: string;
  show: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, show }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 pointer-events-none transition-all duration-200 flex items-center gap-2.5 px-4 py-2.5 bg-[#1A1A1A] border border-[#0f6bf5] shadow-[0_0_24px_rgba(15,107,245,0.25)] rounded-[2px] font-mono text-[13px] text-white ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
      id="copy-toast"
    >
      <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
      <span>{message}</span>
    </div>
  );
};
