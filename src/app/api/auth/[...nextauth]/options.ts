import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";

// go to next-auth documentation and see the provider list and choose github for implementation doc
// next-auth update will come soon (as authjs), so always refer to doc
export const options: NextAuthOptions = {
  providers: [
    // for log in with github
    // this function return a profile data sent from github after authentication
    GitHubProvider({
      // profile function is use to modify the default profile return by GitHubProvider
      // it recive a profile(like form github), then return a profile as you modified(adding a role)
      profile(profile: GithubProfile) {
        //console.log(profile)

        // adding role, as third party server don't provide you a role
        return {
          ...profile, // its better to only take the email rather then spreading everything
          role: profile.role ?? "user", // it doenot provide any profile role, just an example to learn
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // for log in using user name and password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        // we don't using a database, we are using a fake user, adding a role
        const user = {
          id: "42",
          name: "amdad",
          password: "nextauth",
          role: "admin",
        };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    // returning token for server component
    async jwt({ token, user }) {
      if (user) token.role = user.role; //see the next-auth.d.ts file
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      // adding role to session and returning it
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
