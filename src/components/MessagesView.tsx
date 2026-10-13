import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Send, MapPin, User, Sparkles, CheckCheck } from 'lucide-react';
import { Member } from '../types';

export const MessagesView: React.FC = () => {
  const { members, messages, sendMessage, setSelectedMember } = useApp();

  // Active contact state (default to user-1 if available)
  const [activeContactId, setActiveContactId] = useState<string>(() => {
    return members.length > 0 ? members[0].id : '';
  });
  const [inputText, setInputText] = useState('');

  const activeContact = members.find((m) => m.id === activeContactId) || members[0];

  // Filter messages between current user ('me' or currentUser.id) and active contact
  const conversationMessages = messages.filter(
    (m) =>
      (m.senderId === activeContactId && (m.receiverId === 'me' || m.receiverId.startsWith('google-') || m.receiverId.startsWith('user-'))) ||
      ((m.senderId === 'me' || m.senderId.startsWith('google-') || m.senderId.startsWith('user-')) && m.receiverId === activeContactId)
  );

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeContact) return;
    sendMessage(activeContact.id, inputText);
    setInputText('');
  };

  const handleQuickGreeting = (greeting: string) => {
    if (!activeContact) return;
    sendMessage(activeContact.id, greeting);
  };

  const quickGreetings = [
    'მოგესალმებით! სასიამოვნო დღეს გისურვებთ ☀️',
    'დილა მშვიდობისა! ☕',
    'ძალიან გამიხარდა თქვენი პროფილის ნახვა 🌸',
    'თუ გცალიათ, სიამოვნებით გავისაუბრებდი 🕊️',
  ];

  return (
    <div className="py-8 bg-[#FFF8EF] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2B23]">
            შეტყობინებები და მიმოწერა
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6258] mt-1">
            თბილი და გულწრფელი საუბრები თქვენს თანამოსაუბრეებთან
          </p>
        </div>

        {/* Chat Layout Grid */}
        <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Contact List */}
          <div className="md:col-span-4 lg:col-span-4 border-r border-[#EADBCE] bg-[#FAF3E8]/40 flex flex-col">
            <div className="p-4 border-b border-[#EADBCE] bg-white">
              <span className="text-xs uppercase font-bold text-[#8C6D2B] tracking-wider">
                კონტაქტები ({members.length})
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#F5ECE0]">
              {members.map((member: Member) => {
                const isSelected = member.id === activeContact?.id;
                // find last message
                const lastMsg = messages
                  .filter((m) => m.senderId === member.id || m.receiverId === member.id)
                  .slice(-1)[0];

                return (
                  <button
                    key={member.id}
                    onClick={() => setActiveContactId(member.id)}
                    className={`w-full p-4 flex items-center gap-3 text-left transition-colors ${
                      isSelected
                        ? 'bg-white border-l-4 border-l-[#D6AE65] shadow-xs'
                        : 'hover:bg-[#FAF3E8]'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={member.photo}
                        alt={member.firstName}
                        className="w-12 h-12 rounded-full object-cover border border-[#EADBCE]"
                      />
                      {member.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#3B2B23] truncate">
                          {member.firstName} {member.lastName}
                        </span>
                        <span className="text-[10px] text-[#8C766B] shrink-0">
                          {member.age} წ.
                        </span>
                      </div>
                      <p className="text-xs text-[#7A6258] truncate mt-0.5">
                        {lastMsg ? lastMsg.text : `${member.city} • ${member.relationshipGoal}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Conversation */}
          <div className="md:col-span-8 lg:col-span-8 flex flex-col bg-white">
            
            {activeContact ? (
              <>
                {/* Active Chat Header */}
                <div className="p-4 border-b border-[#EADBCE] bg-[#FFF8EF]/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeContact.photo}
                      alt={activeContact.firstName}
                      className="w-11 h-11 rounded-full object-cover border border-[#D6AE65]"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-base text-[#3B2B23]">
                          {activeContact.firstName} {activeContact.lastName}
                        </h3>
                        <span className="text-xs text-[#8C6D2B]">({activeContact.age} წლის)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#7A6258]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#B58F42]" />
                          {activeContact.city}
                        </span>
                        <span>•</span>
                        <span className={activeContact.isOnline ? 'text-emerald-600 font-semibold' : ''}>
                          {activeContact.isOnline ? 'ონლაინშია' : activeContact.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedMember(activeContact)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#EADBCE] text-xs font-semibold text-[#45352F] hover:bg-[#FAF3E8]"
                  >
                    <User className="w-3.5 h-3.5 text-[#B58F42]" />
                    <span>პროფილი</span>
                  </button>
                </div>

                {/* Message Stream */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#FFF8EF]/30 min-h-[350px]">
                  
                  {/* System Greeting Helper */}
                  <div className="text-center my-2">
                    <span className="inline-block bg-[#FAF3E8] border border-[#EADBCE] text-[#8C6D2B] text-[11px] font-medium px-3 py-1 rounded-full">
                      საუბარი დაცულია და კონფიდენციალურია • დაიცავით ზრდილობიანი ტონი
                    </span>
                  </div>

                  {conversationMessages.length > 0 ? (
                    conversationMessages.map((msg) => {
                      const isMe = msg.senderId !== activeContact.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl p-3.5 shadow-xs ${
                              isMe
                                ? 'bg-gradient-to-r from-[#D6AE65] to-[#B58F42] text-white rounded-br-xs'
                                : 'bg-white border border-[#EADBCE] text-[#45352F] rounded-bl-xs'
                            }`}
                          >
                            <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                            <div
                              className={`flex items-center justify-end gap-1 text-[10px] mt-1.5 ${
                                isMe ? 'text-white/80' : 'text-[#8C766B]'
                              }`}
                            >
                              <span>{msg.timestamp}</span>
                              {isMe && <CheckCheck className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-10 text-sm text-[#7A6258]">
                      ჯერ არ გაქვთ მიმოწერა {activeContact.firstName}-თან. გაუგზავნეთ პირველი თბილი მისალმება!
                    </div>
                  )}

                </div>

                {/* Quick Icebreakers for seniors */}
                <div className="p-3 bg-[#FAF3E8]/70 border-t border-[#EADBCE] flex items-center gap-2 overflow-x-auto">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C6D2B] shrink-0 pl-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D6AE65]" />
                    <span>სწრაფი მისალმება:</span>
                  </div>
                  {quickGreetings.map((text, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickGreeting(text)}
                      className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-[#EADBCE] text-xs text-[#5C4940] hover:bg-[#FFF8EF] hover:border-[#D6AE65] transition-colors"
                    >
                      {text}
                    </button>
                  ))}
                </div>

                {/* Message Input Form */}
                <form onSubmit={handleSend} className="p-4 border-t border-[#EADBCE] bg-white flex items-center gap-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`დაწერეთ შეტყობინება ${activeContact.firstName}-სთვის...`}
                    className="flex-1 bg-[#FFF8EF] border border-[#EADBCE] rounded-2xl px-4 py-3 text-sm text-[#45352F] placeholder-[#8C766B] focus:outline-none focus:border-[#D6AE65]"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="py-3 px-5 rounded-2xl bg-[#D6AE65] hover:bg-[#c49c53] disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>გაგზავნა</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center text-sm text-[#7A6258]">
                აირჩიეთ კონტაქტი მარცხენა სიიდან მიმოწერის დასაწყებად.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
