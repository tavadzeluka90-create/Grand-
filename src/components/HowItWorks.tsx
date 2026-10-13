import React from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, MessageCircleHeart, UsersRound, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { openAuthModal, currentUser } = useApp();

  const steps = [
    {
      num: '01',
      icon: <UserCheck className="w-6 h-6 text-[#D6AE65]" />,
      title: 'სწრაფი და დაცული რეგისტრაცია',
      desc: 'დარეგისტრირდით მარტივად ტელეფონის ნომრით ან ელ-ფოსტით (Google-ის გარეშე). პროცესი სრულიად უფასოა.',
    },
    {
      num: '02',
      icon: <UsersRound className="w-6 h-6 text-[#D6AE65]" />,
      title: 'ინტერესების მითითება და ძიება',
      desc: 'შეარჩიეთ თქვენთვის სასურველი პარამეტრები: ასაკი, ქალაქი, ინტერესები და დაათვალიერეთ შესაფერისი კანდიდატები.',
    },
    {
      num: '03',
      icon: <MessageCircleHeart className="w-6 h-6 text-[#D6AE65]" />,
      title: 'თბილი საუბარი და პირისპირ შეხვედრა',
      desc: 'გაუგზავნეთ ზრდილობიანი შეტყობინება, გაიცანით ერთმანეთი და მოაწყვეთ პირველი შეხვედრა მყუდრო საჯარო ადგილას.',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF3E8]/70 border-t border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B58F42]">ნაბიჯ-ნაბიჯ</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#3B2B23] mt-1">
            როგორ მუშაობს GoldAge?
          </h2>
          <p className="text-sm sm:text-base text-[#7A6258] mt-2">
            სულ სამი მარტივი ნაბიჯი გაშორებთ ახალ, სასიამოვნო ნაცნობობასა და ცხოვრების თანამგზავრთან
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-[#EADBCE] shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-serif text-3xl font-extrabold text-[#D6AE65]/30 group-hover:text-[#D6AE65] transition-colors">
                  {step.num}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#3B2B23] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#67544C] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        {!currentUser && (
          <div className="mt-14 bg-gradient-to-r from-[#45352F] to-[#2B1E19] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left z-10">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                მზად ხართ ახალი, ლამაზი ეტაპისთვის?
              </h3>
              <p className="text-sm text-[#DFCFBE] max-w-xl">
                დარეგისტრირდით დღესვე და იპოვეთ ადამიანი, ვისთან ერთადაც ყოველი დღე სითბოთი და სიხარულით აივსება.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto z-10">
              <button
                onClick={() => openAuthModal('register')}
                className="py-3.5 px-6 rounded-2xl bg-[#D6AE65] hover:bg-[#c49c53] text-[#2B1E19] font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102"
              >
                <span>უფასო რეგისტრაცია</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Decorative background aura */}
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#D6AE65]/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        )}

      </div>
    </section>
  );
};
