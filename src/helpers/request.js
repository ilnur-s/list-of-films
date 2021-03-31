/* eslint-disable no-alert */
const getData = async () => {
  let data;
  try {
    const endpoint = 'https://api.themoviedb.org/3/discover/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
    const rawData = await fetch(endpoint);

    if (rawData.ok) {
      data = await rawData.json();
    } else {
      throw new Error('Ошибка получения данных, попробуйте позднее');
    }
  } catch (error) {
    alert(error.message);
  }
  return data;
};

export default getData;
