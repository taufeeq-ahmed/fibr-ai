'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Label } from '@/components/ui/label';

type Inputs = {
  title: string
  description: string
}

type ErrorProps={
    field: string
}

function Error({ field }:ErrorProps) {
  return (
    <p className="text-red-500">
      {`Please Enter ${field}`}
    </p>
  );
}

function CreatePage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex">
      <form
        className="w-2/3 flex flex-col gap-4 p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="title">PLease Enter Title</Label>
        <Input
          id="title"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        {errors.title && <Error field="title" /> }

        <Label htmlFor="description">PLease Enter Description</Label>
        <Input
          id="description"
          placeholder="Description"
          {...register('description', { required: true })}
        />
        {errors.description && <Error field="description" /> }

        <Button>
          Save
        </Button>
      </form>
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
