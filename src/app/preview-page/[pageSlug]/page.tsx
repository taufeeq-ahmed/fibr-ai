import React from 'react';
import supabase from '@/db/supabase';
import MobileView from '@/components/ui/mobileview';

const getPage = async (slug:string) => {
  const { data: pages } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug);

  return pages?.[0];
};

async function PreviewPage({ params }: { params: { pageSlug: string } }) {
  const { pageSlug } = params;
  const page = await getPage(pageSlug);

  if (!page) {
    return <h1>Not Found</h1>;
  }

  if (!page.isLive) {
    return <h1>Not Live Yet</h1>;
  }

  const { title, description } = page;

  return (
    <MobileView
      title={title}
      description={description}
    />
  );
}

export default PreviewPage;
