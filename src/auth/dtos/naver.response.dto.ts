export class NaverUser {
  resultcode: string;
  message: string;
  response: UserProfile;
}

export class UserProfile {
  id: string;
  nickname: string;
  name: string;
  email: string;
  gender: string;
  age: number;
  birthdate: string;
  profile_image: string;
  birthyear: string;
  mobile: string;
}

/* 샘플 KakaoUser 값
{
  resultcode: '00',
  message: 'success',
  response: {
    id: '0URfXkCTKSk0wQfLeeqUr8dNOss0grNSPscBI3TTQgU',
    nickname: '지선',
    profile_image: 'https://phinf.pstatic.net/contact/20200816_279/1597566310241qFtI9_PNG/avatar_profile.png',
    email: 'jisun1249@naver.com',
    name: '김지선'
  }
}
*/
