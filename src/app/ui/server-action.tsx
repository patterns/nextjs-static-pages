'use client';

import { useEffect } from 'react';
import { cookies } from 'next/headers';

export default function ServerAction({ action }: { action: () => void }) {
  useEffect(() => {
    action();
  }, []);

  return <></>;
}

export function CookieToken(token) {
  useEffect(() => {
    if (token) {
        cookies().set('authorization', token);
    }
  }, []);


  return <></>;
}

