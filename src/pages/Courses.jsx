import HelmetSeo from "../helper/helmet";
import translate from "../locale/translate";

export default function Courses() {
  const { title, description, keywords } = translate.courses;

  return (
    <>
      <HelmetSeo title={title} description={description} keywords={keywords} />
      <div>دوره های توسعه فردی</div>
    </>
  )
}
