import i18n from 'i18next';

export const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleString(i18n.language);  // Use current language from i18next
  } catch (e) {
    return dateString || e;
  }
};

export const formatDateUser = (dateString: string) => {
  const { t, language } = i18n;
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMin = Math.floor(diffInMs / (1000 * 60));
  const diffInHrs = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  // Using i18next for time-related translations
  if (diffInMin < 1) return t('time.justNow');
  if (diffInMin < 60) return t('time.minutesAgo', { count: diffInMin });
  if (diffInHrs < 24) return t('time.hoursAgo', { count: diffInHrs });
  if (diffInDays < 7) return t('time.daysAgo', { count: diffInDays });

  // Use current language from i18next for formatting the date
  return date.toLocaleDateString(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
