import React from 'react'
import translate from '../locale/translate';
import HelmetSeo from '../helper/helmet';

export default function Services() {
  const { title, description, keywords } = translate.services;

  return (
    <>
      <HelmetSeo title={title} description={description} keywords={keywords} />
      <div>خدمات سازمانی</div>
    </>
  )
}
