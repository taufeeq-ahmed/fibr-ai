'use client';

import React from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { CreatePageInputs } from '@/types/create-page';
import ViewPage from '@/page-components/create-page/view-page';
import CreateForm from '@/page-components/create-page/create-form';
import supabase from '@/db/supabase';
import { toKebabCase } from '@/lib/utils';
import { useRouter } from 'next/navigation';

function CreatePage() {
  const formControls:UseFormReturn<CreatePageInputs> = useForm<CreatePageInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<CreatePageInputs> = async (data) => {
    const { title, description } = data;

    await supabase
      .from('pages')
      .upsert({
        title,
        description,
        slug: toKebabCase(title),
      })
      .select();

    router.push('/dashboard');
  };

  return (
    <div className="flex">
      <CreateForm
        onSubmit={onSubmit}
        formControls={formControls}
      />
      <ViewPage
        formControls={formControls}
      />
    </div>
  );
}

export default CreatePage;
