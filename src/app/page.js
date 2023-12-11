'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function Home() {
  const Router = useRouter();
  useEffect(() => {
    Router.push('/level/1');
  }, []);
  return <></>;
}
