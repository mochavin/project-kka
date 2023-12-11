'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Modal from './components/Modal';

export default function Home() {
  const Router = useRouter();
  // useEffect(() => {
  //   Router.push('/level/1');
  // }, []);
  return <>
    <Modal />
  </>;
}
