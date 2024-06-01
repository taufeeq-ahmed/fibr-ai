import { Input } from '@/components/ui/input';
import supabase from '@/db/supabase';
import ListPagesItem from '@/page-components/dashboard-page/ListPagesItem';
import React from 'react';

const getAllLandingPages = async () => {
  const { data: pages } = await supabase
    .from('pages')
    .select('*');
  return pages;
};

async function Dashboard() {
  const pages = await getAllLandingPages();

  return (
    <div className="p-8 ">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">List of all the Landing Pages</h2>
        <Input
          placeholder="Search for Pages"
          className="w-[600px]"
        />
      </div>
      <ul className="flex flex-col gap-4 ">
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
