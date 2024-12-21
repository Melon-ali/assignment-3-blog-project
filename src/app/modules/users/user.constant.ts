//Email Validitons Regex

export const emailValidationRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//User Role Type

export const roletype = ['admin', 'user'];

//User Role For Authentications And Authoriztions

export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;
