export function replacePrefix(
  path: string,
  prefix: string,
  replaceWith = '',
  flags = 'i'
): string {
  // безопасно экранируем все спецсимволы регулярного выражения
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // создаём регулярное выражение, которое ищет префикс в начале строки
  const regex = new RegExp(`^${escapedPrefix}`, flags);
  return path.replace(regex, replaceWith);
}
