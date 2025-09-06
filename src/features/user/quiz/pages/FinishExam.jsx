import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import finishexam from "../../../../assets/images/icons/finishexam.jpg";
import success from "../../../../assets/images/success.json";
import translate from "../../../../locale/translate";

export default function ScoreSummary() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center px-4 py-10">
            {!showContent ? (
                <div className="w-40 h-40">
                    <Lottie
                        animationData={success}
                        loop={false}
                        autoplay
                    />
                </div>
            ) : (
                <div className="w-full max-w-xl mx-auto bg-white/30 backdrop-blur-md rounded-2xl px-6 py-10 flex flex-col items-center space-y-6 border border-white/40">
                    <div className="relative">
                        <img
                            src={finishexam}
                            alt={translate.altdescription}
                            className="w-40 h-auto rounded-xl shadow-md"
                        />
                        <HiCheckCircle className="absolute -top-3 -right-3 w-8 h-8 text-green-500 bg-white rounded-full shadow" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
                        {translate.congratsfinishtest}
                    </h2>

                    <Link to="/tests">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-6 py-3 transition">
                            {translate.moretests}
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}
