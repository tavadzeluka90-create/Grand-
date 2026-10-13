import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MapPin, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { Member } from '../types';

export const FeaturedMembers: React.FC = () => {
  const { members, favorites, toggleFavorite, setSelectedMember, setActiveTab } = useApp();

  // Show top verified members
  const featured = members.slice(0, 4);

  return (
    <section className="py-14 bg-[#FFF8EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#B58F42]">შემოწმებული წევრები</span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#3B2B23] mt-1">
              გაიცანით ჩვენი აქტიური წევრები
            </h2>
            <p className="text-sm text-[#7A6258] mt-2">
              ადამიანები, რომლებიც ეძებენ გულწრფელ თანამოსაუბრეს, მეგობრობასა და ოჯახურ ბედნიერებას
            </p>
          </div>

          <button
            onClick={() => setActiveTab('members')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#B58F42] hover:text-[#8C6D2B] transition-colors group self-start sm:self-auto"
          >
            <span>ყველა წევრის ნახვა ({members.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((member: Member) => {
            const isFav = favorites.includes(member.id);
            return (
              <div
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo & badges */}
                <div className="relative aspect-4/4 overflow-hidden bg-[#FAF3E8]">
                  <img
                    src={member.photo}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Online indicator */}
                  {member.isOnline && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      ონლაინშია
                    </span>
                  )}

                  {/* Favorite button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(member.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
                      isFav
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/85 text-[#7A6258] hover:text-rose-500 hover:bg-white'
                    }`}
                    aria-label="რჩეულებში დამატება"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  {/* Goal pill on bottom of photo */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold">
                    {member.relationshipGoal}
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-[#3B2B23] flex items-center gap-1.5">
                        {member.firstName}, {member.age}
                        {member.isVerified && (
                          <span title="ვერიფიცირებული პროფილი">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                          </span>
                        )}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#7A6258] mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B58F42]" />
                      <span>{member.city}, {member.country}</span>
                    </div>

                    <p className="text-xs text-[#5C4940] mt-3 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Interests tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {member.interests.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded-md bg-[#FAF3E8] text-[#7A6258] text-[10px] font-medium border border-[#EADBCE]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-[#F5ECE0] flex items-center gap-2">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#FAF0E1] hover:bg-[#F5E5CF] text-[#45352F] text-xs font-bold text-center transition-colors"
                    >
                      პროფილის ნახვა
                    </button>
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                      }}
                      className="p-2 rounded-xl bg-white border border-[#EADBCE] text-[#B58F42] hover:bg-[#FFF8EF] transition-colors"
                      title="შეტყობინების გაგზავნა"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
