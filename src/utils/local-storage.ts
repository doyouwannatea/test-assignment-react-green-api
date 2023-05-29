export function getDataFromLocalStorage<T>(key: string): T | undefined {
  try {
    const data = localStorage.getItem(key);
    if (!data) return;
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

export function setDataToLocalStorage<T>(
  data: T | undefined,
  key: string,
): void {
  if (!data) localStorage.removeItem(key);
  else localStorage.setItem(key, JSON.stringify(data));
}
