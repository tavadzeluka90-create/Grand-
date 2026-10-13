export type Gender = 'ქალი' | 'მამაკაცი';

export type RelationshipGoal = 'ქორწინება' | 'სერიოზული ურთიერთობა' | 'მეგობრობა' | 'ყველა';

export type FamilyStatus = 'ქვრივი' | 'განქორწინებული' | 'დასაოჯახებელი';

export type FontSizeScale = 'normal' | 'large' | 'extra-large';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate?: string;
  age: number;
  gender: Gender;
  country: string;
  city: string;
  region: string;
  photo: string;
  gallery: string[];
  bio: string;
  interests: string[];
  relationshipGoal: 'ქორწინება' | 'სერიოზული ურთიერთობა' | 'მეგობრობა';
  preferredAgeMin: number;
  preferredAgeMax: number;
  preferredLocation: string;
  languages: string[];
  lifestyle: string;
  familyStatus: FamilyStatus;
  isVerified: boolean;
  isOnline: boolean;
  lastActive: string;
  memberSince: string;
  isGoogleUser?: boolean;
  phone?: string;
}

export interface Story {
  id: string;
  names: string;
  ages: string;
  location: string;
  yearsTogether: string;
  image: string;
  story: string;
  quote: string;
}

export interface SafetyTip {
  id: string;
  title: string;
  summary: string;
  description: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export type ActiveTab = 'home' | 'members' | 'favorites' | 'messages' | 'stories' | 'safety' | 'profile';
