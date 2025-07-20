import Head from "next/head";

const SEO = ({ title, description, type = "website", name, page }) => {
  const url = `${process.env.NEXT_PUBLIC_CLIENT_URL}/${page}`;

  return (
    <Head>
      <meta name="author" content="5KSANA" />
      <meta name="robots" content="index, follow" />
      <meta
        name="google-site-verification"
        content="5rlIsYny0bY8Wc7RUj6ekpKOSafkNWLaHZ1HFN186uE"
      />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:site_name" content={url} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/banner.jpg" />
      <meta property="og:image:width" content="1600" />
      <meta property="og:image:height" content="800" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="BuyBitArt.com" />
      <meta property="og:site_name" content="BuyBitArt.com" />

      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/banner.jpg" />
      <meta name="twitter:image:width" content="1600" />
      <meta name="twitter:image:height" content="800" />
      <meta name="twitter:site" content="@5Ksana" />
      <meta name="twitter:image:alt" content="BuyBitArt.com" />
    </Head>
  );
};

export default SEO;
