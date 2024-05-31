'use client';

import React from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import CreateForm from '../../../page-components/create-page/create-form';
import ViewPage from '../../../page-components/create-page/view-page';

type Inputs = {
  title: string
  description: string
}

function CreatePage() {
  const formControls:UseFormReturn<Inputs> = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
