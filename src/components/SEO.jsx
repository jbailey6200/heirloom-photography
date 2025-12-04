import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = 'website'
}) {
  const siteName = 'Heirloom & Co. Photography';
  const defaultDescription = 'Wedding and lifestyle photographer serving Cullman, Huntsville, Decatur, and North Alabama. Creating heirlooms your family will treasure for generations.';
  const defaultImage = 'https://heirloomandcophotography.vercel.app/og-image.png';
  const baseUrl = 'https://heirloomandcophotography.vercel.app/';
  
  const pageTitle = title 
    ? `${title} | ${siteName}` 
    : `${siteName} | Wedding Photographer Cullman, Huntsville & North Alabama`;
  
  const pageDescription = description || defaultDescription;
  const pageImage = image || defaultImage;
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={pageUrl} />
    </Helmet>
  );
}
