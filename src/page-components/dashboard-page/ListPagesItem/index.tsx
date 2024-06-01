import { MdOutlinePreview, MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { truncateText } from '@/lib/utils';
import Pulse from '@/components/ui/pulse';

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
    <div className="border-2 rounded-md p-4 flex-col justify-between">
      <div className="flex items-center justify-between mb-2 gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="flex items-center gap-2 border-2 px-2 rounded-md text-sm">
          <Pulse active={isLive} />
          <span>{isLive ? 'Live' : 'Not Live'}</span>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-start">
        <div className="flex flex-col justify-start">
          <p className="text-ellipsis">
            {truncateText(description, 300)}
          </p>
        </div>

        <div className=" flex gap-2 justify-between items-end w-full">

          <div className="flex gap-2">
            <Link href={`/preview-page/${slug}`}>
              <Button
                className="font-lg flex gap-2"
                variant="outline"
              >
                {' '}
                <MdOutlinePreview size={20} />
                Preview
                {' '}
              </Button>
            </Link>

            <Link href={`/edit-page/${slug}`}>
              <Button
                className="font-lg flex gap-2 "
                variant="outline"
              >
                {' '}
                <FaEdit size={15} />
                Edit
                {' '}
              </Button>
            </Link>
          </div>

          <Button
            className="font-lg flex gap-2 bg-white  "
            variant="outline"
          >
            {' '}
            <MdDeleteForever size={20} />
            Delete
            {' '}
          </Button>
        </div>
      </div>

    </div>
  );
}
export default ListPagesItem;
