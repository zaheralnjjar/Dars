import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  MessageSquare, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { SmartSuggestionsData, PrayerKey } from '../types';

interface SmartSuggestionsBannerProps {
  currentPrayer: PrayerKey;
  onSelectTopicTitle: (title: string) => void;
}

export const SmartSuggestionsBanner: React.FC<SmartSuggestionsBannerProps> = ({
  currentPrayer,
  onSelectTopicTitle,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const [suggestions, setSuggestions] = useState<SmartSuggestionsData>({
    timelyTopic: {
      title: currentPrayer === 'fajr' 
        ? 'البركة في البكور وركعتا الفجر' 
        : currentPrayer === 'asr'
        ? 'قاعدة: المشقة تجلب التيسير ورخص الصلاة'
        : currentPrayer === 'jumuah'
        ? 'فضل الصلاة على النبي ﷺ وساعة الإجابة'
        : 'قاعدة: الأمور بمقاصدها وتصحيح النيات في العادات',
      reason: 'موضوع فقهي وتربوي يناسب هذا التوقيت، موثق في الشاملة وصحيحي البخاري ومسلم.',
      scienceType: 'القواعد الفقهية وفقه العبادات'
    },
    imamWisdomTip: 'اجعل خاطرتك بين 3 إلى 5 دقائق بالضبط؛ فخير الكلام ما قل ودل، وافتتح بسؤال إشكالي لطيف يشحذ أذهان المصلين قبل الدخول في صلب الحديث.',
    quickSahihHadith: {
      matn: '«كَلِمَتَانِ خَفِيفَتَانِ عَلَى اللِّسَانِ، ثَقِيلَتَانِ فِي المِيزَانِ، حَبِيبَتَانِ إِلَى الرَّحْمَنِ: سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ العَظِيمِ»',
      source: 'متفق عليه: صحيح البخاري (6406) - الشاملة: ج8، ص89'
    },
    congregationEngagementIdea: 'اطرح سؤالاً افتتاحياً: "لو قيل لك إن هناك تجارة لا تستغرق عشر ثوانٍ تثقل ميزانك يوم القيامة، هل تفرط فيها؟"',
    scienceCuriosityNugget: 'طريفة مصطلحية: يُسمى الحديث الذي يتفق فيه رواة السند جميعاً على التبسم عند روايته بـ "المسلسل بالتبسم"، اقتداءً بتبسم النبي ﷺ عند ختمه!'
  });

  const handleRefreshAI = async () => {
    setIsLoading(true);
    setFeedbackMsg(null);
    try {
      const now = new Date();
      const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
      const dayName = days[now.getDay()];
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

      const res = await fetch('/api/ai/smart-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPrayer,
          currentTime: timeStr,
          dayOfWeek: dayName,
        }),
      });

      const data = await res.json();
      if (data.success && data.suggestions && data.suggestions.timelyTopic) {
        setSuggestions(data.suggestions);
        setFeedbackMsg('تم تحديث الاقتراحات الذكية بنجاح!');
        setTimeout(() => setFeedbackMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to refresh smart suggestions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative my-4 rounded-3xl bg-gradient-to-br from-[#ffffff] via-[#fcfaf4] to-[#f8f5eb] border border-amber-600/30 shadow-md overflow-hidden transition-all duration-300">
      {/* Decorative top Islamic band */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-700" />

      {/* Header bar */}
      <div className="px-5 py-3.5 flex items-center justify-between border-b border-amber-600/20 bg-[#f9f6ed]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-900 border border-amber-400 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-bold text-emerald-950 font-cairo flex items-center gap-1.5">
                فقرة الاقتراحات واللطائف الذكية اللحظية للإمام
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                توثيق الشاملة المباشر
              </span>
            </div>
            <p className="text-[11px] text-slate-600 hidden sm:block">
              توصيات متجددة ولطائف من كتب المصطلح والقواعد الفقهية والتفسير تناسب وقت الصلاة الحالي
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {feedbackMsg && (
            <span className="text-xs text-emerald-800 font-bold flex items-center gap-1 bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              {feedbackMsg}
            </span>
          )}

          <button
            onClick={handleRefreshAI}
            disabled={isLoading}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 transition disabled:opacity-50 cursor-pointer shadow-xs"
            title="توليد اقتراحات ولطائف ذكية جديدة بالذكاء الاصطناعي"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline font-cairo">تحديث التوصيات واللطائف</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg transition"
            aria-label="تبديل إظهار الفقرة"
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body Content */}
      {isExpanded && (
        <div className="p-4.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          
          {/* Card 1: Timely topic */}
          <div className="bg-white rounded-2xl p-3.5 border border-amber-600/25 flex flex-col justify-between hover:border-amber-500 hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>موضوع الساعة المقترح:</span>
                </div>
                {suggestions.timelyTopic.scienceType && (
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                    {suggestions.timelyTopic.scienceType}
                  </span>
                )}
              </div>
              <p className="font-bold text-emerald-950 text-sm leading-snug mb-1">
                {suggestions.timelyTopic.title}
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {suggestions.timelyTopic.reason}
              </p>
            </div>
            <button
              onClick={() => onSelectTopicTitle(suggestions.timelyTopic.title)}
              className="mt-2.5 pt-2 border-t border-amber-600/20 text-emerald-800 hover:text-emerald-950 text-[11px] font-bold flex items-center justify-between w-full cursor-pointer"
            >
              <span>عرض المخطط وتوثيق الشاملة</span>
              <ArrowLeft className="w-3 h-3 text-amber-600" />
            </button>
          </div>

          {/* Card 2: Science Curiosity Nugget (طرائف ولطائف العلوم) */}
          <div className="bg-white rounded-2xl p-3.5 border border-emerald-700/25 flex flex-col justify-between hover:border-emerald-600 hover:shadow-md transition">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold mb-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-700" />
                <span>طريفة ولطيفة من علوم الدين:</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px] font-medium bg-[#f9f7f1] p-2.5 rounded-xl border border-amber-800/10">
                {suggestions.scienceCuriosityNugget || 'طريفة فقهية: كان بعض السلف يفتتح درسه بالقواعد الجامعة لتسهيل ضبط المسائل المتشابهة.'}
              </p>
            </div>
            <div className="mt-2 text-[10px] text-amber-800 font-bold">
              📚 مأخوذ من مصادر الشاملة وكتب المصطلح والقواعد
            </div>
          </div>

          {/* Card 3: Rapid Sahih Capsule */}
          <div className="bg-white rounded-2xl p-3.5 border border-amber-600/25 flex flex-col justify-between hover:border-amber-500 hover:shadow-md transition">
            <div>
              <div className="flex items-center gap-1.5 text-amber-900 font-bold mb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>كبسولة نبوية صحيحة (30 ثانية):</span>
              </div>
              <p className="font-amiri text-xs text-emerald-950 font-semibold leading-relaxed bg-[#f6fbf8] p-2.5 rounded-xl border border-emerald-300">
                {suggestions.quickSahihHadith.matn}
              </p>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 font-mono font-medium">
              {suggestions.quickSahihHadith.source}
            </p>
          </div>

          {/* Card 4: Preacher wisdom & Engagement Idea */}
          <div className="bg-white rounded-2xl p-3.5 border border-emerald-700/25 flex flex-col justify-between hover:border-emerald-600 hover:shadow-md transition">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-900 font-bold mb-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>نصيحة المنبر وسؤال المصلين:</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px] mb-2">
                {suggestions.imamWisdomTip}
              </p>
              <div className="bg-amber-50 p-2 rounded-lg text-[10px] text-amber-900 font-medium border border-amber-200">
                سؤال مقترح: "{suggestions.congregationEngagementIdea}"
              </div>
            </div>
            <div className="mt-2 text-[10px] text-emerald-800 font-semibold">
              💡 سر التأثير: الاختصار وبراعة الاستهلال
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
