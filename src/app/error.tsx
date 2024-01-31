'use client';
import { Ban } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { ErrorProps } from '@/types';

const Error: React.FC<ErrorProps> = (props) => {
  const { error } = props;

  const onRefresh = () => {
    window.location.href = '/';
  };

  return (
    <section className='h-full grid items-center'>
      <div className='mx-auto max-w-screen-sm text-center grid gap-3'>
        <Ban className='m-auto w-[100px] h-[100px] text-red-500' />

        <p className='text-3xl tracking-tight font-bold text-gray-900'>
          Something went wrong
        </p>
        <p className='text-lg font-light text-gray-500'>
          {`Sorry, we couldn't fetch the data. You'll find lots to explore on the
            home page.`}
        </p>
        <Button onClick={onRefresh}>Go to Home</Button>
      </div>
    </section>
  );
};

export default Error;
