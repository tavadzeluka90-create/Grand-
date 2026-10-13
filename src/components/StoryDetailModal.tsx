import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, MapPin, Calendar, Quote, CheckCircle2 } from 'lucide-react';

export const StoryDetailModal: React.FC = () => {
  const { selectedStory, setSelectedStory, setActiveTab } = useApp();

  if (!selectedStory) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFF8EF] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#EADBCE] relative flex flex-col max-h-[90vh]">
        
        <button
          onClick={() => setSelectedStory(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#45352F] shadow-md transition-colors"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto">
          {/* Cover photo */}
          <div className="relative aspect-16/9 bg-[#FAF3E8]">
            <img
              src={selectedStory.image}
              alt={selectedStory.names}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B1E19]/90 text-[#F5E5CF] text-xs font-bold mb-2 border border-[#D6AE65]/60">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
                <span>ბედნიერი წყვილი • GoldAge</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">{selectedStory.names}</h2>
              <div className="flex items-center gap-2 text-xs text-white/90 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#D6AE65]" />
                  {selectedStory.location}
                </span>
                <span>•</span>
                <span>{selectedStory.ages}</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#EADBCE]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6D2B]">
                <Calendar className="w-4 h-4" />
                <span>{selectedStory.yearsTogether}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>დადასტურებული ისტორია</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EADBCE] shadow-xs">
              <h3 className="font-serif text-lg font-bold text-[#3B2B23] mb-3">
                მათი გაცნობის ამბავი
              </h3>
              <p className="text-sm text-[#5C4940] leading-relaxed whitespace-pre-line">
                {selectedStory.story}
              </p>
            </div>

            <div className="relative p-6 rounded-2xl bg-[#FAF0E1] border border-[#EADBCE]">
              <Quote className="w-6 h-6 text-[#D6AE65] opacity-60 mb-2" />
              <p className="font-serif italic text-base text-[#45352F] leading-relaxed">
                {selectedStory.quote}
              </p>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  setSelectedStory(null);
                  setActiveTab('members');
                }}
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] text-white font-bold text-sm shadow-md transition-all hover:scale-102"
              >
                იპოვეთ თქვენი თანამგზავრი GoldAge-ზე
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
