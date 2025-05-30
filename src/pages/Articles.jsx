import HelmetSeo from "../helper/helmet";
import translate from "../locale/translate";

export default function Articles() {
  const { title, description, keywords } = translate.articles;

  return (
    <>
      <HelmetSeo title={title} description={description} keywords={keywords} />
      <div>مقالات</div>
    </>
  )
}
