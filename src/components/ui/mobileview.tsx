/* eslint-disable react/require-default-props */
import React from 'react';

type MobileViewProps={
    title:string,
    description:string,
    scale?: 90 | 50 | 75 | 20
}

function MobileView({ title, description, scale = 90 }:MobileViewProps) {
  return (
    <div className={`mobile-view scale-${scale} border-2 bg-black w-[390px] h-[844px] rounded-md text-white p-4`}>
      <h2 className="text-[36px] mb-4">{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default MobileView;
