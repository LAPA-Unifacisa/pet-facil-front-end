const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short' });
const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

export const formatDate = (isoDate: string): string => dateFormatter.format(new Date(isoDate));

export const formatDateTime = (isoDate: string): string =>
  dateTimeFormatter.format(new Date(isoDate));

export const isPastDate = (isoDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(isoDate) < today;
};
