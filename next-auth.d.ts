// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation
// extending next-auth interfaces to our need, as we add id and role with the default setting
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

//extending default object interface return by next-auth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession; // extend session interface to have id and role
  }

  //adding role
  interface User extends DefaultUser {
    role: string;
  }
}

//add role to default jwt
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
