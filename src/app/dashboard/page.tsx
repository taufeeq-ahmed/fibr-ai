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
