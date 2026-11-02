import { 
  Sparkles, 
  MapPin, 
  Mic, 
  ShieldCheck, 
  Settings, 
  Bookmark, 
  Clock, 
  Compass, 
  Volume2, 
  BookOpen,
  Bell
} from 'lucide-react';
import { PrayerTime, PrayerKey } from '../types';
import { PWAInstallButton } from './PWAInstallButton';

interface IslamicHeaderProps {
  currentPrayer: PrayerKey;
  nextPrayer: PrayerKey;
  minutesRemaining: number;
  prayerList: PrayerTime[];
  cityName: string;
  qiblaDegrees: number;
  isReminderActive: boolean;
  onOpenReminderModal: () => void;
  onOpenPermissions: () => void;
  onOpenSettings: () => void;
  onOpenHadithVerifier: () => void;
  onOpenAudioRehearsal: () => void;
  activeTab: 'all' | 'favorites' | 'history';
  setActiveTab: (tab: 'all' | 'favorites' | 'history') => void;
  favoritesCount: number;
}

export const IslamicHeader: React.FC<IslamicHeaderProps> = ({
  nextPrayer,
  minutesRemaining,
  prayerList,
  cityName,
  qiblaDegrees,
  isReminderActive,
  onOpenReminderModal,
  onOpenPermissions,
  onOpenSettings,
  onOpenHadithVerifier,
  onOpenAudioRehearsal,
  activeTab,
  setActiveTab,
  favoritesCount,
}) => {
  const arabicPrayers: Record<string, string> = {
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    jumuah: 'الجمعة',
    all: 'عام',
  };

  const todayGregorian = new Intl.DateTimeFormat('ar-SA-u-ca-gregory', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  const todayHijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="relative border-b border-amber-500/25 bg-gradient-to-b from-[#fcfbf7] via-[#f7f5ed] to-[#f4f0e6] px-4 py-5 shadow-sm text-slate-800">
      {/* Gilded Top Border with Islamic Gold & Emerald Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-700 shadow-sm" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & Identity */}
        <div className="flex items-center gap-3.5 text-right w-full md:w-auto justify-between md:justify-start">
          <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-emerald-950 border-2 border-amber-400 shadow-md p-2 group">
            {/* Eight-pointed Islamic Star Symbol in Gold */}
            <svg viewBox="0 0 24 24" className="w-9 h-9 text-amber-300 drop-shadow" fill="currentColor">
              <path d="M12 2l2.4 4.8 5.3.8-3.8 3.8.9 5.3L12 16.2 7.2 18.7l.9-5.3-3.8-3.8 5.3-.8L12 2z" opacity="0.3" />
              <path d="M12 3.5l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4-2.9-2.8 4-.6L12 3.5z" />
            </svg>
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-black text-slate-950 ring-2 ring-white">
              AI
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black font-kufi tracking-wide text-emerald-950 flex items-center gap-2">
                زاد الإمام والخطيب
                <span className="text-[11px] font-bold font-cairo px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                  توثيق الشاملة والجامع
                </span>
              </h1>
            </div>
            <p className="text-xs text-emerald-900/80 font-cairo font-medium">
              دليل الكلمات والمواعظ بعد الصلوات • موثق أكاديمياً من المكتبة الشاملة والجامع والوقفية
            </p>
          </div>
        </div>

        {/* Prayer Time & Real-time Location Indicator */}
        <div className="flex items-center flex-wrap gap-2 md:gap-3 justify-center">
          <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-xl border border-amber-600/25 text-xs shadow-xs">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="text-slate-600 font-medium">الصلاة القادمة:</span>
            <span className="font-bold text-emerald-900 font-cairo">{arabicPrayers[nextPrayer] || nextPrayer}</span>
            <span className="text-amber-700 font-semibold text-[11px]">
              (خلال {minutesRemaining > 60 ? `${Math.floor(minutesRemaining / 60)} س و ${minutesRemaining % 60} د` : `${minutesRemaining} دقيقة`})
            </span>
          </div>

          <div 
            onClick={onOpenPermissions}
            className="flex items-center gap-1.5 bg-white hover:bg-amber-50/70 cursor-pointer transition px-3 py-1.5 rounded-xl border border-amber-600/25 text-xs text-slate-700 shadow-xs"
            title="انقر لتعديل أذونات الموقع والبوصلة"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-medium">{cityName}</span>
            <span className="text-[11px] text-amber-700 font-bold flex items-center gap-0.5">
              <Compass className="w-3 h-3 inline text-emerald-800" />
              {Math.round(qiblaDegrees)}°
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-600 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-900/10 shadow-xs font-medium">
            <span>{todayHijri}</span>
            <span>•</span>
            <span className="text-slate-500">{todayGregorian}</span>
          </div>
        </div>

        {/* Quick Tools & Modals Actions */}
        <div className="flex items-center gap-1.5 md:gap-2 w-full md:w-auto justify-end flex-wrap">
          {/* In-App PWA Install Button */}
          <PWAInstallButton />

          {/* Post-Azan Reminder indicator button */}
          <button
            onClick={onOpenReminderModal}
            className={`flex items-center gap-1 px-2.5 py-2 text-xs font-bold rounded-xl transition cursor-pointer shadow-xs ${
              isReminderActive 
                ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-amber-600/30'
            }`}
            title="تذكير كلمة ما بعد الأذان (مفعّل دائماً)"
          >
            <Bell className={`w-3.5 h-3.5 ${isReminderActive ? 'text-amber-600 fill-amber-500 animate-pulse' : 'text-slate-600'}`} />
            <span className="hidden sm:inline">التذكير</span>
          </button>

          {/* Audio Rehearsal / Mic Coach */}
          <button
            onClick={onOpenAudioRehearsal}
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white shadow-xs transition cursor-pointer"
            title="تدريب الإلقاء وتسجيل الصوت بالذكاء الاصطناعي"
          >
            <Mic className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">تدريب الإلقاء</span>
          </button>

          {/* Hadith Verifier */}
          <button
            onClick={onOpenHadithVerifier}
            className="flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs transition cursor-pointer"
            title="التحقق من صحة وتخريج الأحاديث والقصص في الشاملة"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">محقّق الأحاديث</span>
          </button>

          {/* Permissions Hub */}
          <button
            onClick={onOpenPermissions}
            className="p-2 text-xs rounded-xl bg-white hover:bg-amber-50 text-slate-700 border border-amber-600/30 shadow-xs transition cursor-pointer"
            title="مركز الأذونات (الموقع، الميكروفون، الصوت، الإشعارات)"
          >
            <Volume2 className="w-4 h-4 text-emerald-800" />
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-xs rounded-xl bg-white hover:bg-amber-50 text-slate-700 border border-amber-600/30 shadow-xs transition cursor-pointer"
            title="إعدادات المنظومة وطريقة الحساب والتذكير"
          >
            <Settings className="w-4 h-4 text-emerald-800" />
          </button>
        </div>
      </div>

      {/* Prayer times microbar */}
      <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-amber-600/20 flex items-center justify-between flex-wrap gap-2 text-xs">
        <div className="flex items-center gap-1 md:gap-2 overflow-x-auto pb-1 max-w-full">
          <span className="text-slate-600 font-semibold text-[11px] ml-1">أوقات الصلاة اليوم:</span>
          {prayerList.map((p) => {
            const isTarget = p.key === nextPrayer;
            return (
              <div 
                key={p.key}
                className={`px-3 py-1 rounded-xl text-[11px] font-semibold transition flex items-center gap-1.5 ${
                  isTarget 
                    ? 'bg-amber-500 text-slate-950 shadow-xs font-bold border border-amber-600' 
                    : 'bg-white text-slate-700 border border-amber-600/20 shadow-xs'
                }`}
              >
                <span>{p.arabicName}</span>
                <span className={isTarget ? 'text-slate-950 font-mono font-bold' : 'text-emerald-800 font-mono font-bold'}>
                  {p.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tab switcher: All Topics vs Favorites vs History */}
        <div className="flex items-center gap-1 bg-[#ede8db] p-1 rounded-xl border border-amber-700/20">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-slate-700 hover:text-emerald-950'
            }`}
          >
            الموضوعات المقترحة (20)
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-3.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-amber-800'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            <span>المفضلة</span>
            {favoritesCount > 0 && (
              <span className="bg-amber-300 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                {favoritesCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'history'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'text-slate-700 hover:text-emerald-950'
            }`}
          >
            سجل الكلمات المُلقاة
          </button>
        </div>
      </div>
    </header>
  );
};
