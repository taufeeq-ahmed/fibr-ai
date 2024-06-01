import { MdOutlinePreview } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

type ListPagesItemProps = {
    title:string,
    description: string,
    isLive: boolean,
    slug:string
}

const truncateText = (desc:string, maxLength:number) => {
  if (desc.length <= maxLength) {
    return desc;
  }
  return `${desc.substring(0, maxLength)}...`;
};

function ListPagesItem({
  title, description, isLive, slug,
}:ListPagesItemProps) {
  return (
    <div className="border-2 rounded-md p-4 h-[200px] flex justify-between">

      <div className="flex flex-col justify-start flex-1">
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-ellipsis">{truncateText(description, 300)}</p>
        <p>{isLive}</p>
      </div>

      <div className="flex flex-col gap-2">

        <Link href={`/preview-page/${slug}`}>
          <Button className="font-lg flex gap-2">
            {' '}
            <MdOutlinePreview size={20} />
            Preview
            {' '}
          </Button>
        </Link>

        <Link href={`/edit-page/${slug}`}>
          <Button className="font-lg flex gap-2">
            {' '}
            <FaEdit size={15} />
            Edit
            {' '}
          </Button>
        </Link>

      </div>

    </div>
  );
}
export default ListPagesItem;
