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
    const {
      title, description, isLive, headerImage,
    } = data;

    let imageUrl = '';

    if (headerImage && headerImage?.[0]) {
      const imageFile = headerImage[0];

      const { data: uploadData } = await supabase.storage
        .from('imagesBucket')
        .upload(`public/${imageFile.name}`, imageFile);

      if (uploadData?.path) {
        const { path } = uploadData;
        imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/imagesBucket/${path}`;
      }
    }
    await supabase
      .from('pages')
      .upsert({
        title,
        description,
        slug: toKebabCase(title),
        isLive,
        imageUrl,
      })
      .select();
    toast.success('Landing Page is created Successfully');
    router.push('/dashboard');
  };

  return (
    <div className="flex">
      <CreateEditForm
        mode="create"
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
