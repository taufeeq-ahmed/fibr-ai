/* eslint-disable react/require-default-props */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './button';

type MobileViewProps = {
  title: string;
  description: string;
  scale?: 90 | 50 | 75 | 20;
  image: FileList | undefined|string;
  buyLink:string
};

function MobileView({
  title,
  description,
  scale = 90,
  image,
  buyLink,
}: MobileViewProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof (image) !== 'string') {
      const loadImage = async () => {
        if (image && image[0]) {
          const file = image[0];
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              setImageUrl(reader.result);
            }
          };
          reader.readAsDataURL(file);
        }
      };

      loadImage();
    }
  }, [image]);

  return (
    <div className={`mobile-view scale-${scale} border-2 bg-black w-[390px] h-[834px] rounded-md text-white m-1 overflow-hidden`}>
      <div className="header-image h-[30%] overflow-hidden flex justify-center items-center">
        {typeof (image) === 'string' && image ? (
          <Image
            className="h-full w-auto"
            src={image}
            alt="header"
            width={500}
            height={500}
          />
        ) : (
          imageUrl && (
            <Image
              className="h-full w-auto"
              src={imageUrl}
              alt="header"
              width={500}
              height={500}
            />
          )
        )}
      </div>
      <div className="p-4 flex flex-col justify-between h-[70%] ">
        <div>
          <h2 className="text-[36px] mb-4">{title}</h2>
          <p>{description}</p>
        </div>
        {buyLink && (
          <Link href={buyLink} target="_blank">
            <Button className="bg-blue-500 font-semibold w-full mt-2">
              BUY NOW
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MobileView;
