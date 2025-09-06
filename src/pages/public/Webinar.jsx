import WebinarHero from '../../features/user/webinar/components/WebinarHero'
import WebinarPage from "../../features/user/webinar/WebinarPage"
import { useRef } from "react";

export default function Webinar() {
  const priceRef = useRef(null);

  const scrollToPrice = () => {
    priceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <WebinarHero scrollToPrice={scrollToPrice} />
      <WebinarPage priceRef={priceRef} />
    </div>
  )
}