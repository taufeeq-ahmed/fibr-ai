import React from 'react';

type PulseProps = {
  active : boolean
}

function Pulse({ active }:PulseProps) {
  return (
    <span className="relative flex h-3 w-3">
      <span className={`${active && 'animate-ping'} absolute inline-flex h-full w-full rounded-full ${active ? 'bg-green-500' : 'bg-red-500'} opacity-75`} />
      <span className={`relative inline-flex rounded-full h-3 w-3 ${active ? 'bg-green-500' : 'bg-red-500'}`} />
    </span>
  );
}

export default Pulse;
