import { ReactNode, useState } from 'react';
import Head from 'next/head';
import { Cabin, Julius_Sans_One, Be_Vietnam_Pro } from 'next/font/google';



interface LayoutProps {
  children: ReactNode;
}

const cabin = Cabin({
  subsets: ['latin'],
  variable: '--font-cabin',
  weight: '400',
});
const julius = Julius_Sans_One({
  subsets: ['latin'],
  variable: '--font-julius',
  weight: '400',
})
const vietnam = Be_Vietnam_Pro({
  subsets: ['latin'],
  variable: '--font-vietnam',
  weight: '400',
})

const RootLayout = ({ children }: LayoutProps) => {

  return (<>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>Da Vinci Institute</title>
    </Head>
    <div className={`${cabin.variable} ${julius.variable} ${vietnam.variable}`}>

      <main className='overflow-x-hidden'>{children}</main>

    </div>
  </>);
};

export default RootLayout;
