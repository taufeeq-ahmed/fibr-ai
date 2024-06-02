/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SubmitHandler, UseFormReturn, Controller } from 'react-hook-form';
import { CreatePageInputs } from '@/types/create-page';
import { Switch } from '@/components/ui/switch';

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

type CreateEditFormProps={
    formControls : UseFormReturn<CreatePageInputs>
    onSubmit:SubmitHandler<CreatePageInputs>
    defaultValues?: {
      title:string,
      description:string,
      isLive:boolean
    }
    mode:'create'|'edit'
}

function CreateEditForm({
  onSubmit, formControls, defaultValues, mode,
}: CreateEditFormProps) {
  const {
    register,
    handleSubmit,
    control, reset,
    formState: { errors },
  }:UseFormReturn<CreatePageInputs> = formControls;

  useEffect(() => {
    if (mode === 'edit') {
      reset({
        title: defaultValues?.title || '',
        description: defaultValues?.description || '',
        isLive: defaultValues?.isLive || false,
      });
    }
  }, [defaultValues, reset, mode]);

  return (
    <form
      className="w-2/3 flex flex-col gap-4 p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label htmlFor="title">PLease Enter Title</Label>
      <Input
        id="title"
        placeholder="Title"
        defaultValue={defaultValues?.title || ''}
        {...register('title', { required: true })}
      />
      {errors.title && <Error field="title" /> }

      <Label htmlFor="description">PLease Enter Description</Label>
      <Input
        id="description"
        placeholder="Description"
        {...register('description', { required: true })}
        defaultValue={defaultValues?.description || ''}
      />
      {errors.description && <Error field="description" /> }

      <Label htmlFor="isLive">Live Status</Label>

      <Controller
        name="isLive"
        control={control}
        defaultValue={defaultValues?.isLive || false}
        render={({ field: { value, onChange } }) => (
          <Switch
            id="isLive"
            checked={value}
            onCheckedChange={(checked) => onChange(checked)}
          />
        )}
      />
      <Button className="bg-[#6879f9]">
        Save
      </Button>
    </form>
  );
}

export default CreateEditForm;
