import type { Metadata } from 'next';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Inter } from 'next/font/google';

import { RootLayoutProps } from '@/types';

import './globals.css';

if (process.env.ENV !== 'development') {
  disableReactDevTools();
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FULFLLD | Virtualized List',
  description: 'Virtualized list example without using external library',
};

const RootLayout: React.FC<RootLayoutProps> = (props) => {
  const { children } = props;
  return (
    <html lang='en'>
      <body className={`${inter.className} relative min-h-screen`}>
        <main className='w-screen min-h-screen h-auto p-20'>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
