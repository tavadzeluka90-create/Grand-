import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
      <div className="bg-[#2B1E19] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#D6AE65]/40 flex items-center gap-3 text-xs sm:text-sm font-semibold max-w-sm">
        <CheckCircle2 className="w-5 h-5 text-[#D6AE65] shrink-0" />
        <span className="leading-snug">{toastMessage}</span>
      </div>
    </div>
  );
};
