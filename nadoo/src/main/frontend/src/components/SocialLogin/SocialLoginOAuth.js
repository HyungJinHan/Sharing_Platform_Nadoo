const KAKAO_CLIENT_ID = "4b6aab937e2879273728054a3b7ec4a4";
const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/login";

const NAVER_CLIENT_ID = "kFXWxG9S3JYGuLNlgz3l";
const NAVER_REDIRECT_URI = "http://localhost:3000/login/naver";
const NAVER_STATE = "12345";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_STATE}&redirect_uri=${NAVER_REDIRECT_URI}`;