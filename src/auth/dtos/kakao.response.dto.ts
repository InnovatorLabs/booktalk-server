export class KakaoUser {
  id: number;
  connected_at: Date;
  synched_at: Date;
  properties: KakaoUserProperties;
  kakao_account: KakaoUserAccountDetail;
}

export class KakaoUserAccountProfile {
  nickname: string;
  thumbnail_image_url: string;
  profile_image_url: string;
  is_default_image: boolean;
}

export class KakaoUserAccountDetail {
  profile_needs_agreement: boolean;
  profile: KakaoUserAccountProfile;
  has_email: boolean;
  email_needs_agreement: boolean;
  is_email_valid: boolean;
  is_email_verified: boolean;
  email: string;
  has_phone_number: boolean;
  phone_number_needs_agreement: boolean;
  phone_number: string;
}

export class KakaoUserProperties {
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
}

/* 샘플 KakaoUser 값
{
    "id": 2733523243,
    "connected_at": "2023-04-03T06:06:02Z",
    "properties": {
        "nickname": "지선",
        "profile_image": "http://k.kakaocdn.net/dn/Z40z2/btr1MneGWjG/rrW16RysadoyEhqW9w0fw1/img_640x640.jpg",
        "thumbnail_image": "http://k.kakaocdn.net/dn/Z40z2/btr1MneGWjG/rrW16RysadoyEhqW9w0fw1/img_110x110.jpg"
    },
    "kakao_account": {
        "profile_nickname_needs_agreement": false,
        "profile_image_needs_agreement": false,
        "profile": {
            "nickname": "지선",
            "thumbnail_image_url": "http://k.kakaocdn.net/dn/Z40z2/btr1MneGWjG/rrW16RysadoyEhqW9w0fw1/img_110x110.jpg",
            "profile_image_url": "http://k.kakaocdn.net/dn/Z40z2/btr1MneGWjG/rrW16RysadoyEhqW9w0fw1/img_640x640.jpg",
            "is_default_image": false
        },
        "has_email": true,
        "email_needs_agreement": false,
        "is_email_valid": true,
        "is_email_verified": true,
        "email": "zsunk@kakao.com",
        "has_gender": true,
        "gender_needs_agreement": false,
        "gender": "female"
    }
}
*/
