export const BASE_URL = "https://localhost:44303/";
export const USER_COUNT_ROLES = [
  {
    required: true,
    pattern: /^[a-zA-Z0-9]{4,15}$/,
    message:
      "请检查账号是否合法（允许5-16字节，允许字母，数字，下划线）",
  },
];

export const USER_PWD_ROLES = [
  {
    required: true,
    pattern: /^[a-zA-Z0-9_-]{5,17}$/,
    message:
      "密码(长度在6~18之间，只能包含字母、数字和下划线，减号)",
  },
];
export const USER_NAME_ROLES = [
  {
    required:true,
    pattern:/^[\u4E00-\u9FA5a-zA-Z0-9_-]{3,16}$/,
    message:"用户名校验，3-6位（汉字，字母，数字，下划线，减号）"
  }
]
