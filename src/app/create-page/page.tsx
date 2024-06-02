'use client';

import React from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { CreatePageInputs } from '@/types/create-page';

import supabase from '@/db/supabase';
import { toKebabCase } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CreateEditForm from '@/page-components/create-page/create-edit-form';
import MobileView from '@/components/ui/mobileview';

function CreatePage() {
  const formControls:UseFormReturn<CreatePageInputs> = useForm<CreatePageInputs>();

  const router = useRouter();
  const { watch } = formControls;

  const onSubmit: SubmitHandler<CreatePageInputs> = async (data) => {
    const {
      title, description, isLive, headerImage, buyLink,
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
        buyLink,
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
      <MobileView
        title={watch('title')}
        description={watch('description')}
        image={watch('headerImage')}
        buyLink={watch('buyLink')}
      />
    </div>
  );
}

export default CreatePage;
