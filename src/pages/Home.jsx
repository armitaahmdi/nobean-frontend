import Lottie from "lottie-react";
import underconstruction from "../assets/images/UnderConstruction.json";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center m-10 p-6">
      <div className="w-80 md:w-96 shadow-md">
        <Lottie animationData={underconstruction} loop={true} />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">
        این صفحه در حال ساخت است
      </h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        در حال توسعه بخش‌های مختلف سایت هستیم. لطفاً به‌زودی دوباره سر بزنید!
      </p>
    </div>
  );
}
