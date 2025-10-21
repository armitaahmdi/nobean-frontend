import { HiChevronRight } from "react-icons/hi";
import FaqTab from "../../../../components/tab/shared/FaqTab";
import ReviewsTab from "../../../../components/tab/shared/ReviewsTab";
import socialmedia from "../../../../assets/images/icons/social-media.png";
import faqImage from "../../../../assets/images/icons/faq.png"

function ArticlesDetailsTemp({ sections, articleFAQ, articleReviews }) {
  return (
    <section
      className="max-w-4xl mx-auto p-6 md:p-8 bg-white rounded-2xl border border-gray-100 select-text"
      dir="rtl"
    >
      {sections.map((section, i) => {
        switch (section.type) {
          case "heading":
            if (section.level === 1)
              return (
                <h1
                  key={i}
                  className="mt-12 mb-8 text-3xl md:text-4xl font-bold text-blue-900 tracking-tight relative"
                >
                  <span className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                  {section.text}
                </h1>
              );
            if (section.level === 2)
              return (
                <h2
                  key={i}
                  className="mt-10 mb-6 text-2xl md:text-3xl font-semibold text-blue-800 border-b-2 border-blue-200 pb-2 hover:border-blue-300 transition-colors duration-300"
                >
                  {section.text}
                </h2>
              );
            if (section.level === 3)
              return (
                <h3
                  key={i}
                  className="mt-8 mb-5 text-xl md:text-2xl font-medium text-blue-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {section.text}
                </h3>
              );
            return (
              <h4
                key={i}
                className="mt-6 mb-4 text-lg md:text-xl font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
              >
                {section.text}
              </h4>
            );

          case "text":
            return (
              <p
                key={i}
                className="mb-8 text-lg text-gray-700 leading-8 tracking-wide whitespace-pre-wrap break-words hyphens-auto"
                style={{ 
                  textShadow: "0 0 1px rgba(0,0,0,0.05)",
                  wordBreak: "break-word",
                  overflowWrap: "break-word"
                }}
              >
                {section.text}
              </p>
            );

          case "image":
            return (
              <div
                key={i}
                className="my-8 text-center"
              >
                <div className="inline-block max-w-md mx-auto">
                  <img
                    src={section.src}
                    alt={section.alt || ""}
                    className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  {section.caption && (
                    <div className="mt-3 text-gray-600 text-sm italic">{section.caption}</div>
                  )}
                </div>
              </div>
            );

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="relative bg-gradient-to-r from-blue-50 to-purple-50 border-r-4 border-blue-400 italic my-8 p-6 rounded-xl text-gray-700 text-lg leading-7 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                "{section.text}"
                {section.author && (
                  <div className="mt-4 text-sm text-gray-500 text-left pr-4">
                    — {section.author}
                  </div>
                )}
              </blockquote>
            );

          case "list":
            if (section.ordered) {
              return (
                <ol
                  key={i}
                  className="mb-8 pl-10 list-decimal space-y-4 text-gray-800 text-lg font-medium leading-7"
                >
                  {section.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="hover:text-blue-600 transition-colors duration-300 cursor-default select-text break-words"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              );
            }
            return (
              <ul
                key={i}
                className="mb-8 pl-10 list-disc space-y-4 text-gray-800 text-lg font-medium leading-7"
              >
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-blue-600 transition-colors duration-300 cursor-default select-text break-words"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "code":
            return (
              <pre
                key={i}
                className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto font-mono text-sm mb-8 shadow-lg border border-gray-700 hover:shadow-xl transition-shadow duration-300"
                style={{ userSelect: "all" }}
              >
                {section.code}
              </pre>
            );

          case "video":
            return (
              <div
                key={i}
                className="my-8 text-center"
              >
                <div className="inline-block max-w-lg mx-auto">
                  <video
                    controls
                    src={section.src}
                    className="w-full h-auto rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                  {section.caption && (
                    <div className="mt-3 text-gray-600 text-sm italic">{section.caption}</div>
                  )}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
      {/* پرسش‌های متداول و نظرات کاربران موقتاً غیرفعال شده */}
      {false && (
        <section className="mt-16">
          <h2 className="flex items-center text-2xl font-bold mb-6 border-b border-gray-200 pb-2 gap-3">
            <img src={faqImage} alt="نظرات کاربران" className="w-9 h-9" />
             پرسش‌های متداول
          </h2>
          <FaqTab faq={articleFAQ} />
          <section className="mt-20">
            <h2 className="flex items-center text-2xl font-bold mb-6 border-b border-gray-200 pb-2 gap-3">
              <img src={socialmedia} alt="نظرات کاربران" className="w-9 h-9" />
              نظرات کاربران
            </h2>
            <ReviewsTab reviews={articleReviews} />
          </section>
        </section>
      )}
    </section>
  );
}

export default ArticlesDetailsTemp;
