import jwt from 'jsonwebtoken';
type TJewtpayload = {
  useremail: string;
  role: string;
};

//Create Token

export const createToken = (
  jwtPayload: TJewtpayload,
  select: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, select, { expiresIn });
};
