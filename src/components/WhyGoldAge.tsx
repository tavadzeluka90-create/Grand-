import React from 'react';
import { ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export const WhyGoldAge: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#D6AE65]" />,
      title: 'ვერიფიცირებული და სანდო',
      desc: 'თითოეული პროფილი გადის ხელით გადამოწმებას, რათა თავიდან ავიცილოთ ფეიკ-ანგარიშები და უზრუნველვყოთ მშვიდი გარემო.',
    },
    {
      icon: <Eye className="w-7 h-7 text-[#D6AE65]" />,
      title: 'მორგებულია 50+ ასაკისთვის',
      desc: 'დიდი და მკაფიო შრიფტები, გააზრებული ღილაკები და სიმარტივე. არანაირი დამღლელი სარეკლამო ხმაური.',
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-[#D6AE65]" />,
      title: 'სერიოზული მიზნები და ქორწინება',
      desc: 'აქ ადამიანები რეგისტრირდებიან არა დროის გასაყვანად, არამედ გულწრფელი მეგობრობის, თანადგომისა და ქორწინებისთვის.',
    },
    {
      icon: <Sparkles className="w-7 h-7 text-[#D6AE65]" />,
      title: 'მარტივი და დამოუკიდებელი რეგისტრაცია',
      desc: 'სწრაფი რეგისტრაცია ტელეფონის ნომრით ან ელ-ფოსტით Google-ის გარეშე. თქვენი პირადი მონაცემები საიმედოდაა დაცული.',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF3E8]/60 border-y border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B58F42]">ღირებულებები</span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#3B2B23] mt-1">
            რატომ ირჩევენ GoldAge-ს?
          </h2>
          <p className="text-sm sm:text-base text-[#7A6258] mt-2">
            პლატფორმა შექმნილია პატივისცემით, ყურადღებითა და ქართული სტუმართმოყვარეობის სულისკვეთებით
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EADBCE] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] flex items-center justify-center mb-5 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#3B2B23] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#67544C] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
