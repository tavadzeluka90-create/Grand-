import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MapPin, CheckCircle2, MessageSquare, ArrowRight, Trash2 } from 'lucide-react';
import { Member } from '../types';

export const FavoritesView: React.FC = () => {
  const { members, favorites, toggleFavorite, setSelectedMember, setActiveTab } = useApp();

  const favoriteMembers = members.filter((m) => favorites.includes(m.id));

  return (
    <div className="py-10 bg-[#FFF8EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Heart className="w-5 h-5 fill-current" />
            </span>
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2B23]">
                თქვენი რჩეულები
              </h1>
              <p className="text-sm text-[#7A6258] mt-1">
                აქ ინახება თქვენ მიერ შენახული პროფილები ({favoriteMembers.length})
              </p>
            </div>
          </div>
        </div>

        {favoriteMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteMembers.map((member: Member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo & remove */}
                <div className="relative aspect-4/4 overflow-hidden bg-[#FAF3E8]">
                  <img
                    src={member.photo}
                    alt={`${member.firstName} ${member.lastName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Remove button */}
                  <button
                    onClick={() => toggleFavorite(member.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-600 hover:bg-rose-50 shadow-md transition-colors"
                    title="რჩეულებიდან ამოშლა"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold">
                    {member.relationshipGoal}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#3B2B23] flex items-center gap-1.5">
                      {member.firstName}, {member.age}
                      {member.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                      )}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-[#7A6258] mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B58F42]" />
                      <span>{member.city}, {member.region}</span>
                    </div>

                    <p className="text-xs text-[#5C4940] mt-3 line-clamp-3 leading-relaxed">
                      {member.bio}
                    </p>
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
                      onClick={() => setSelectedMember(member)}
                      className="p-2 rounded-xl bg-[#D6AE65] text-white hover:bg-[#c49c53] transition-colors"
                      title="შეტყობინება"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Favorites */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EADBCE] max-w-lg mx-auto mt-8">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3B2B23] mb-2">
              რჩეულების სია ცარიელია
            </h3>
            <p className="text-sm text-[#7A6258] mb-6 leading-relaxed">
              დაათვალიერეთ წევრების კატალოგი და დააჭირეთ გულის ღილაკს მათ შესანახად.
            </p>
            <button
              onClick={() => setActiveTab('members')}
              className="py-3 px-6 rounded-2xl bg-[#D6AE65] hover:bg-[#c49c53] text-white font-bold text-sm transition-all inline-flex items-center gap-2"
            >
              <span>წევრების დათვალიერება</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
