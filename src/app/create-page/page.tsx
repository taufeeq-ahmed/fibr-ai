'use client';

import React from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { CreatePageInputs } from '@/types/create-page';
import ViewPage from '@/page-components/create-page/preview-page';

import supabase from '@/db/supabase';
import { toKebabCase } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CreateEditForm from '@/page-components/create-page/create-edit-form';

function CreatePage() {
  const formControls:UseFormReturn<CreatePageInputs> = useForm<CreatePageInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<CreatePageInputs> = async (data) => {
    const { title, description, isLive } = data;
    await supabase
      .from('pages')
      .upsert({
        title,
        description,
        slug: toKebabCase(title),
        isLive,
      })
      .select();
    toast.success('Landing Page is created Successfully');
    router.push('/dashboard');
  };

  return (
    <div className="flex">
      <CreateEditForm
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
