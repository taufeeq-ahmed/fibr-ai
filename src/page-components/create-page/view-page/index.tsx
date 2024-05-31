import { CreatePageInputs } from '@/types/create-page';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type ViewPageProps={
    formControls : UseFormReturn<CreatePageInputs>
}

function ViewPage({ formControls }:ViewPageProps) {
  const { watch } = formControls;

  return (
    <div className="w-1/3 flex justify-center items-center scale-90">
      <div
        className="preview border-2 bg-black w-[390px] h-[844px] rounded-md text-white p-4"
      >
        <h2 className="text-[36px] mb-4">{watch('title')}</h2>
        <p>{watch('description')}</p>
      </div>
    </div>
  );
}

export default ViewPage;
