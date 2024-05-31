'use client';

import React from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import { CreatePageInputs } from '@/types/create-page';
import ViewPage from '@/page-components/create-page/view-page';
import CreateForm from '@/page-components/create-page/create-form';

function CreatePage() {
  const formControls:UseFormReturn<CreatePageInputs> = useForm<CreatePageInputs>();

  const onSubmit: SubmitHandler<CreatePageInputs> = (data) => console.log(data);

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
