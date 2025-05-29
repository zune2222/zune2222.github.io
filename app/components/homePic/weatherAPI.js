// 날씨 API 관련 함수

const API_KEY = 'a40005b9dd55620b64c0889925acdd27';
const CITY = 'busan';

export async function fetchWeatherData() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    
    return {
      weatherCode: data.weather[0].id,
      weatherMain: data.weather[0].main,
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
    return null;
  }
}
