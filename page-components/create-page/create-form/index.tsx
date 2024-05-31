import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

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

type Inputs = {
    title: string
    description: string
}

type CreateFormProps={
    formControls : UseFormReturn<Inputs>
    onSubmit:SubmitHandler<Inputs>
}

function CreateForm({ onSubmit, formControls }: CreateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }:UseFormReturn<Inputs> = formControls;

  return (
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
  );
}

export default CreateForm;
