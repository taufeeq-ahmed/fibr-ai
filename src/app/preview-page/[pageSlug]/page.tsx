'use client';

import React, { useEffect, useState } from 'react';
import supabase from '@/db/supabase';
import MobileView from '@/components/ui/mobileview';
import { Button } from '@/components/ui/button';
import { CiMedicalClipboard } from 'react-icons/ci';
import { toast } from 'sonner';

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
  buyLink:string
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

  const {
    title, description, imageUrl, buyLink,
  } = page;

  const handleCopy = () => {
    const publicUrl = window.location.href;
    navigator.clipboard.writeText(publicUrl);

    toast.success('Url copied to clipboard successfully');
  };

  return (
    <section className="flex justify-between items-center gap-4 w-[50%] m-auto">
      <MobileView
        title={title}
        description={description}
        image={imageUrl}
        buyLink={buyLink}
      />
      <Button
        variant="outline"
        className="flex gap-2"
        onClick={handleCopy}
      >
        <CiMedicalClipboard size={20} />
        Click to copy Public URL
      </Button>
    </section>
  );
}

export default PreviewPage;
