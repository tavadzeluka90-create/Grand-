import React, { createContext, useContext, useState, useEffect } from 'react';
import { Member, Story, SafetyTip, Message, FontSizeScale, ActiveTab } from '../types';
import { INITIAL_MEMBERS, SUCCESS_STORIES, SAFETY_TIPS } from '../data/mockData';

interface GoogleUserPayload {
  name: string;
  email: string;
  picture?: string;
  sub?: string;
}

interface AppContextType {
  currentUser: Member | null;
  members: Member[];
  favorites: string[];
  blockedUsers: string[];
  messages: Message[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedMember: Member | null;
  setSelectedMember: (member: Member | null) => void;
  selectedStory: Story | null;
  setSelectedStory: (story: Story | null) => void;
  fontSizeScale: FontSizeScale;
  setFontSizeScale: (scale: FontSizeScale) => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  loginWithGoogle: (googleUser: GoogleUserPayload) => void;
  loginWithEmail: (email: string, password?: string) => { success: boolean; error?: string };
  registerUser: (userData: Partial<Member>) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (updatedData: Partial<Member>) => void;
  toggleFavorite: (memberId: string) => void;
  sendMessage: (receiverId: string, text: string) => void;
  blockUser: (memberId: string) => void;
  reportUser: (memberId: string, reason: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  safetyModalOpen: boolean;
  setSafetyModalOpen: (open: boolean) => void;
  stories: Story[];
  safetyTips: SafetyTip[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Member | null>(() => {
    try {
      const saved = localStorage.getItem('goldage_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [members, setMembers] = useState<Member[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_members');
      if (saved) {
        const parsed: Member[] = JSON.parse(saved);
        // Ensure any new initial members are merged in
        const existingIds = new Set(parsed.map((m) => m.id));
        const missingInitial = INITIAL_MEMBERS.filter((m) => !existingIds.has(m.id));
        return [...parsed, ...missingInitial];
      }
      return INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_favorites');
      return saved ? JSON.parse(saved) : ['user-1', 'user-4'];
    } catch {
      return ['user-1', 'user-4'];
    }
  });

  const [blockedUsers, setBlockedUsers] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_blocked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('goldage_messages');
      if (saved) return JSON.parse(saved);
      // default initial messages
      return [
        {
          id: 'msg-1',
          senderId: 'user-1',
          receiverId: 'me',
          text: 'მოგესალმებით! სასიამოვნოა თქვენი პროფილის ნახვა GoldAge-ზე. თუ გნებავთ, სიამოვნებით გავისაუბრებდი.',
          timestamp: '14:20',
          isRead: true,
        },
        {
          id: 'msg-2',
          senderId: 'user-2',
          receiverId: 'me',
          text: 'გამარჯობა! ბათუმიდან გწერთ. სასიამოვნო დღეს გისურვებთ!',
          timestamp: 'გუშინ',
          isRead: true,
        },
      ];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [fontSizeScale, setFontSizeScale] = useState<FontSizeScale>(() => {
    try {
      const saved = localStorage.getItem('goldage_font_scale');
      return (saved as FontSizeScale) || 'normal';
    } catch {
      return 'normal';
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('goldage_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('goldage_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('goldage_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('goldage_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('goldage_blocked', JSON.stringify(blockedUsers));
  }, [blockedUsers]);

  useEffect(() => {
    localStorage.setItem('goldage_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('goldage_font_scale', fontSizeScale);
  }, [fontSizeScale]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginWithGoogle = (googleUser: GoogleUserPayload) => {
    // Check if user already exists
    const existing = members.find((m) => m.email.toLowerCase() === googleUser.email.toLowerCase());

    if (existing) {
      const updatedUser = {
        ...existing,
        isGoogleUser: true,
        photo: googleUser.picture || existing.photo,
        isOnline: true,
      };
      setCurrentUser(updatedUser);
      setIsAuthModalOpen(false);
      showToast(`მოგესალმებით, ${updatedUser.firstName}! წარმატებით შეხვედით Google ანგარიშით.`);
      return;
    }

    // Split name
    const parts = (googleUser.name || 'მომხმარებელი').trim().split(' ');
    const firstName = parts[0] || 'მომხმარებელი';
    const lastName = parts.slice(1).join(' ') || '';

    const newMember: Member = {
      id: `google-${Date.now()}`,
      firstName,
      lastName,
      email: googleUser.email,
      age: 59,
      gender: 'ქალი',
      country: 'საქართველო',
      city: 'თბილისი',
      region: 'ვაკე-საბურთალო',
      photo: googleUser.picture || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      gallery: [googleUser.picture || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'],
      bio: 'გამარჯობა! ახლახან დავრეგისტრირდი GoldAge-ზე Google ანგარიშით. ვეძებ სანდო, კეთილგანწყობილ თანამოსაუბრეს და ცხოვრების თანამგზავრს.',
      interests: ['კლასიკური მუსიკა', 'თეატრი', 'მებაღეობა', 'წიგნები', 'მოგზაურობა'],
      relationshipGoal: 'ქორწინება',
      preferredAgeMin: 55,
      preferredAgeMax: 70,
      preferredLocation: 'საქართველო',
      languages: ['ქართული'],
      lifestyle: 'მშვიდი და თბილი გარემო, საღამოს სეირნობა',
      familyStatus: 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
      isGoogleUser: true,
    };

    setMembers((prev) => [newMember, ...prev]);
    setCurrentUser(newMember);
    setIsAuthModalOpen(false);
    showToast(`გილოცავთ! თქვენ წარმატებით დარეგისტრირდით Google ანგარიშით (${googleUser.email}).`);
  };

  const loginWithEmail = (identifier: string, _password?: string) => {
    const trimmed = identifier.trim().toLowerCase();
    const found = members.find(
      (m) =>
        m.email.toLowerCase() === trimmed ||
        (m.phone && m.phone.replace(/\s+/g, '') === trimmed.replace(/\s+/g, ''))
    );
    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      showToast(`მოგესალმებით, ${found.firstName}! სისტემაში წარმატებით შეხვედით.`);
      return { success: true };
    }
    return { success: false, error: 'მომხმარებელი ამ მონაცემებით ვერ მოიძებნა. გთხოვთ გაიაროთ რეგისტრაცია.' };
  };

  const registerUser = (userData: Partial<Member>) => {
    if (!userData.firstName) {
      return { success: false, error: 'გთხოვთ მიუთითოთ თქვენი სახელი.' };
    }
    if (!userData.email && !userData.phone) {
      return { success: false, error: 'გთხოვთ მიუთითოთ ტელეფონის ნომერი ან ელ-ფოსტა.' };
    }

    const generatedEmail = userData.email || (userData.phone ? `${userData.phone.replace(/[^0-9]/g, '')}@goldage.ge` : `user-${Date.now()}@goldage.ge`);

    const newMember: Member = {
      id: `user-${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName || '',
      email: generatedEmail,
      phone: userData.phone || '',
      age: userData.age || 60,
      gender: userData.gender || 'ქალი',
      country: 'საქართველო',
      city: userData.city || 'თბილისი',
      region: userData.region || 'მთაწმინდა',
      photo: userData.photo || (userData.gender === 'მამაკაცი' 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
        : 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'),
      gallery: [userData.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'],
      bio: userData.bio || 'გამარჯობა! დავრეგისტრირდი GoldAge-ზე. ვეძებ სანდო მეგობარსა და თანამგზავრს.',
      interests: userData.interests && userData.interests.length > 0 ? userData.interests : ['კითხვა', 'ბუნება', 'კულინარია'],
      relationshipGoal: userData.relationshipGoal || 'ქორწინება',
      preferredAgeMin: userData.preferredAgeMin || 55,
      preferredAgeMax: userData.preferredAgeMax || 75,
      preferredLocation: userData.preferredLocation || 'საქართველო',
      languages: userData.languages || ['ქართული'],
      lifestyle: userData.lifestyle || 'მშვიდი და ჯანსაღი ცხოვრების წესი',
      familyStatus: userData.familyStatus || 'ქვრივი',
      isVerified: true,
      isOnline: true,
      lastActive: 'ახლახან',
      memberSince: '2026',
      isGoogleUser: false,
    };

    setMembers((prev) => [newMember, ...prev]);
    setCurrentUser(newMember);
    setIsAuthModalOpen(false);
    showToast(`გილოცავთ, ${newMember.firstName}! თქვენი ანგარიში წარმატებით შეიქმნა Google-ის გარეშე.`);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('თქვენ გამოხვედით სისტემიდან.');
  };

  const updateProfile = (updatedData: Partial<Member>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    showToast('პროფილის მონაცემები წარმატებით განახლდა!');
  };

  const toggleFavorite = (memberId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(memberId);
      const next = isFav ? prev.filter((id) => id !== memberId) : [...prev, memberId];
      showToast(isFav ? 'ამოიშალა რჩეულებიდან' : 'დაემატა თქვენს რჩეულებში ❤️');
      return next;
    });
  };

  const sendMessage = (receiverId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser ? currentUser.id : 'me',
      receiverId,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    showToast('შეტყობინება წარმატებით გაიგზავნა! ✉️');

    // Simulate polite reply after 2.5 seconds if replying to mock profile
    const targetMember = members.find((m) => m.id === receiverId);
    if (targetMember && targetMember.id.startsWith('user-')) {
      setTimeout(() => {
        const replies = [
          `ძალიან სასიამოვნოა თქვენი წერილის მიღება! მადლობა თბილი სიტყვებისთვის.`,
          `გამარჯობა! სიამოვნებით გავაგრძელებ თქვენთან საუბარს.`,
          `მოგესალმებით! იმედია ლამაზი დღე გაქვთ.`,
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const replyMsg: Message = {
          id: `msg-reply-${Date.now()}`,
          senderId: receiverId,
          receiverId: currentUser ? currentUser.id : 'me',
          text: randomReply,
          timestamp: new Date().toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 2500);
    }
  };

  const blockUser = (memberId: string) => {
    setBlockedUsers((prev) => [...prev, memberId]);
    setFavorites((prev) => prev.filter((id) => id !== memberId));
    if (selectedMember?.id === memberId) {
      setSelectedMember(null);
    }
    showToast('მომხმარებელი დაბლოკილია.');
  };

  const reportUser = (memberId: string, _reason: string) => {
    showToast('მადლობა სიფხიზლისთვის. შეტყობინება გადაეცა GoldAge-ის ადმინისტრაციას.');
    blockUser(memberId);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        members: members.filter((m) => !blockedUsers.includes(m.id)),
        favorites,
        blockedUsers,
        messages,
        activeTab,
        setActiveTab,
        selectedMember,
        setSelectedMember,
        selectedStory,
        setSelectedStory,
        fontSizeScale,
        setFontSizeScale,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        loginWithGoogle,
        loginWithEmail,
        registerUser,
        logout,
        updateProfile,
        toggleFavorite,
        sendMessage,
        blockUser,
        reportUser,
        toastMessage,
        showToast,
        safetyModalOpen,
        setSafetyModalOpen,
        stories: SUCCESS_STORIES,
        safetyTips: SAFETY_TIPS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
