const CLIENT_ID = "4b6aab937e2879273728054a3b7ec4a4";
const REDIRECT_URI = "http://localhost:3000/oauth/login";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;