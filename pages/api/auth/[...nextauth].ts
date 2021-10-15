import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export default NextAuth({
  providers: [
    // eslint-disable-next-line @typescript-eslint/ban-types
    CredentialsProvider<{}>({
      name: 'Custom Provider',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Email' },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any) {
        const res = await axios.post('https://sweetat.co/public/api/login', {
          email: credentials.email,
          password: credentials.password,
        });
        if (res.data.success === true) {
          return res.data.data;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId:
        '325323399951-7cjlt2u662c5ld7qim7aaasonnql9npl.apps.googleusercontent.com',
      clientSecret: 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  session: { jwt: true },
  jwt: { secret: 'fdfkslfdskjwe' },
});
