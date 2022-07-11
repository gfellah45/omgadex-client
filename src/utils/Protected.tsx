import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import useIsClient from '../hooks/useIsClient';
import { useAppSelector } from '../hooks/useStoreHooks';

type IProtected = {
  children: ReactNode;
};

function Protected({ children }: IProtected) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { push, pathname } = useRouter();

  const isClient = useIsClient();

  const authRoutes = [
    '/',
    '/login',
    '/signup',
    '/verify-code',
    '/verify',
    '/forgotpassword',
    '/forgotpassordinput',

    '/verify-code',
    '/verify',
    '/forgetpassworinput',
  ];

  if (isClient) {
    if (!isAuthenticated && !authRoutes.includes(pathname)) {
      push('/login');
    } else {
      return <div>{children}</div>;
    }
  }
  return null;
}

export default Protected;
