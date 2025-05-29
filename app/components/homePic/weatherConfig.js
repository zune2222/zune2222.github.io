// 날씨 관련 설정 및 유틸리티 함수들

export const WEATHER_TYPES = {
  THUNDER: 'rain',
  RAIN: 'rain',
  SNOW: 'snow',
  CLEAR: 'clear',
  CLOUD: 'cloud'
};

export const PARTICLE_COUNTS = {
  cloud: 8,
  sun: 80,
  star: 100,
  rain: 200,
  snow: 200
};

// 시간대별 배경색 설정
export function getBackgroundByTime(hours, isDaytime) {
  if (!isDaytime) {
    return "bg-slate-900";
  }
  
  if (hours < 8) {
    return "bg-gradient-to-b from-rose-100 to-amber-100";  // 이른 아침
  } else if (hours < 11) {
    return "bg-gradient-to-b from-amber-50 to-sky-200";   // 아침
  } else if (hours < 14) {
    return "bg-gradient-to-b from-sky-300 to-cyan-200";   // 정오
  } else if (hours < 17) {
    return "bg-gradient-to-b from-blue-300 to-indigo-200"; // 오후
  } else {
    return "bg-gradient-to-b from-orange-300 to-pink-400"; // 저녁
  }
}

// 날씨 코드에 따른 타입 결정
export function getWeatherType(weatherCode, isDaytime) {
  if (weatherCode >= 200 && weatherCode < 300) {
    return WEATHER_TYPES.THUNDER;
  } else if (weatherCode >= 300 && weatherCode < 600) {
    return WEATHER_TYPES.RAIN;
  } else if (weatherCode >= 600 && weatherCode < 700) {
    return WEATHER_TYPES.SNOW;
  } else if (weatherCode === 800) {
    return isDaytime ? 'sun' : 'star';
  } else {
    return WEATHER_TYPES.CLOUD;
  }
}

// 날씨에 따른 배경색 결정
export function getWeatherBackground(weatherCode, isDaytime, hours) {
  if (weatherCode >= 200 && weatherCode < 300) {
    // 천둥번개
    return isDaytime ? "bg-gray-600" : "bg-gray-900";
  } else if (weatherCode >= 300 && weatherCode < 600) {
    // 비
    return isDaytime ? "bg-gray-400" : "bg-gray-900";
  } else if (weatherCode >= 600 && weatherCode < 700) {
    // 눈
    return isDaytime ? "bg-slate-200" : "bg-slate-900";
  } else if (weatherCode === 800) {
    // 맑음 - 시간대별 그라데이션
    return getBackgroundByTime(hours, isDaytime);
  } else {
    // 구름
    return isDaytime ? "bg-gray-200" : "bg-gray-900";
  }
}

// 초기 상태 생성
export function getInitialState() {
  const hours = new Date().getHours();
  const isDaytime = hours >= 6 && hours < 18;
  
  return {
    bgColor: getBackgroundByTime(hours, isDaytime),
    isDaytime: isDaytime,
    weatherType: isDaytime ? "sun" : "star",
  };
}
