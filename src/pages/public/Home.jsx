import { Link } from "react-router-dom";
import CategoryCardsSection from "../../features/home/components/CategoryCardsSection";
import FAQSection from "../../features/home/components/FAQSection";
import PopularItemsSection from "../../features/home/components/PopularItemsSection";
import RelatedDisordersSection from "../../features/home/components/RelatedDisordersSection";
import SearchBar from "../../features/home/components/SearchBar";
import ServicesSection from "../../features/home/components/ServicesSection";
import SuggestedArticlesSection from "../../features/home/components/SuggestedArticlesSection";
import TestimonialsSection from "../../features/home/components/TestimonialsSection";
import TopConsultantsSection from "../../features/home/components/TopConsultantsSection";
import useIsMobile from "../../hooks/useIsMobile";
import mainbannerphone from "../../assets/images/banner/mainbannerphone.jpg";
import mainbanner from "../../assets/images/banner/mainbanner.jpg";

export default function Home() {
  const isMobile = useIsMobile(768); // 768px = md breakpoint در Tailwind

  return (
    <>
      <div className="mt-2 mb-8">
        <SearchBar />
      </div>
      {/* Hero Banner - First Section */}
      <div className="mx-auto max-w-7xl px-4 my-4 sm:px-6 md:px-8">
        <Link to="/tests" aria-label="رفتن به صفحه آزمون‌ها">
        <img 
          src={isMobile ? mainbannerphone : mainbanner} 
          alt="Hero Banner" 
            className="w-full h-auto rounded-lg shadow-md cursor-pointer"
        />
        </Link>
      </div>

      {/* <CategoryCardsSection /> */}
      <ServicesSection />
      {/* <PopularItemsSection /> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <TestimonialsSection />
        <div className="mt-16">
          <RelatedDisordersSection />
        </div>
      </div>
      {/* <TopConsultantsSection /> */}
      {/* <SuggestedArticlesSection /> */}
      <FAQSection />
    </>
  )
}
