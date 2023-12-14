// auth.ts

import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export async function protectRoute(context: GetServerSidePropsContext): Promise<{ props?: { session: any } } | { redirect: { destination: string; permanent: boolean } }> {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
