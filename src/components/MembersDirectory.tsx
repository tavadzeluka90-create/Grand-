import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MapPin, CheckCircle2, MessageSquare, Search, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { Member, Gender, RelationshipGoal, FamilyStatus } from '../types';
import { CITIES } from '../data/mockData';

interface MembersDirectoryProps {
  initialFilters?: {
    gender: Gender | 'ყველა';
    city: string;
    minAge: number;
    maxAge: number;
  };
}

export const MembersDirectory: React.FC<MembersDirectoryProps> = ({ initialFilters }) => {
  const { members, favorites, toggleFavorite, setSelectedMember } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<Gender | 'ყველა'>(initialFilters?.gender || 'ყველა');
  const [selectedCity, setSelectedCity] = useState<string>(initialFilters?.city || 'ყველა');
  const [minAge, setMinAge] = useState<number>(initialFilters?.minAge || 50);
  const [maxAge, setMaxAge] = useState<number>(initialFilters?.maxAge || 85);
  const [selectedGoal, setSelectedGoal] = useState<RelationshipGoal>('ყველა');
  const [selectedStatus, setSelectedStatus] = useState<FamilyStatus | 'ყველა'>('ყველა');
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedGender('ყველა');
    setSelectedCity('ყველა');
    setMinAge(50);
    setMaxAge(85);
    setSelectedGoal('ყველა');
    setSelectedStatus('ყველა');
    setOnlyOnline(false);
    setOnlyVerified(false);
  };

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
        const bio = member.bio.toLowerCase();
        const interests = member.interests.join(' ').toLowerCase();
        const city = member.city.toLowerCase();
        if (!fullName.includes(query) && !bio.includes(query) && !interests.includes(query) && !city.includes(query)) {
          return false;
        }
      }

      // Gender
      if (selectedGender !== 'ყველა' && member.gender !== selectedGender) {
        return false;
      }

      // City
      if (selectedCity !== 'ყველა' && member.city !== selectedCity) {
        return false;
      }

      // Age range
      if (member.age < minAge || member.age > maxAge) {
        return false;
      }

      // Relationship goal
      if (selectedGoal !== 'ყველა' && member.relationshipGoal !== selectedGoal) {
        return false;
      }

      // Family status
      if (selectedStatus !== 'ყველა' && member.familyStatus !== selectedStatus) {
        return false;
      }

      // Only online
      if (onlyOnline && !member.isOnline) {
        return false;
      }

      // Only verified
      if (onlyVerified && !member.isVerified) {
        return false;
      }

      return true;
    });
  }, [members, searchTerm, selectedGender, selectedCity, minAge, maxAge, selectedGoal, selectedStatus, onlyOnline, onlyVerified]);

  return (
    <div className="py-10 bg-[#FFF8EF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#B58F42]">ძიება და გაცნობა</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2B23] mt-1">
            იპოვეთ თქვენი თანამოაზრე
          </h1>
          <p className="text-sm text-[#7A6258] mt-1.5">
            გამოიყენეთ ფილტრები თქვენთვის სასურველი ასაკის, ქალაქისა და ინტერესების მიხედვით
          </p>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#EADBCE] shadow-md mb-8">
          
          {/* Main Search Bar & Quick Toggles */}
          <div className="flex flex-col md:flex-row gap-3 items-center">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-[#8C766B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="მოძებნეთ სახელით, ინტერესით, ქალაქით ან პროფესიით..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-2xl pl-11 pr-4 py-3 text-sm text-[#45352F] placeholder-[#8C766B] focus:outline-none focus:border-[#D6AE65]"
              />
            </div>

            {/* Gender Quick Buttons */}
            <div className="flex items-center gap-1.5 w-full md:w-auto bg-[#FFF8EF] p-1.5 rounded-2xl border border-[#EADBCE]">
              {(['ყველა', 'ქალი', 'მამაკაცი'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    selectedGender === g
                      ? 'bg-[#D6AE65] text-white shadow-xs'
                      : 'text-[#67544C] hover:text-[#45352F]'
                  }`}
                >
                  {g === 'ყველა' ? 'ყველა' : g === 'ქალი' ? 'ქალბატონები' : 'მამაკაცები'}
                </button>
              ))}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border text-sm font-bold transition-colors w-full md:w-auto ${
                filtersOpen
                  ? 'bg-[#45352F] text-white border-[#45352F]'
                  : 'bg-[#FAF3E8] border-[#EADBCE] text-[#45352F] hover:bg-[#F5ECE0]'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>დეტალური ფილტრი</span>
            </button>
          </div>

          {/* Expandable Advanced Filters */}
          {filtersOpen && (
            <div className="pt-6 mt-6 border-t border-[#F5ECE0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
              
              {/* City */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ქალაქი / რეგიონი</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Age Range */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">
                  ასაკობრივი დიაპაზონი: {minAge} - {maxAge} წელი
                </label>
                <div className="flex items-center gap-2">
                  <select
                    value={minAge}
                    onChange={(e) => setMinAge(Number(e.target.value))}
                    aria-label="მინიმალური ასაკის ფილტრი"
                    className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-2 py-2 text-xs text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    {[50, 55, 60, 65, 70].map((a) => (
                      <option key={a} value={a}>{a}-დან</option>
                    ))}
                  </select>
                  <select
                    value={maxAge}
                    onChange={(e) => setMaxAge(Number(e.target.value))}
                    aria-label="მაქსიმალური ასაკის ფილტრი"
                    className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-2 py-2 text-xs text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    {[60, 65, 70, 75, 80, 85].map((a) => (
                      <option key={a} value={a}>{a}-მდე</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Relationship Goal */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ურთიერთობის მიზანი</label>
                <select
                  value={selectedGoal}
                  onChange={(e) => setSelectedGoal(e.target.value as RelationshipGoal)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ყველა">ნებისმიერი</option>
                  <option value="ქორწინება">ქორწინება</option>
                  <option value="სერიოზული ურთიერთობა">სერიოზული ურთიერთობა</option>
                  <option value="მეგობრობა">მეგობრობა</option>
                </select>
              </div>

              {/* Family Status */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ოჯახური მდგომარეობა</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as FamilyStatus | 'ყველა')}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ყველა">ნებისმიერი</option>
                  <option value="ქვრივი">ქვრივი</option>
                  <option value="განქორწინებული">განქორწინებული</option>
                  <option value="დასაოჯახებელი">დასაოჯახებელი</option>
                </select>
              </div>

              {/* Checkboxes & Reset */}
              <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#F5ECE0]">
                <div className="flex flex-wrap items-center gap-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-[#45352F]">
                    <input
                      type="checkbox"
                      checked={onlyOnline}
                      onChange={(e) => setOnlyOnline(e.target.checked)}
                      className="w-4 h-4 rounded text-[#D6AE65] focus:ring-[#D6AE65]"
                    />
                    <span>მხოლოდ ონლაინში მყოფები</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs sm:text-sm font-semibold text-[#45352F]">
                    <input
                      type="checkbox"
                      checked={onlyVerified}
                      onChange={(e) => setOnlyVerified(e.target.checked)}
                      className="w-4 h-4 rounded text-[#D6AE65] focus:ring-[#D6AE65]"
                    />
                    <span>მხოლოდ ვერიფიცირებულები</span>
                  </label>
                </div>

                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#8C6D2B] hover:text-[#5C4940]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ფილტრების გასუფთავება</span>
                </button>
              </div>
            </div>
          )}

          {/* Results Bar */}
          <div className="mt-4 pt-4 border-t border-[#F5ECE0] flex items-center justify-between text-xs text-[#7A6258]">
            <span className="font-semibold">
              ნაპოვნია <strong className="text-[#3B2B23] font-bold">{filteredMembers.length}</strong> აქტიური წევრი
            </span>
            {(selectedGender !== 'ყველა' || selectedCity !== 'ყველა' || selectedGoal !== 'ყველა' || searchTerm) && (
              <span className="bg-[#FAF0E1] px-2.5 py-1 rounded-full text-[#8C6D2B] font-medium">
                ფილტრი გააქტიურებულია
              </span>
            )}
          </div>
        </div>

        {/* Member Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMembers.map((member: Member) => {
              const isFav = favorites.includes(member.id);
              return (
                <div
                  key={member.id}
                  className="bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  {/* Photo & Badges */}
                  <div className="relative aspect-4/4 overflow-hidden bg-[#FAF3E8]">
                    <img
                      src={member.photo}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Online badge */}
                    {member.isOnline ? (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[11px] font-bold text-emerald-700 border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        ონლაინშია
                      </span>
                    ) : (
                      <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-full text-[10px] text-[#7A6258] border border-[#EADBCE]">
                        {member.lastActive}
                      </span>
                    )}

                    {/* Favorite Heart Button */}
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

                    {/* Goal Pill */}
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-lg text-white text-[11px] font-semibold">
                      {member.relationshipGoal}
                    </div>
                  </div>

                  {/* Body Content */}
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
                        <span>{member.city}, {member.region}</span>
                      </div>

                      <p className="text-xs text-[#5C4940] mt-3 line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>

                      {/* Interest tags */}
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

                    {/* Action buttons */}
                    <div className="pt-4 mt-4 border-t border-[#F5ECE0] flex items-center gap-2">
                      <button
                        onClick={() => setSelectedMember(member)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#FAF0E1] hover:bg-[#F5E5CF] text-[#45352F] text-xs font-bold text-center transition-colors"
                      >
                        პროფილის ნახვა
                      </button>
                      <button
                        onClick={() => setSelectedMember(member)}
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
        ) : (
          /* Empty Search State */
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EADBCE] max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF3E8] text-[#D6AE65] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3B2B23] mb-2">
              შესაფერისი კანდიდატი ვერ მოიძებნა
            </h3>
            <p className="text-sm text-[#7A6258] mb-6 leading-relaxed">
              სცადეთ შეცვალოთ ასაკობრივი ზღვარი, ქალაქი ან მოხსნათ ზოგიერთი შეზღუდვა.
            </p>
            <button
              onClick={resetFilters}
              className="py-2.5 px-6 rounded-xl bg-[#D6AE65] hover:bg-[#c49c53] text-white font-bold text-sm transition-all"
            >
              ყველა ფილტრის გასუფთავება
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
