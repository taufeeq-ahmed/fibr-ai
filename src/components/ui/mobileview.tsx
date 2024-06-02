/* eslint-disable react/require-default-props */
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

type MobileViewProps = {
  title: string;
  description: string;
  scale?: 90 | 50 | 75 | 20;
  image: FileList | undefined|string;
};

function MobileView({
  title,
  description,
  scale = 90,
  image,
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
    <div className={`mobile-view scale-${scale} border-2 bg-black w-[390px] h-[844px] rounded-md text-white `}>
      <div className="header-image">
        {typeof (image) === 'string' ? (
          <Image
            src={image}
            alt="header"
            width={500}
            height={500}
          />
        ) : (
          imageUrl && (
            <Image
              src={imageUrl}
              alt="header"
              width={500}
              height={500}
            />
          )
        )}
      </div>
      <div className="p-4">
        <h2 className="text-[36px] mb-4">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default MobileView;
