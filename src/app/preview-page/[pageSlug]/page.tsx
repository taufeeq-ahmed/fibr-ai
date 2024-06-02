'use client';

import React, { useEffect, useState } from 'react';
import supabase from '@/db/supabase';
import MobileView from '@/components/ui/mobileview';

const getPage = async (slug:string) => {
  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug);

  return pages?.[0];
};

type Page={
  title: string,
  description:string
  isLive:boolean
  imageUrl:string
}

function PreviewPage({ params }: { params: { pageSlug: string } }) {
  const { pageSlug } = params;

  const [page, setPage] = useState<Page|undefined>();

  useEffect(() => {
    getPage(pageSlug).then((pg) => {
      setPage(pg);
    });
  }, [pageSlug]);

  if (!page) {
    return <h1>Not Found</h1>;
  }

  if (!page.isLive) {
    return <h1>Not Live Yet</h1>;
  }

  const { title, description, imageUrl } = page;

  return (
    <MobileView
      title={title}
      description={description}
      image={imageUrl}
    />
  );
}

export default PreviewPage;
