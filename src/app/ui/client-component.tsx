'use client';

import { useEffect } from 'react';
import { cookieToken } from '@/app/lib/actions';

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

