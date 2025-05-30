import { Helmet } from "react-helmet-async";

const defaultSEO = {
    title: "نوبین - بینشی نو در رفتار و مهارت",
    description: "سایت نوبین، مرجع آزمون‌ها، مقالات و دوره‌های توسعه فردی برای شناخت بهتر خودتان.",
    url: "https://yourdomain.com",
    image: "/assets/images/logos/favicon.ico",
    keywords: "خودشناسی, توسعه فردی, آزمون روانشناسی, مقالات روانشناسی",
};

function HelmetSeo({
    title,
    description,
    url,
    image,
    keywords,
    extraMeta = [],
}) {
    const seo = {
        title: title || defaultSEO.title,
        description: description || defaultSEO.description,
        url: url || defaultSEO.url,
        image: image || defaultSEO.image,
        keywords: keywords || defaultSEO.keywords,
    };

    return (
        <Helmet>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="keywords" content={seo.keywords} />
            <link rel="canonical" href={seo.url} />

            {/* Open Graph */}
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:type" content="website" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            {/* Extra meta tags */}
            {extraMeta.map(({ name, content, property }, index) => {
                if (name) return <meta key={index} name={name} content={content} />;
                if (property) return <meta key={index} property={property} content={content} />;
                return null;
            })}
        </Helmet>
    );
}

export default HelmetSeo;
