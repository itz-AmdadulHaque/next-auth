# Authentication with [NextAuth](https://next-auth.js.org/)

### Role Base Authorization
In this lesson we will implement role base authencation and authorization. <b>Remember every third party auth providre does not sent the same profile info. Check before modifying them.</b> Go through all file for better understanding.
</br>
Page access

- Home page can be accessed by anyone
- Client page can only be accessed by the "admin" or "manager"
- Extra page can be only accessed by the "admin"

Main changes applied on

- api/auth/[...nextauth]/route.js
- api/auth/[...nextauth]/options.js
- middleware
  </br>see other files too, there are minor changes</br>

added type in

- next-auth.d.ts

you don't have to create a signIn or signOut page next-auth will provide it. you just have to use the below paths

- /api/auth/signin
- api/auth/signout

see the file [/component/Navbar.tsx]<br/>
start the server using `npm run dev` and
see how authentication applied to different pages.

### env varialbe

- NEXTAUTH_SECRET<br/>
  generated locally
- GITHUB_SECRET<br/>
  login to github, go to setting, then developer setting and auth configure,
- GITHUB_ID

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
