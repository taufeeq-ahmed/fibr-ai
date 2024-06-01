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
  description:string
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

  const formControls:UseFormReturn<EditPageInputs> = useForm<EditPageInputs>(
    { defaultValues: page },
  );

  const { watch } = formControls;
  const router = useRouter();

  const onSubmit: SubmitHandler<EditPageInputs> = async (data) => {
    const { title, description } = data;

    await supabase
      .from('pages')
      .upsert({
        title,
        description,
        slug: toKebabCase(title),
      })
      .select();
    toast.success('Landing Page is Updated Successfully');
    router.push('/dashboard');
  };

  return (
    <div className="flex">
      <CreateEditForm
        onSubmit={onSubmit}
        formControls={formControls}
        defaultValues={page}
      />

      <MobileView
        title={watch('title') || page?.title || ''}
        description={watch('description') || page?.description || ''}
      />
    </div>
  );
}

export default EditPage;
