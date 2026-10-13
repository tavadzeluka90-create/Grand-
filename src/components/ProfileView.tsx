import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, MapPin, Heart, Sparkles, CheckCircle2, Save, LogOut } from 'lucide-react';
import { CITIES } from '../data/mockData';
import { RelationshipGoal, FamilyStatus } from '../types';

export const ProfileView: React.FC = () => {
  const { currentUser, updateProfile, openAuthModal, logout } = useApp();

  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [age, setAge] = useState<number>(currentUser?.age || 60);
  const [city, setCity] = useState(currentUser?.city || 'თბილისი');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [goal, setGoal] = useState<RelationshipGoal>(currentUser?.relationshipGoal || 'ქორწინება');
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>(currentUser?.familyStatus || 'ქვრივი');
  const [lifestyle, setLifestyle] = useState(currentUser?.lifestyle || '');
  const [preferredAgeMin, setPreferredAgeMin] = useState(currentUser?.preferredAgeMin || 55);
  const [preferredAgeMax, setPreferredAgeMax] = useState(currentUser?.preferredAgeMax || 75);
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState<string[]>(currentUser?.interests || ['კითხვა', 'ბუნება']);

  if (!currentUser) {
    return (
      <div className="py-16 bg-[#FFF8EF] min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#EADBCE] max-w-md w-full shadow-lg">
          <div className="w-16 h-16 rounded-full bg-[#FAF3E8] text-[#D6AE65] flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#3B2B23] mb-2">
            ავტორიზაციაა საჭირო
          </h2>
          <p className="text-sm text-[#7A6258] mb-6">
            თქვენი პროფილის სანახავად და რედაქტირებისთვის გთხოვთ გაიაროთ რეგისტრაცია ან შესვლა.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] text-white font-bold text-sm shadow-md transition-all hover:scale-102"
            >
              Google-ით ან ელ-ფოსტით შესვლა
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full py-3 rounded-2xl bg-[#FFF8EF] border border-[#EADBCE] text-[#45352F] font-bold text-sm hover:bg-[#FAF3E8]"
            >
              ახალი ანგარიშის შექმნა
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      firstName,
      lastName,
      age,
      city,
      bio,
      relationshipGoal: goal === 'ყველა' ? 'ქორწინება' : goal,
      familyStatus,
      lifestyle,
      preferredAgeMin,
      preferredAgeMax,
      interests,
    });
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (item: string) => {
    setInterests(interests.filter((i) => i !== item));
  };

  return (
    <div className="py-10 bg-[#FFF8EF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-md mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={currentUser.photo}
                alt={currentUser.firstName}
                className="w-28 h-28 rounded-full object-cover border-4 border-[#FAF3E8] shadow-md"
              />
              {currentUser.isVerified && (
                <div className="absolute bottom-1 right-1 bg-white p-1 rounded-full shadow-xs">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
              )}
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2B23]">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                {currentUser.isGoogleUser && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Google-ით ვერიფიცირებული
                  </span>
                )}
              </div>

              <p className="text-xs text-[#7A6258] mt-1">{currentUser.email}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#5C4940] mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B58F42]" />
                  {currentUser.city}, {currentUser.country}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  {currentUser.relationshipGoal}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="py-2 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>გასვლა</span>
            </button>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADBCE] shadow-md">
          <div className="mb-6 pb-4 border-b border-[#F5ECE0]">
            <h2 className="font-serif text-xl font-bold text-[#3B2B23]">
              პროფილის რედაქტირება
            </h2>
            <p className="text-xs text-[#7A6258] mt-1">
              განაახლეთ თქვენი მონაცემები, რათა სხვა წევრებმა უკეთ გაგიცნონ
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">სახელი</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">გვარი</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ასაკი (წელი)</label>
                <select
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  {Array.from({ length: 36 }, (_, i) => 50 + i).map((a) => (
                    <option key={a} value={a}>{a} წლის</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ქალაქი</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  {CITIES.filter((c) => c !== 'ყველა').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ოჯახური მდგომარეობა</label>
                <select
                  value={familyStatus}
                  onChange={(e) => setFamilyStatus(e.target.value as FamilyStatus)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ქვრივი">ქვრივი</option>
                  <option value="განქორწინებული">განქორწინებული</option>
                  <option value="დასაოჯახებელი">დასაოჯახებელი</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ჩემ შესახებ (ავტობიოგრაფია)</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="მოგვიყევით თქვენს პროფესიაზე, ინტერესებსა და იმ თვისებებზე, რასაც პარტნიორში აფასებთ..."
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl p-3 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
              />
            </div>

            {/* Interests Tagging */}
            <div>
              <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ინტერესები და გატაცებები</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="ახალი ჰობი (მაგ: თეატრი, მებაღეობა, ჭადრაკი)..."
                  className="flex-1 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
                <button
                  type="button"
                  onClick={addInterest}
                  className="py-2 px-4 rounded-xl bg-[#FAF0E1] border border-[#EADBCE] text-xs font-bold text-[#45352F] hover:bg-[#F5ECE0]"
                >
                  დამატება
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {interests.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FAF3E8] border border-[#EADBCE] text-xs font-medium text-[#45352F]"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeInterest(item)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ურთიერთობის მიზანი</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as RelationshipGoal)}
                  className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ქორწინება">ქორწინება და თანაცხოვრება</option>
                  <option value="სერიოზული ურთიერთობა">სერიოზული ურთიერთობა</option>
                  <option value="მეგობრობა">მეგობრობა და საუბარი</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">სასურველი ასაკობრივი დიაპაზონი</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={preferredAgeMin}
                    onChange={(e) => setPreferredAgeMin(Number(e.target.value))}
                    className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F]"
                    min={50}
                    max={90}
                  />
                  <span className="text-xs text-[#8C766B]">-დან</span>
                  <input
                    type="number"
                    value={preferredAgeMax}
                    onChange={(e) => setPreferredAgeMax(Number(e.target.value))}
                    className="w-1/2 bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2 text-sm text-[#45352F]"
                    min={50}
                    max={90}
                  />
                  <span className="text-xs text-[#8C766B]">-მდე</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#7A6258] mb-1.5">ყოველდღიური ცხოვრების სტილი</label>
              <input
                type="text"
                value={lifestyle}
                onChange={(e) => setLifestyle(e.target.value)}
                placeholder="მაგ: დილის სეირნობა, მებაღეობა, საღამოს კითხვა..."
                className="w-full bg-[#FFF8EF] border border-[#EADBCE] rounded-xl px-3 py-2.5 text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
              />
            </div>

            <div className="pt-4 border-t border-[#F5ECE0] flex justify-end">
              <button
                type="submit"
                className="py-3 px-8 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>მონაცემების შენახვა</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
