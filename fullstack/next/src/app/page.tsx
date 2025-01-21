'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');  // Redirige automáticamente a /home
  }, [router]);

  return null;  // No se renderiza nada en esta página
}
