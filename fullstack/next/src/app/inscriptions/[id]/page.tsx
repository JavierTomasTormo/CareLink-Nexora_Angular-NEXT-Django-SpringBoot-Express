import React from 'react';
import InscriptionForm from '@/components/inscriptions/InscriptionForm';

export default function InscriptionPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <InscriptionForm activityId={id} />;
}