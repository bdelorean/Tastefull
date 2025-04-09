export const fetchWithCache = async (key, fetchFn, expiration = 3600000) => {
    const cachedData = localStorage.getItem(key);
    const cachedTime = localStorage.getItem(`${key}_timestamp`);
  
    if (cachedData && cachedTime && Date.now() - cachedTime < expiration) {
      return JSON.parse(cachedData);
    }
  
    const data = await fetchFn();
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_timestamp`, Date.now());
    return data;
  };
  