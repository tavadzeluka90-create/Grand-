import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, MapPin, CheckCircle2, MessageSquare, ShieldAlert, Sparkles, UserCheck, Languages, Compass } from 'lucide-react';

export const MemberDetailModal: React.FC = () => {
  const {
    selectedMember,
    setSelectedMember,
    favorites,
    toggleFavorite,
    setActiveTab,
    blockUser,
    reportUser,
  } = useApp();

  if (!selectedMember) return null;

  const isFav = favorites.includes(selectedMember.id);

  const handleStartChat = () => {
    setSelectedMember(null);
    setActiveTab('messages');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div className="bg-[#FFF8EF] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#EADBCE] relative flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedMember(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#45352F] shadow-md transition-colors"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Top Profile Header Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Large Image with badges */}
            <div className="sm:col-span-5 relative aspect-square rounded-3xl overflow-hidden shadow-lg border-2 border-white bg-[#FAF3E8]">
              <img
                src={selectedMember.photo}
                alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                className="w-full h-full object-cover"
              />
              {selectedMember.isOnline && (
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  ონლაინშია
                </span>
              )}
            </div>

            {/* Basic Info */}
            <div className="sm:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2B23]">
                  {selectedMember.firstName} {selectedMember.lastName}
                </h2>
                {selectedMember.isVerified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ვერიფიცირებული
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-[#7A6258]">
                <span className="font-semibold text-[#3B2B23]">{selectedMember.age} წლის</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#B58F42]" />
                  {selectedMember.city}, {selectedMember.region}
                </span>
                <span>•</span>
                <span>{selectedMember.familyStatus}</span>
              </div>

              {/* Goal & Preferences */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-xl bg-[#FAF0E1] text-[#8C6D2B] text-xs font-bold border border-[#EADBCE]">
                  მიზანი: {selectedMember.relationshipGoal}
                </span>
                <span className="px-3 py-1 rounded-xl bg-white text-[#5C4940] text-xs font-semibold border border-[#EADBCE]">
                  სასურველი ასაკი: {selectedMember.preferredAgeMin} - {selectedMember.preferredAgeMax} წელი
                </span>
              </div>

              {/* Action buttons */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={handleStartChat}
                  className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>მიმოწერის დაწყება</span>
                </button>

                <button
                  onClick={() => toggleFavorite(selectedMember.id)}
                  className={`p-3 rounded-2xl border transition-all ${
                    isFav
                      ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                      : 'bg-white text-[#7A6258] border-[#EADBCE] hover:text-rose-500'
                  }`}
                  aria-label="რჩეულებში დამატება"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

            </div>

          </div>

          {/* Bio Section */}
          <div className="bg-white rounded-2xl p-5 border border-[#EADBCE]">
            <h3 className="font-serif text-base font-bold text-[#3B2B23] mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#D6AE65]" />
              <span>ჩემ შესახებ</span>
            </h3>
            <p className="text-sm text-[#5C4940] leading-relaxed whitespace-pre-line">
              {selectedMember.bio}
            </p>
          </div>

          {/* Interests & Lifestyle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white rounded-2xl p-5 border border-[#EADBCE]">
              <h3 className="font-serif text-sm font-bold text-[#3B2B23] mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D6AE65]" />
                <span>ინტერესები და ჰობი</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {selectedMember.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2.5 py-1 rounded-lg bg-[#FFF8EF] border border-[#EADBCE] text-xs font-medium text-[#45352F]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#EADBCE]">
              <h3 className="font-serif text-sm font-bold text-[#3B2B23] mb-3 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#D6AE65]" />
                <span>ცხოვრების სტილი და ენები</span>
              </h3>
              <p className="text-xs text-[#5C4940] mb-2">
                <strong>ყოველდღიურობა:</strong> {selectedMember.lifestyle}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#7A6258]">
                <Languages className="w-3.5 h-3.5 text-[#B58F42]" />
                <span>ენები: {selectedMember.languages.join(', ')}</span>
              </div>
            </div>

          </div>

          {/* Safety & Moderation Bar */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#8C766B] border-t border-[#EADBCE]">
            <span>წევრია {selectedMember.memberSince} წლიდან</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => reportUser(selectedMember.id, 'საეჭვო პროფილი')}
                className="hover:text-red-600 flex items-center gap-1 text-[11px]"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>რეპორტი</span>
              </button>
              <button
                onClick={() => blockUser(selectedMember.id)}
                className="hover:text-red-600 text-[11px]"
              >
                დაბლოკვა
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
