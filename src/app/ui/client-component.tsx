'use client';

import { useEffect } from 'react';
////import { cookieToken } from '@/app/lib/actions';
////import useStore from '@/app/lib/useStore'
////import { useTokenRing } from '@/app/lib/token-ring'

export default function ServerAction({ action }: { action: () => void }) {
  useEffect(() => {
    action();
  }, []);

  return <></>;
}
/*
export const CookieToken = ({ token }: { token: string|undefined }) => {
  useEffect(() => {
    cookieToken(token);
  }, []);

  return <></>;
}

export const SessionToken = ({ token }: { token: string|undefined }) => {

  const store = useStore(useTokenRing, (state) => state)
  if (store && token) {
      const { remember } = store
      remember(token)
  }

  return <></>;
}
*/
