import { CreatePageInputs } from '@/types/create-page';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

type PreviewPageProps =
  | { formControls: UseFormReturn<CreatePageInputs> }
  | { title: string; description: string };

function PreviewPage(props: PreviewPageProps) {
  if ('formControls' in props) {
    const { formControls } = props;
    const { watch } = formControls;

    return (
      <div className="w-1/3 flex justify-center items-center scale-90">
        <div className="preview border-2 bg-black w-[390px] h-[844px] rounded-md text-white p-4">
          <h2 className="text-[36px] mb-4">{watch('title')}</h2>
          <p>{watch('description')}</p>
        </div>
      </div>
    );
  }
  const { title, description } = props;
  return (
    <div className="flex justify-center items-center scale-20 ">
      <div className="preview border-2 bg-black w-[390px] h-[844px] rounded-md text-white p-4">
        <h2 className="text-[36px] mb-4">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default PreviewPage;