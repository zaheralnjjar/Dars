import React from 'react';
import { 
  Star, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  ChevronLeft,
  BookOpen,
  Sparkles,
  CheckSquare,
  Square
} from 'lucide-react';
import { TopicSuggestion } from '../types';

interface TopicCardProps {
  topic: TopicSuggestion;
  index: number;
  isSelected?: boolean;
  onToggleSelect?: (id: string, e: React.MouseEvent) => void;
  onSelect: (topic: TopicSuggestion) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onToggleDelivered: (id: string, e: React.MouseEvent) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  index,
  isSelected = false,
  onToggleSelect,
  onSelect,
  onToggleFavorite,
  onToggleDelivered,
}) => {
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    'القواعد الفقهية والأصول': { bg: 'bg-amber-100', text: 'text-amber-950', border: 'border-amber-300' },
    'علم المصطلح وطرائف الرواية': { bg: 'bg-emerald-100', text: 'text-emerald-950', border: 'border-emerald-300' },
    'تفسير وتدبر ولطائف بلاغية': { bg: 'bg-teal-100', text: 'text-teal-950', border: 'border-teal-300' },
    'عقيدة وتوحيد': { bg: 'bg-sky-100', text: 'text-sky-950', border: 'border-sky-300' },
    'فقه العبادات': { bg: 'bg-indigo-100', text: 'text-indigo-950', border: 'border-indigo-300' },
    'فقه المعاملات والبيوع': { bg: 'bg-blue-100', text: 'text-blue-950', border: 'border-blue-300' },
    'رقائق وتزكية النفوس': { bg: 'bg-purple-100', text: 'text-purple-950', border: 'border-purple-300' },
    'سيرة وفرائد قصص الصحابة': { bg: 'bg-rose-100', text: 'text-rose-950', border: 'border-rose-300' },
    'أخلاق وأسرة': { bg: 'bg-lime-100', text: 'text-lime-950', border: 'border-lime-300' },
    'تصحيح مفاهيم وأحاديث': { bg: 'bg-orange-100', text: 'text-orange-950', border: 'border-orange-300' },
    'آداب المسجد': { bg: 'bg-cyan-100', text: 'text-cyan-950', border: 'border-cyan-300' },
    'متنوع شامل': { bg: 'bg-emerald-100', text: 'text-emerald-950', border: 'border-emerald-300' },
  };

  const currentCat = categoryColors[topic.category] || categoryColors['متنوع شامل'];

  const prayerNames: Record<string, string> = {
    fajr: 'الفجر',
    dhuhr: 'الظهر',
    asr: 'العصر',
    maghrib: 'المغرب',
    isha: 'العشاء',
    jumuah: 'الجمعة',
    all: 'عام لجميع الصلوات',
  };

  return (
    <div 
      onClick={() => onSelect(topic)}
      className={`group relative rounded-3xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between islamic-card-border ${
        isSelected
          ? 'bg-[#fef9ec] border-2 border-amber-500 shadow-md ring-2 ring-amber-400/50'
          : topic.isDelivered 
          ? 'bg-[#f5f3ec] border-emerald-900/20 opacity-80' 
          : 'bg-white'
      }`}
    >
      {/* Top ribbon: Selection checkbox, index medallion, category, and action buttons */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Multi-selection Checkbox */}
            {onToggleSelect && (
              <button
                onClick={(e) => onToggleSelect(topic.id, e)}
                className={`p-1 rounded-lg transition cursor-pointer ${
                  isSelected 
                    ? 'text-amber-600 bg-amber-100' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
                title={isSelected ? 'إلغاء تحديد هذا الموضوع' : 'تحديد هذا الموضوع'}
              >
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-amber-600 fill-amber-100" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
              </button>
            )}

            {/* Number medallion with gold badge */}
            <div className={`flex items-center justify-center w-7 h-7 rounded-xl font-black text-xs shadow-xs ${
              isSelected ? 'bg-amber-600 text-white' : 'bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950'
            }`}>
              {index + 1}
            </div>

            {/* Category tag */}
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentCat.bg} ${currentCat.text} ${currentCat.border}`}>
              {topic.category}
            </span>

            {/* Target Prayer */}
            <span className="text-[10px] text-slate-600 font-medium bg-[#f5f1e6] px-2 py-0.5 rounded-full border border-amber-900/10">
              {prayerNames[topic.targetPrayer] || topic.targetPrayer}
            </span>
          </div>

          {/* Action icons: Favorite & Delivered */}
          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => onToggleFavorite(topic.id, e)}
              className={`p-1.5 rounded-xl transition cursor-pointer ${
                topic.isFavorite 
                  ? 'text-amber-500 bg-amber-100 hover:bg-amber-200' 
                  : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
              }`}
              title={topic.isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
            >
              <Star className={`w-4 h-4 ${topic.isFavorite ? 'fill-amber-500' : ''}`} />
            </button>

            <button
              onClick={(e) => onToggleDelivered(topic.id, e)}
              className={`p-1.5 rounded-xl transition cursor-pointer ${
                topic.isDelivered 
                  ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200' 
                  : 'text-slate-400 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
              title={topic.isDelivered ? 'أُلغيت علامة الإلقاء' : 'تحديد ككلمة تم إلقاؤها'}
            >
              <CheckCircle2 className={`w-4 h-4 ${topic.isDelivered ? 'fill-emerald-600 text-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-emerald-950 group-hover:text-amber-700 transition-colors leading-snug mb-2 font-cairo">
          {topic.title}
        </h3>

        {/* Short Summary */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3">
          {topic.shortSummary}
        </p>

        {/* Hook Question preview */}
        {topic.hookQuestion && (
          <div className="bg-[#fcfaf4] rounded-2xl p-2.5 border border-amber-600/20 mb-3 flex items-start gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 font-semibold italic line-clamp-2">
              "{topic.hookQuestion}"
            </p>
          </div>
        )}

        {/* Science curiosity chip if available */}
        {topic.scienceCuriosityPreview && (
          <div className="mb-3 bg-emerald-50/80 rounded-xl p-2 border border-emerald-200 text-[10px] text-emerald-900 flex items-start gap-1.5 line-clamp-1">
            <Sparkles className="w-3 h-3 text-emerald-700 shrink-0 mt-0.5" />
            <span className="font-medium">{topic.scienceCuriosityPreview}</span>
          </div>
        )}
      </div>

      {/* Bottom Footer: Academic reference, Duration, and Enter button */}
      <div className="pt-3 border-t border-amber-600/15 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-[11px] text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 font-semibold">
            <Clock className="w-3 h-3 text-emerald-700" />
            {topic.estimatedDuration || '3-5 دقائق'}
          </span>

          {topic.academicReference && (
            <span className="text-[10px] text-amber-900 font-medium bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 hidden sm:inline" title={topic.academicReference}>
              📚 {topic.academicReference.split('(')[0]}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-amber-700 group-hover:text-amber-900 font-bold text-xs group-hover:translate-x-[-2px] transition-transform">
          <span>المخطط والتوثيق</span>
          <ChevronLeft className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
