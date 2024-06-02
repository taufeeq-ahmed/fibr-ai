'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { EditPageInputs } from '@/types/create-page';

import supabase from '@/db/supabase';
import { toKebabCase } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import MobileView from '@/components/ui/mobileview';
import CreateEditForm from '@/page-components/create-page/create-edit-form';

type Page={
  title:string,
  description:string,
  id:number,
  isLive:boolean
  headerImage:FileList
  imageUrl?:string
}

const getPage = async (slug:string) => {
  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug);

  return pages?.[0];
};

function EditPage({ params }:{params:{pageSlug:string}}) {
  const { pageSlug } = params;

  const [page, setPage] = useState<Page>();

  useEffect(() => {
    getPage(pageSlug).then(
      (pg) => setPage(pg),
    );
  }, [pageSlug]);

  const formControls:UseFormReturn<EditPageInputs> = useForm<EditPageInputs>();

  const { watch } = formControls;
  const router = useRouter();

  const onSubmit: SubmitHandler<EditPageInputs> = async (data) => {
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
      .update({
        title,
        description,
        slug: toKebabCase(title),
        isLive,
        imageUrl,
      })
      .eq('id', page?.id)
      .select();
    toast.success('Landing Page is Updated Successfully');
    router.push('/dashboard');
  };

  let image = null;

  const imagesList = watch('headerImage');

  if (imagesList && imagesList.length > 0) {
    image = imagesList;
  } else {
    image = page?.imageUrl;
  }

  return (
    <div className="flex">
      <CreateEditForm
        mode="edit"
        onSubmit={onSubmit}
        formControls={formControls}
        defaultValues={page}
      />

      <MobileView
        title={watch('title') || page?.title || ''}
        description={watch('description') || page?.description || ''}
        image={image}
      />
    </div>
  );
}

export default EditPage;
