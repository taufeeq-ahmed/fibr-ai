'use client';

import React from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';

import CreateForm from '../../../page-components/create-page/create-form';

type Inputs = {
  title: string
  description: string
}

function CreatePage() {
  const formControls:UseFormReturn<Inputs> = useForm<Inputs>();
  const { watch } = formControls;

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex">
      <CreateForm
        onSubmit={onSubmit}
        formControls={formControls}
      />
      <div className="w-1/3 flex justify-center items-center">
        <div
          className="preview border-2 bg-black w-[390px] h-[844px] rounded-md text-white p-4"
        >
          <h2 className="text-[36px] mb-4">{watch('title')}</h2>
          <p>{watch('description')}</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
