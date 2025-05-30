import { FaInstagram, FaTelegramPlane, FaLinkedin } from "react-icons/fa";
import mainLogo from "../../assets/images/logo/main-logo.png";
import translate from "../../locale/translate";
import enamadLogo from "../../assets/images/logo/enamadLogo.png"

export default function Footer() {
    return (
        <footer style={{ background: "linear-gradient(180deg, #F7F7F7 -0.01%, #629BF7 201.2%)" }}
            className="bg-gray-100 text-gray-700 py-6 px-4">
            <div className="px-12 mx-auto flex flex-col gap-5">

                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center justify-between w-full">
                        <img src={mainLogo} alt={translate.altdescription} className="w-[100px]" />
                        <hr className="w-full border-t-[2px] border-[#ADADAD] mx-2 my-2" />
                        <div className="flex gap-3 text-xl text-blue-600">
                            <FaInstagram className="hover:text-blue-800 cursor-pointer" />
                            <FaTelegramPlane className="hover:text-blue-800 cursor-pointer" />
                            <FaLinkedin className="hover:text-blue-800 cursor-pointer" />
                        </div>
                    </div>
                    <h3 className="text-[20px] font-semibold text-black">{translate.footerTitle}</h3>
                    <p className="text-[16px] leading-relaxed">
                        {translate.footerDescription}
                    </p>
                </div>


                <div className="flex flex-col md:flex-row gap-10 justify-between">
                    <div>
                        <h4 className="font-bold text-darkBlue mb-2">بخش‌های مهم سایت</h4>
                        <ul className="text-sm space-y-1">
                            <li><a href="/tests" className="hover:text-blue-600 text-black">درباره ما</a></li>
                            <li><a href="/tests" className="hover:text-blue-600 text-black">آزمون‌ها</a></li>
                            <li><a href="/courses" className="hover:text-blue-600 text-black">دوره‌های توسعه فردی</a></li>
                            <li><a href="/consulting" className="hover:text-blue-600 text-black">مقالات</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-darkBlue mb-2">صفحات مهم</h4>
                        <ul className="text-sm space-y-1">
                            <li><a href="/about-us" className="hover:text-blue-600 text-black">دوره‌های توسعه فردی</a></li>
                            <li><a href="/contact" className="hover:text-blue-600 text-black">آزمون‌ وکسلر</a></li>
                            <li><a href="/faq" className="hover:text-blue-600 text-black">مهارت کنترل خشم</a></li>
                            <li><a href="/faq" className="hover:text-blue-600 text-black">رفتار با فرزند خود</a></li>
                        </ul>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <img src={enamadLogo} alt={translate.altdescription} className="w-[120px] h-[160px] rounded-[20px]" />
                    </div>
                </div>

                <div className="text-xs leading-relaxed text-center text-[14px] text-black">
                    {translate.copyright}
                </div>
            </div>
        </footer>
    );
}