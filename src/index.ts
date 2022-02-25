type LocalStorageData = {
  key: string;
  value: unknown;
  expiresBy: number;
};

export const toTimestamp = (date: string | number | Date): number => {
  switch (date.constructor) {
    case Date:
      return (date as Date).getTime();
    case Number: {
      const time = date as number;
      return time === Infinity || time < -1 ? new Date().getTime() : time;
    }
    case String: {
      const data = date as string;
      if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(data)) {
        const timeString = Number(data.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, '$1'));
        let difference;
        switch (data.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
          // Frequency sorting
          case 'm':
          case 'month':
          case 'months':
            difference = timeString * 2592000;
            break;
          case 'd':
            difference = timeString * 86400;
            break;
          case 'h':
            difference = timeString * 3600;
            break;
          case 'min':
          case 'mins':
          case 'minute':
          case 'minutes':
            difference = timeString * 60;
            break;
          case 's':
          case 'sec':
          case 'secs':
          case 'second':
          case 'seconds':
            difference = timeString;
            break;
          case 'y':
            difference = timeString * 31104000;
            break;
          default:
            throw new Error('unknown exception of "set operation"');
        }
        const now = new Date();
        now.setTime(now.getTime() + difference * 1000);
        return now.getTime();
      }
      return 0;
    }
    default:
      return 0;
  }
};

export const setItem = (key: string, value: unknown, expiry: string | number | Date = '0'): void => {
  const data: LocalStorageData = {
    key,
    value,
    expiresBy: toTimestamp(expiry),
  };
  return localStorage.setItem(key, JSON.stringify(data));
};

export const hasItem = (key: string): boolean => !!localStorage.getItem(key);

export function getItem<S = undefined>(key: string): S | null {
  const value = localStorage.getItem(key);
  if (!value) return null;

  const data: LocalStorageData = JSON.parse(value);
  const now = new Date().getTime();

  return data.expiresBy > now || data.expiresBy === 0 ? (data.value as S) : null;
}
