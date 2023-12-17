'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Modal from './components/Modal';
import { Button } from '@heathmont/moon-core-tw';
import Image from 'next/image';

export default function Home() {
  const Router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     Router.push('/level/1');
  //   }, 10000);
  // }, []);

  return (
    <>
      <div className='flex-col text-center py-12'>
        <div className='font-origin-tech-demo text-4xl font-bold text-gray-200'>
          logistic
          <br /> planning
        </div>
        <div className='flex justify-center items-center my-8 gap-4'>
          <div>
            <Image src='/assets/yellow-shop.png' width={120} height={120} alt="shop" />
          </div>
          <div className='flex md:w-72 w-20 h-1 border-t-2 border-dashed border-yellow-500 rounded'></div>
          <div>
            <Image src='/assets/yellow-warehouse.png' width={120} height={120} alt="warehouse" />
          </div>
        </div>
        <div className='bg-white text-black md:mx-52 m-8 text-left'>
          <div className='p-4 border-b-2 border-beerus '>
            <h3 className='text-moon-18 text-bulma font-bold '>How to Play?</h3>
          </div>
          <div className='p-4'>
            <p className='text-moon-sm text-trunks'>
              Connect the same colored dots to complete the level. You can
              connect the dots horizontally, vertically and try to find out the
              shortest path.
            </p>
          </div>
          <div className='p-4 border-t-2 border-beerus'>
            <Button
              onClick={() => Router.push('/level/1')}
              className='border-2'
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
