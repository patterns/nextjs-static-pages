'use client';

import { useEffect } from 'react';
import { cookieToken } from '@/app/lib/actions';
import useStore from '@/app/lib/useStore'
import { useTokenStore } from '@/app/lib/token-store'

export default function ServerAction({ action }: { action: () => void }) {
  useEffect(() => {
    action();
  }, []);

  return <></>;
}

export const CookieToken = ({ token }: { token: string|undefined }) => {
  useEffect(() => {
    cookieToken(token);
  }, []);

  return <></>;
}

export const SessionToken = ({ token }: { token: string|undefined }) => {

  const store = useStore(useTokenStore, (state) => state)
  useEffect(() => {
    store?.addToken(token)
  }, []);


  return <></>;
}

