/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedMembers } from './components/FeaturedMembers';
import { WhyGoldAge } from './components/WhyGoldAge';
import { SuccessStories } from './components/SuccessStories';
import { HowItWorks } from './components/HowItWorks';
import { MembersDirectory } from './components/MembersDirectory';
import { FavoritesView } from './components/FavoritesView';
import { MessagesView } from './components/MessagesView';
import { ProfileView } from './components/ProfileView';
import { MemberDetailModal } from './components/MemberDetailModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { SafetyModal } from './components/SafetyModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { Gender } from './types';
import { ShieldCheck } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, fontSizeScale, safetyTips } = useApp();

  const [heroSearchFilters, setHeroSearchFilters] = useState<{
    gender: Gender | 'ყველა';
    city: string;
    minAge: number;
    maxAge: number;
  }>({
    gender: 'ქალი',
    city: 'ყველა',
    minAge: 50,
    maxAge: 85,
  });

  const fontScaleClass =
    fontSizeScale === 'extra-large'
      ? 'text-lg [&_h1]:text-5xl [&_h2]:text-4xl [&_p]:text-base'
      : fontSizeScale === 'large'
      ? 'text-base [&_h1]:text-4xl [&_h2]:text-3xl [&_p]:text-sm'
      : '';

  return (
    <div className={`min-h-screen flex flex-col bg-[#FFF8EF] text-[#45352F] ${fontScaleClass} transition-all duration-200`}>
      <Navbar />

      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero onSearchFilterChange={setHeroSearchFilters} />
            <FeaturedMembers />
            <WhyGoldAge />
            <SuccessStories />
            <HowItWorks />
          </>
        )}

        {activeTab === 'members' && (
          <MembersDirectory initialFilters={heroSearchFilters} />
        )}

        {activeTab === 'favorites' && <FavoritesView />}

        {activeTab === 'messages' && <MessagesView />}

        {activeTab === 'stories' && (
          <div className="py-10">
            <SuccessStories />
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="py-12 bg-[#FFF8EF]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <span className="text-xs uppercase font-bold tracking-widest text-[#B58F42]">კონფიდენციალურობა და ეთიკა</span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B2B23] mt-1">
                  უსაფრთხოების სახელმძღვანელო
                </h1>
                <p className="text-sm text-[#7A6258] mt-2">
                  როგორ დავიცვათ თავი და ვისიამოვნოთ მშვიდი ურთიერთობებით
                </p>
              </div>

              <div className="space-y-4">
                {safetyTips.map((tip) => (
                  <div key={tip.id} className="bg-white rounded-3xl p-6 border border-[#EADBCE] shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck className="w-5 h-5 text-[#D6AE65]" />
                      <h3 className="font-serif text-lg font-bold text-[#3B2B23]">{tip.title}</h3>
                    </div>
                    <p className="text-xs font-semibold text-[#8C6D2B] mb-2">{tip.summary}</p>
                    <p className="text-xs sm:text-sm text-[#5C4940] leading-relaxed">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && <ProfileView />}
      </main>

      <Footer />

      {/* Global Modals & Overlays */}
      <MemberDetailModal />
      <StoryDetailModal />
      <SafetyModal />
      <AuthModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
