import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../data/assets';
import { CITIES } from '../data/mockData';
import { Search, ShieldCheck, Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Gender } from '../types';

interface HeroProps {
  onSearchFilterChange?: (filters: { gender: Gender | 'ყველა'; city: string; minAge: number; maxAge: number }) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearchFilterChange }) => {
  const { setActiveTab, openAuthModal, currentUser } = useApp();

  const [gender, setGender] = useState<Gender | 'ყველა'>('ქალი');
  const [city, setCity] = useState<string>('ყველა');
  const [minAge, setMinAge] = useState<number>(55);
  const [maxAge, setMaxAge] = useState<number>(75);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchFilterChange) {
      onSearchFilterChange({ gender, city, minAge, maxAge });
    }
    setActiveTab('members');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-radial from-[#FFF3E0]/70 via-[#FFF8EF] to-[#FFF8EF]">
      {/* Decorative warm aura blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#D6AE65]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#E8B7B7]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Search Form */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E1] border border-[#EADBCE] text-[#8C6D2B] text-xs sm:text-sm font-semibold shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D6AE65]" />
              <span>თბილი, სანდო და უსაფრთხო გარემო 50+ ასაკისთვის</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#3B2B23] tracking-tight leading-[1.15]">
              სიყვარულსა და მეგობრობას <span className="text-[#B58F42] underline decoration-[#D6AE65]/40 underline-offset-8">ასაკი არ აქვს</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#67544C] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              GoldAge შექმნილია მათთვის, ვინც აფასებს გულწრფელობას, ოჯახურ სითბოსა და ღირსეულ ურთიერთობებს. 
              იპოვეთ ადამიანი, ვისთანაც გაიზიარებთ ცხოვრების ოქროს წლებს.
            </p>

            {/* Quick Interactive Search Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl shadow-[#45352F]/5 border border-[#EADBCE]">
              <div className="flex items-center gap-2 mb-4 text-xs sm:text-sm font-bold text-[#45352F] uppercase tracking-wider">
                <Search className="w-4 h-4 text-[#D6AE65]" />
                <span>სწრაფი ძიება პარტნიორისთვის:</span>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Looking For */}
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-[#7A6258] mb-1.5">ვეძებ</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as Gender | 'ყველა')}
                      aria-label="სქესის არჩევა"
                      className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm font-medium text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                    >
                      <option value="ქალი">ქალბატონს</option>
                      <option value="მამაკაცი">მამაკაცს</option>
                      <option value="ყველა">ორივეს</option>
                    </select>
                  </div>

                  {/* Age Range */}
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-[#7A6258] mb-1.5">
                      ასაკი: {minAge} - {maxAge} წელი
                    </label>
                    <div className="flex items-center gap-2">
                      <select
                        value={minAge}
                        onChange={(e) => setMinAge(Number(e.target.value))}
                        aria-label="მინიმალური ასაკი"
                        className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-2.5 py-2.5 text-sm font-medium text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                      >
                        {[50, 55, 60, 65, 70].map((a) => (
                          <option key={a} value={a}>{a} დან</option>
                        ))}
                      </select>
                      <select
                        value={maxAge}
                        onChange={(e) => setMaxAge(Number(e.target.value))}
                        aria-label="მაქსიმალური ასაკი"
                        className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-2.5 py-2.5 text-sm font-medium text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                      >
                        {[60, 65, 70, 75, 80, 85].map((a) => (
                          <option key={a} value={a}>{a} მდე</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="text-left">
                    <label className="block text-xs font-semibold text-[#7A6258] mb-1.5">ქალაქი / რეგიონი</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      aria-label="ქალაქის არჩევა"
                      className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm font-medium text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                    >
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm sm:text-base shadow-md shadow-[#D6AE65]/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>პროფილების დათვალიერება</span>
                  </button>

                  {!currentUser && (
                    <button
                      type="button"
                      onClick={() => openAuthModal('register')}
                      className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-[#FFF8EF] hover:bg-[#F5ECE0] text-[#45352F] font-bold text-sm border border-[#EADBCE] transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#D6AE65]" />
                      <span>რეგისტრაცია (Google-ის გარეშე)</span>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-left">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/60 border border-[#EADBCE]/60">
                <ShieldCheck className="w-5 h-5 text-[#B58F42] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#45352F]">100% შემოწმებული</p>
                  <p className="text-[10px] text-[#7A6258]">ვერიფიცირებული ანგარიშები</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/60 border border-[#EADBCE]/60">
                <Heart className="w-5 h-5 text-rose-500 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#45352F]">სერიოზული მიზნები</p>
                  <p className="text-[10px] text-[#7A6258]">ქორწინება და თანაცხოვრება</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/60 border border-[#EADBCE]/60">
                <Users className="w-5 h-5 text-[#8C6D2B] shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[#45352F]">2,400+ წევრი</p>
                  <p className="text-[10px] text-[#7A6258]">მთელი საქართველოს მასშტაბით</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white shadow-[#45352F]/15 group">
                <img
                  src={APP_IMAGES.heroCouple}
                  alt="GoldAge ბედნიერი წყვილი ძველ თბილისში"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom caption badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#EADBCE]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-base text-[#45352F]">ნანა & დავითი</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-xs text-[#7A6258]">დაქორწინდნენ GoldAge-ის მეშვეობით • თბილისი / ბათუმი</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1">
                      ❤️ 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating pill badge */}
              <div className="absolute -top-3 -right-3 bg-white px-3.5 py-2 rounded-2xl shadow-lg border border-[#EADBCE] flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-[#45352F]">ახლა ონლაინშია: 184 ადამიანი</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
