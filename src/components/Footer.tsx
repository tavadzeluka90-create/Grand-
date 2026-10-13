import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Shield, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setSafetyModalOpen, openAuthModal, currentUser } = useApp();

  return (
    <footer className="bg-[#2B1E19] text-[#FAF3E8] border-t border-[#45352F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D6AE65] flex items-center justify-center text-[#2B1E19] font-serif text-xl font-bold">
                G
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-white">GoldAge</span>
            </div>
            <p className="text-xs text-[#C7B5AA] leading-relaxed">
              უფროსი თაობის გაცნობისა და ქორწინების თბილი და უსაფრთხო პლატფორმა საქართველოში. იპოვეთ სიყვარული, მეგობრობა და ცხოვრების თანამგზავრი.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#D6AE65] font-semibold">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>სიყვარულს ასაკი არ აქვს</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6AE65]">ნავიგაცია</h4>
            <ul className="space-y-2 text-xs text-[#C7B5AA]">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">
                  მთავარი გვერდი
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('members')} className="hover:text-white transition-colors">
                  გაცნობა და ძიება
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stories')} className="hover:text-white transition-colors">
                  სიყვარულის ისტორიები
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('favorites')} className="hover:text-white transition-colors">
                  შენახული რჩეულები
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6AE65]">უსაფრთხოება და წესები</h4>
            <ul className="space-y-2 text-xs text-[#C7B5AA]">
              <li>
                <button onClick={() => setSafetyModalOpen(true)} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#D6AE65]" />
                  <span>უსაფრთხოების რჩევები</span>
                </button>
              </li>
              <li>
                <button onClick={() => setSafetyModalOpen(true)} className="hover:text-white transition-colors">
                  ვერიფიკაციის პროცესი
                </button>
              </li>
              <li>
                <button onClick={() => setSafetyModalOpen(true)} className="hover:text-white transition-colors">
                  კონფიდენციალურობის პოლიტიკა
                </button>
              </li>
              {!currentUser && (
                <li>
                  <button onClick={() => openAuthModal('register')} className="hover:text-white transition-colors text-[#D6AE65] font-semibold">
                    რეგისტრაცია (უფასოდ)
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact / Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D6AE65]">კონტაქტი და დახმარება</h4>
            <p className="text-xs text-[#C7B5AA]">
              გაქვთ შეკითხვა ან გჭირდებათ დახმარება? ჩვენი მხარდაჭერის გუნდი ყოველთვის მზადაა:
            </p>
            <div className="space-y-2 text-xs text-[#C7B5AA]">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D6AE65]" />
                <span>+995 (32) 200-24-24</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D6AE65]" />
                <span>daxmareba@goldage.ge</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D6AE65]" />
                <span>თბილისი, საქართველო</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[#45352F] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C766B] gap-4">
          <p>© {new Date().getFullYear()} GoldAge.ge — ყველა უფლება დაცულია.</p>
          <p className="flex items-center gap-1">
            <span>შექმნილია პატივისცემითა და სიყვარულით საქართველოში</span>
            <span className="text-rose-500">❤️</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
