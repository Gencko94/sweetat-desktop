import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';
import { getUserInfo } from '../../../lib/queries/userService';

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
    // GoogleProvider({
    //   clientId:
    //     '325323399951-7cjlt2u662c5ld7qim7aaasonnql9npl.apps.googleusercontent.com',
    //   clientSecret: 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg',
    // }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(token, 'token');
      if (user) {
        // token.user = user;
        const data = await getUserInfo(user.auth_token, user.id);
        token.user = data.data;
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      const data = await getUserInfo(token.user.auth_token, token.user.id);
      session.user = data.data;
      return session;
    },
  },

  session: { jwt: true },
  jwt: {
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    signingKey: JSON.stringify({
      kty: 'oct',
      kid: 'Dl893BEV-iVE-x9EC52TDmlJUgGm9oZ99_ZL025Hc5Q',
      alg: 'HS512',
      k:
        'K7QqRmJOKRK2qcCKV_pi9PSBv3XP0fpTu30TP8xn4w01xR3ZMZM38yL2DnTVPVw6e4yhdh0jtoah-i4c_pZagA',
    }),
  },
  secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
});
