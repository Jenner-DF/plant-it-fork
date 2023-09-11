import { TIMEOUT_SEC } from './config';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    Promise.race([]);
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const removePremiumPlants = function (data) {
  return data.filter(
    data =>
      data?.default_image?.original_url !== undefined &&
      data?.default_image?.original_url !==
        'https://perenual.com/storage/image/upgrade_access.jpg'
  );
};
