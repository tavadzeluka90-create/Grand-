import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, User, MapPin, Phone, ShieldCheck, Heart, UserPlus, LogIn, Sparkles } from 'lucide-react';
import { Gender, RelationshipGoal, FamilyStatus } from '../types';
import { CITIES } from '../data/mockData';

import { APP_IMAGES } from '../data/assets';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    openAuthModal,
    loginWithGoogle,
    loginWithEmail,
    registerUser,
  } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [age, setAge] = useState<number>(62);
  const [gender, setGender] = useState<Gender>('ქალი');
  const [city, setCity] = useState('თბილისი');
  const [goal, setGoal] = useState<RelationshipGoal>('ქორწინება');
  const [familyStatus, setFamilyStatus] = useState<FamilyStatus>('ქვრივი');
  const [bio, setBio] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('avatar-1');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Optional Google accordion state
  const [showGoogleOption, setShowGoogleOption] = useState(false);

  if (!isAuthModalOpen) return null;

  const isRegister = authModalMode === 'register';

  const avatarOptions = [
    { id: 'avatar-elene', label: 'ელენე (52)', url: APP_IMAGES.portraitElene },
    { id: 'avatar-levan', label: 'ლევანი (55)', url: APP_IMAGES.portraitLevan },
    { id: 'avatar-keti', label: 'ქეთი (50)', url: APP_IMAGES.portraitKeti },
    { id: 'avatar-irakli', label: 'ირაკლი (58)', url: APP_IMAGES.portraitIrakli },
    { id: 'avatar-nino', label: 'ნინო (56)', url: APP_IMAGES.portraitNino },
    { id: 'avatar-1', label: 'თამარი', url: APP_IMAGES.portraitTamar },
    { id: 'avatar-2', label: 'გიორგი', url: APP_IMAGES.portraitGiorgi },
    { id: 'avatar-3', label: 'ნათელა', url: APP_IMAGES.portraitNatela },
    { id: 'avatar-4', label: 'რეზო', url: APP_IMAGES.portraitRezo },
    { id: 'avatar-5', label: 'ია', url: APP_IMAGES.portraitIa },
    { id: 'avatar-6', label: 'ნანა', url: APP_IMAGES.portraitNana },
    { id: 'avatar-7', label: 'დავითი', url: APP_IMAGES.portraitDavit },
  ];

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!firstName.trim()) {
      setErrorMessage('გთხოვთ მიუთითოთ სახელი.');
      return;
    }
    if (!phoneOrEmail.trim()) {
      setErrorMessage('გთხოვთ მიუთითოთ ტელეფონის ნომერი ან ელ-ფოსტა.');
      return;
    }

    const isPhone = !phoneOrEmail.includes('@');
    const chosenAvatar = avatarOptions.find((a) => a.id === selectedAvatar)?.url;

    const res = registerUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: isPhone ? phoneOrEmail.trim() : undefined,
      email: isPhone ? `${phoneOrEmail.trim().replace(/[^0-9]/g, '')}@goldage.ge` : phoneOrEmail.trim(),
      age,
      gender,
      city,
      relationshipGoal: goal === 'ყველა' ? 'ქორწინება' : goal,
      familyStatus,
      bio: bio.trim() || 'ვეძებ ცხოვრების ერთგულ და თბილ თანამგზავრს.',
      photo: chosenAvatar,
    });

    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('გთხოვთ მიუთითოთ ტელეფონის ნომერი ან ელ-ფოსტა.');
      return;
    }

    const res = loginWithEmail(identifier, password);
    if (!res.success && res.error) {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div className="bg-[#FFF8EF] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-[#EADBCE] relative flex flex-col max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#45352F] shadow-sm transition-colors"
          aria-label="დახურვა"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D6AE65] to-[#B58F42] flex items-center justify-center text-white mx-auto mb-3 shadow-md">
              <span className="font-serif text-2xl font-bold">G</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#3B2B23]">
              {isRegister ? 'რეგისტრაცია (Google-ის გარეშე)' : 'ანგარიშში შესვლა'}
            </h2>
            <p className="text-xs text-[#7A6258] mt-1">
              {isRegister
                ? 'დამოუკიდებელი და მარტივი რეგისტრაცია ტელეფონით ან ელ-ფოსტით'
                : 'შეიყვანეთ თქვენი ტელეფონი ან ელ-ფოსტა სისტემაში შესასვლელად'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#FAF3E8] p-1 rounded-2xl border border-[#EADBCE] mb-6">
            <button
              onClick={() => {
                openAuthModal('register');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                isRegister
                  ? 'bg-[#D6AE65] text-white shadow-xs'
                  : 'text-[#7A6258] hover:text-[#45352F]'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>რეგისტრაცია (პირდაპირი)</span>
            </button>
            <button
              onClick={() => {
                openAuthModal('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                !isRegister
                  ? 'bg-white text-[#45352F] shadow-xs'
                  : 'text-[#7A6258] hover:text-[#45352F]'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>შესვლა</span>
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {errorMessage}
            </div>
          )}

          {/* STANDALONE REGISTRATION FORM */}
          {isRegister ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              <div className="bg-[#FAF3E8] p-3 rounded-2xl border border-[#EADBCE] flex items-center gap-2 text-xs text-[#8C6D2B]">
                <ShieldCheck className="w-4 h-4 text-[#D6AE65] shrink-0" />
                <span>არ გჭირდებათ Google ანგარიში. რეგისტრაცია სრულიად უფასო და დამოუკიდებელია.</span>
              </div>

              {/* Name fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">თქვენი სახელი *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="მაგ: მარიამი"
                      className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">გვარი</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="მაგ: ბერიძე"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Contact: Phone or Email */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">
                  ტელეფონის ნომერი ან ელ-ფოსტა *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="მაგ: 599 12 34 56 ან mariam@mail.ge"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
                <span className="text-[10px] text-[#8C766B] mt-0.5 block">
                  შეგიძლიათ მიუთითოთ ჩვეულებრივი მობილურის ნომერი
                </span>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">პაროლი</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="შეიყვანეთ პაროლი (მაგ: 123456)"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              {/* Age & Gender */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">ასაკი (50+)</label>
                  <select
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    {Array.from({ length: 36 }, (_, i) => 50 + i).map((a) => (
                      <option key={a} value={a}>{a} წლის</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">სქესი</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    <option value="ქალი">ქალი</option>
                    <option value="მამაკაცი">მამაკაცი</option>
                  </select>
                </div>
              </div>

              {/* City & Family Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">ქალაქი</label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#EADBCE] rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                    >
                      {CITIES.filter((c) => c !== 'ყველა').map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#7A6258] mb-1">ოჯახური მდგომარეობა</label>
                  <select
                    value={familyStatus}
                    onChange={(e) => setFamilyStatus(e.target.value as FamilyStatus)}
                    className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  >
                    <option value="ქვრივი">ქვრივი</option>
                    <option value="განქორწინებული">განქორწინებული</option>
                    <option value="დასაოჯახებელი">დასაოჯახებელი</option>
                  </select>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">ურთიერთობის მიზანი</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as RelationshipGoal)}
                  className="w-full bg-white border border-[#EADBCE] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                >
                  <option value="ქორწინება">ქორწინება და თანაცხოვრება</option>
                  <option value="სერიოზული ურთიერთობა">სერიოზული ურთიერთობა</option>
                  <option value="მეგობრობა">მეგობრობა და საუბარი</option>
                </select>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">მოკლედ თქვენ შესახებ</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="რამდენიმე სიტყვა თქვენს პროფესიაზე ან ხასიათზე..."
                  className="w-full bg-white border border-[#EADBCE] rounded-xl p-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                />
              </div>

              {/* Select Profile Avatar */}
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1.5">აირჩიეთ პროფილის ავატარი</label>
                <div className="grid grid-cols-4 gap-2">
                  {avatarOptions.map((av) => (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setSelectedAvatar(av.id)}
                      className={`relative rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                        selectedAvatar === av.id
                          ? 'border-[#D6AE65] ring-2 ring-[#D6AE65]/40 scale-105'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm shadow-md transition-all mt-3 flex items-center justify-center gap-2 hover:scale-101"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>რეგისტრაციის დასრულება (Google-ის გარეშე)</span>
              </button>
            </form>
          ) : (
            /* STANDALONE LOGIN FORM */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">ტელეფონი ან ელ-ფოსტა *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="მაგ: 599 12 34 56 ან nana.chkheidze@goldage.ge"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#7A6258] mb-1">პაროლი</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C766B] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white border border-[#EADBCE] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-[#45352F] focus:outline-none focus:border-[#D6AE65]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#D6AE65] to-[#B58F42] hover:from-[#c89f54] hover:to-[#a37d32] text-white font-bold text-sm shadow-md transition-all mt-2"
              >
                შესვლა
              </button>

              {/* 1-Click Demo Logins */}
              <div className="mt-5 pt-4 border-t border-[#EADBCE]">
                <p className="text-[11px] text-center text-[#7A6258] font-semibold mb-2">
                  ან სცადეთ 1-წკაპიანი სატესტო პროფილი:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      loginWithEmail('nana.chkheidze@goldage.ge');
                    }}
                    className="py-2 px-2.5 rounded-xl bg-white border border-[#EADBCE] text-[11px] text-[#45352F] font-semibold hover:bg-[#FAF3E8]"
                  >
                    ქალბატონი ნანა (63)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      loginWithEmail('davit.beridze@goldage.ge');
                    }}
                    className="py-2 px-2.5 rounded-xl bg-white border border-[#EADBCE] text-[11px] text-[#45352F] font-semibold hover:bg-[#FAF3E8]"
                  >
                    ბატონი დავითი (66)
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* OPTIONAL GOOGLE ACCORDION (SECONDARY) */}
          <div className="mt-6 pt-4 border-t border-[#EADBCE]">
            <button
              type="button"
              onClick={() => setShowGoogleOption(!showGoogleOption)}
              className="text-[11px] text-[#8C766B] hover:text-[#45352F] flex items-center justify-center gap-1.5 w-full mx-auto font-medium"
            >
              <span>გსურთ Google ანგარიშით ავტორიზაცია? (არასავალდებულო)</span>
              <span>{showGoogleOption ? '▲' : '▼'}</span>
            </button>

            {showGoogleOption && (
              <div className="mt-3 p-3 bg-white rounded-2xl border border-[#EADBCE] animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => {
                    loginWithGoogle({
                      name: 'მომხმარებელი',
                      email: 'user@gmail.com',
                      picture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
                    });
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-300 text-xs font-semibold text-neutral-800 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Google-ით გაგრძელება</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
