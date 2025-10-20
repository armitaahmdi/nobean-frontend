import { HiChevronRight } from "react-icons/hi";
import FaqTab from "../../../../components/tab/shared/FaqTab";
import ReviewsTab from "../../../../components/tab/shared/ReviewsTab";
import socialmedia from "../../../../assets/images/icons/social-media.png";
import faqImage from "../../../../assets/images/icons/faq.png"

function ArticlesDetailsTemp({ sections, articleFAQ, articleReviews }) {
  return (
    <section
      className="max-w-4xl mx-auto p-8  rounded-3xl shadow-xl select-text"
      dir="rtl"
    >
      {sections.map((section, i) => {
        switch (section.type) {
          case "heading":
            if (section.level === 1)
              return (
                <h1
                  key={i}
                  className="mt-12 mb-8 text-5xl font-extrabold text-blue-900 tracking-tight flex items-center gap-3 cursor-default"
                >
                  <HiChevronRight className="text-blue-500 w-8 h-8 animate-pulse" />
                  {section.text}
                </h1>
              );
            if (section.level === 2)
              return (
                <h2
                  key={i}
                  className="mt-10 mb-6 text-3xl font-bold text-blue-800 border-b-4 border-blue-300 pb-2 flex items-center gap-2 cursor-default"
                >
                  <HiChevronRight className="text-blue-400 w-6 h-6" />
                  {section.text}
                </h2>
              );
            if (section.level === 3)
              return (
                <h3
                  key={i}
                  className="mt-8 mb-5 text-2xl font-semibold text-blue-700 cursor-default"
                >
                  {section.text}
                </h3>
              );
            return (
              <h4
                key={i}
                className="mt-6 mb-4 text-xl italic text-blue-600 cursor-default"
              >
                {section.text}
              </h4>
            );

          case "text":
            return (
              <p
                key={i}
                className="mb-8 text-lg text-blue-900 leading-relaxed tracking-wide drop-shadow-sm"
                style={{ textShadow: "0 0 1px rgba(0,0,0,0.05)" }}
              >
                {section.text}
              </p>
            );

          case "image":
            return (
              <div
                key={i}
                className="my-12 text-center rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500 cursor-zoom-in"
              >
                <img
                  src={section.src}
                  alt={section.alt || ""}
                  className="mx-auto max-w-full rounded-2xl transform hover:scale-105 transition-transform duration-500"
                />
                {section.caption && (
                  <div className="mt-3 text-blue-600 text-sm italic">{section.caption}</div>
                )}
              </div>
            );

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="relative bg-gradient-to-r from-blue-100 to-blue-50 border-l-8 border-blue-400 italic my-10 p-6 rounded-3xl text-blue-800 shadow-md text-xl"
                style={{
                  fontStyle: "italic",
                  boxShadow:
                    "0 8px 24px rgba(14, 165, 233, 0.25), inset 0 0 12px rgba(59, 130, 246, 0.15)",
                }}
              >
                “{section.text}”
                {section.author && (
                  <div className="mt-4 text-sm text-blue-600 text-left pr-4">
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
                  className="mb-8 pl-10 list-decimal space-y-4 text-blue-900 text-lg font-medium"
                >
                  {section.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="hover:text-blue-600 transition-colors cursor-default select-text"
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
                className="mb-8 pl-10 list-disc space-y-4 text-blue-900 text-lg font-medium"
              >
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:text-blue-600 transition-colors cursor-default select-text"
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
                className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white p-8 rounded-3xl overflow-x-auto font-mono text-lg mb-10 shadow-lg"
                style={{ userSelect: "all" }}
              >
                {section.code}
              </pre>
            );

          case "video":
            return (
              <div
                key={i}
                className="my-12 text-center rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-500"
              >
                <video
                  controls
                  src={section.src}
                  className="mx-auto max-w-full rounded-2xl"
                />
                {section.caption && (
                  <div className="mt-3 text-blue-600 text-sm italic">{section.caption}</div>
                )}
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
