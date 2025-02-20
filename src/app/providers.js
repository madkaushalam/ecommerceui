'use client';
import { Provider } from 'react-redux';
import {store} from '@/redux/store';
import { SessionProvider } from 'next-auth/react';

export function ReduxProviders({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export function SessionProviders({ children, session}) {
  return (<SessionProvider session={session}>
      {children}
    </SessionProvider>);
}