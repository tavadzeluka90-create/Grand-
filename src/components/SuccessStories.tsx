import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Quote, MapPin, Calendar, Sparkles } from 'lucide-react';
import { Story } from '../types';

export const SuccessStories: React.FC = () => {
  const { stories, setSelectedStory } = useApp();

  return (
    <section className="py-16 bg-[#FFF8EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs sm:text-sm font-bold mb-3 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-500" />
            <span>რეალური წარმატებული ისტორიები</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2B23] leading-tight">
            მათ იპოვეს ერთმანეთი GoldAge-ზე
          </h2>
          <p className="text-sm sm:text-base text-[#7A6258] mt-3 leading-relaxed">
            შთამაგონებელი მაგალითები იმისა, თუ როგორ იპოვეს ჩვენმა წევრებმა სიყვარული, მეგობრობა და ცხოვრების თანამგზავრი.
          </p>
        </div>

        {/* Married Couples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story: Story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              {/* Couple photo */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#FAF3E8]">
                <img
                  src={story.image}
                  alt={story.names}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Ribbon Badge */}
                <div className="absolute top-3 left-3 bg-[#2B1E19]/85 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-[#D6AE65]/60 flex items-center gap-1.5 shadow-md">
                  <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
                  <span className="text-[#F5E5CF]">ბედნიერი წყვილი</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif text-xl font-bold drop-shadow-sm flex items-center gap-2">
                    <span>{story.names}</span>
                    <Heart className="w-4 h-4 text-rose-500 fill-current inline shrink-0" />
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-white/90 drop-shadow-xs mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#D6AE65]" />
                      {story.location}
                    </span>
                    <span>•</span>
                    <span>{story.ages}</span>
                  </div>
                </div>
              </div>

              {/* Story summary & quote */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C6D2B] bg-[#FAF3E8] px-3 py-1 rounded-lg w-fit mb-3 border border-[#EADBCE]">
                    <Calendar className="w-3.5 h-3.5 text-[#B58F42]" />
                    <span>{story.yearsTogether}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5C4940] leading-relaxed line-clamp-3">
                    {story.story}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#F5ECE0]">
                  <div className="relative pl-6 italic text-xs text-[#7A6258] leading-relaxed">
                    <Quote className="w-4 h-4 text-[#D6AE65] absolute left-0 top-0 opacity-70" />
                    {story.quote}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStory(story);
                    }}
                    className="w-full mt-4 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FAF0E1] to-[#F5E5CF] hover:from-[#f3e5ce] hover:to-[#ebdac0] text-[#45352F] text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D6AE65]" />
                    <span>ქორწინების ისტორიის ნახვა</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
