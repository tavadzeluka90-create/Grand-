import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Lock, AlertTriangle, Users, PhoneCall } from 'lucide-react';

export const SafetyModal: React.FC = () => {
  const { safetyModalOpen, setSafetyModalOpen, safetyTips } = useApp();

  if (!safetyModalOpen) return null;

  const icons = [
    <Lock className="w-5 h-5 text-[#D6AE65]" />,
    <Users className="w-5 h-5 text-[#D6AE65]" />,
    <PhoneCall className="w-5 h-5 text-[#D6AE65]" />,
    <ShieldCheck className="w-5 h-5 text-[#D6AE65]" />,
    <AlertTriangle className="w-5 h-5 text-rose-500" />,
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFF8EF] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#EADBCE] relative flex flex-col max-h-[90vh]">
        
        <button
          onClick={() => setSafetyModalOpen(false)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#45352F] shadow-sm transition-colors"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#3B2B23]">
              უსაფრთხოების წესები და რეკომენდაციები
            </h2>
            <p className="text-xs text-[#7A6258] mt-1">
              თქვენი მშვიდობა და უსაფრთხოება GoldAge-ის უმთავრესი პრიორიტეტია
            </p>
          </div>

          <div className="space-y-4">
            {safetyTips.map((tip, idx) => (
              <div
                key={tip.id}
                className="bg-white rounded-2xl p-5 border border-[#EADBCE] shadow-xs flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FAF3E8] flex items-center justify-center shrink-0 border border-[#EADBCE]">
                  {icons[idx % icons.length]}
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#3B2B23] mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#8C6D2B] mb-1">
                    {tip.summary}
                  </p>
                  <p className="text-xs text-[#67544C] leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF0E1] p-5 rounded-2xl border border-[#EADBCE] text-xs text-[#5C4940] leading-relaxed">
            <strong>შენიშვნა:</strong> თუ ვინმე მოგთხოვთ ფულის გადარიცხვას, საბანკო მონაცემებს ან გამოიჩენს უხეშობას, დაუყოვნებლივ გამოიყენეთ ღილაკი „რეპორტი“ ან მოგვწერეთ ჩვენს დახმარების ჯგუფს.
          </div>

          <button
            onClick={() => setSafetyModalOpen(false)}
            className="w-full py-3 rounded-2xl bg-[#D6AE65] hover:bg-[#c49c53] text-white font-bold text-sm transition-colors"
          >
            გასაგებია, მადლობა
          </button>
        </div>

      </div>
    </div>
  );
};
