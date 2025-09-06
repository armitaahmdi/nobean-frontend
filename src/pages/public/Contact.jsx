import HelmetSeo from "../../helper/helmet";
import translate from "../../locale/translate";

export default function Contact() {
  const { title, description, keywords } = translate.contact;

  return (
    <>
      <HelmetSeo title={title} description={description} keywords={keywords} />
      <div>ارتباط با ما</div>
    </>
  )
}
