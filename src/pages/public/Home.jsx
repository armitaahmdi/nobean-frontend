import CategoryCardsSection from "../../features/home/components/CategoryCardsSection";
import FAQSection from "../../features/home/components/FAQSection";
import PopularItemsSection from "../../features/home/components/PopularItemsSection";
import RelatedDisordersSection from "../../features/home/components/RelatedDisordersSection";
import SearchBar from "../../features/home/components/SearchBar";
import ServicesSection from "../../features/home/components/ServicesSection";
import SuggestedArticlesSection from "../../features/home/components/SuggestedArticlesSection";
import TestimonialsSection from "../../features/home/components/TestimonialsSection";
import TopConsultantsSection from "../../features/home/components/TopConsultantsSection";
import HeroBanner from "../../components/banner/HeroBanner";
import mainbanner from "../../assets/images/banner/mainbanner.jpeg";

export default function Home() {
  return (
    <>
      <div className="mb-4">
        <SearchBar />
      </div>
      {/* Hero Banner - First Section */}
      {/* <HeroBanner /> */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mb-8">
        <img 
          src={mainbanner} 
          alt="Hero Banner" 
          className="w-full h-auto rounded-lg shadow-md"
        />
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
