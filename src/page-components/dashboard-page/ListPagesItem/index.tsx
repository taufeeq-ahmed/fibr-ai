import { MdOutlinePreview, MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { truncateText } from '@/lib/utils';

type ListPagesItemProps = {
    title:string,
    description: string,
    isLive: boolean,
    slug:string
}

function ListPagesItem({
  title, description, isLive, slug,
}:ListPagesItemProps) {
  return (
    <div className="border-2 rounded-md p-4 flex justify-between h-[200px] overflow-hidden">

      <div className="w-6/12 flex flex-col justify-start">
        <h3 className="font-semibold mb-2 text-lg font-bold">{title}</h3>
        <p className="text-ellipsis">
          {truncateText(description, 300)}
        </p>
      </div>

      <div className="w-3/12 flex flex-col gap-2 items-end">

        <Link href={`/preview-page/${slug}`}>
          <Button className="font-lg flex gap-2">
            {' '}
            <MdOutlinePreview size={20} />
            Preview
            {' '}
          </Button>
        </Link>

        <Link href={`/edit-page/${slug}`}>
          <Button
            className="font-lg flex gap-2 text-blue-500 border-blue-500"
            variant="outline"
          >
            {' '}
            <FaEdit size={15} />
            Edit
            {' '}
          </Button>
        </Link>

        <Button
          className="font-lg flex gap-2 bg-white text-red-500 border-red-500"
          variant="outline"
        >
          {' '}
          <MdDeleteForever size={20} />
          Delete
          {' '}
        </Button>

      </div>

    </div>
  );
}
export default ListPagesItem;
