import CategoryCardsSection from "../features/home/components/CategoryCardsSection";
import FAQSection from "../features/home/components/FAQSection";
import PopularItemsSection from "../features/home/components/PopularItemsSection";
import RelatedDisordersSection from "../features/home/components/RelatedDisordersSection";
import SearchBar from "../features/home/components/SearchBar";
import ServicesSection from "../features/home/components/ServicesSection";
import SuggestedArticlesSection from "../features/home/components/SuggestedArticlesSection";
import TestimonialsSection from "../features/home/components/TestimonialsSection";
import TopConsultantsSection from "../features/home/components/TopConsultantsSection";

export default function Home() {
  return (
    <>
      <div className="mt-10">
        <SearchBar />
      </div>

      <CategoryCardsSection />
      <ServicesSection />
      <PopularItemsSection />
      <div className="mx-auto max-w-full sm:max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="bg-blue-200/25 backdrop-blur-md rounded-lg shadow-lg p-6">
          <TestimonialsSection />
          <RelatedDisordersSection />
        </div>
      </div>
      <TopConsultantsSection />
      <SuggestedArticlesSection />
      <FAQSection />
    </>
  )
}
