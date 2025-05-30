import HelmetSeo from "../helper/helmet";
import translate from "../locale/translate"

export default function Tests() {
  const { title, description, keywords } = translate.tests;
 
  return (
    <>
      <HelmetSeo title={title} description={description} keywords={keywords} />
      <div>آزمون ها</div>
      {title}
    </>
  )
}
