'use client';

import { Input } from '@/components/ui/input';
import supabase from '@/db/supabase';
import ListPagesItem from '@/page-components/dashboard-page/ListPagesItem';
import React, { useEffect, useState } from 'react';

const getAllLandingPages = async () => {
  const { data: pages } = await supabase
    .from('pages')
    .select('*');
  return pages;
};

type Page = {
  title:string,
  description:string,
  isLive: boolean,
  slug:string
}

function Dashboard() {
  const [pages, setPages] = useState<Page[]>([]);
  const [query, setQuery] = useState<string>('');

  let filteredPages = pages;

  useEffect(() => {
    getAllLandingPages().then(
      (allPages) => setPages(allPages!),
    );
  }, []);

  if (query.length !== 0) {
    filteredPages = pages.filter(
      (page) => page.title.toLowerCase().includes(query),
    );
  }

  return (
    <div className="p-8 ">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">List of all the Landing Pages</h2>
        <Input
          placeholder="Search for Pages"
          className="w-[600px]"
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
        />
      </div>
      <ul className="flex flex-col gap-4 ">
        {filteredPages?.map((pg) => (
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
