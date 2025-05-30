import HelmetSeo from "../helper/helmet";
import translate from "../locale/translate";

export default function Podcasts() {
  const { title, description, keywords } = translate.podcasts;

  return (
    <>
      <HelmetSeo title={title} description={description} keywords={keywords} />
      <div>پادکست</div>
    </>
  )
}
