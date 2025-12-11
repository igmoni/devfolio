import Script from 'next/script';
import React from 'react';
import { catConfig } from '@/config/Cat';

export default function OnekoCat() {
  if (!catConfig.enabled) {
    return null;
  }

  return <Script src="/oneko/oneko.js" data-cat="/oneko/oneko-vaporwave.gif"  />;
}