import supabase from '@/db/supabase';
import PreviewPage from '@/page-components/create-page/preview-page';
import React from 'react';

const getAllLandingPages = async () => {
  const { data: pages } = await supabase
    .from('pages')
    .select('*');
  return pages;
};
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
    <div className="border-2 rounded-md p-4 h-[200px] flex justify-start">

      <PreviewPage title={title} description={description} />

      <div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-ellipsis">{truncateText(description, 300)}</p>
        <p>{isLive}</p>
        <p>{slug}</p>
      </div>
    </div>
  );
}

async function Dashboard() {
  const pages = await getAllLandingPages();
  return (
    <div>
      <ul className="flex flex-col gap-4 p-4 ">
        {pages?.map((pg) => (
          <ListPagesItem
            title={pg.title}
            description={pg.description}
            isLive={pg.isLive}
            slug={pg.slug}
          />
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
