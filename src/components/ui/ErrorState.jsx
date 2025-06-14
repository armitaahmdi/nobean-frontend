import Lottie from "lottie-react";
import errorAnimation from "../../assets/images/error.json";
import translate from "../../locale/translate";

export default function ErrorState({ message = "مشکلی پیش آمده!" }) {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="flex flex-col items-center text-center">
                <Lottie
                    animationData={errorAnimation}
                    loop
                    style={{ width: 280, height: 280 }}
                />

                <p className="text-lg font-semibold text-[#E74235] mt-4">
                    {message}
                </p>


                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-[#E74235] hover:bg-[#E74235] text-white rounded-md transition"
                >
                    {translate.tryagain}
                </button>
            </div>
        </div>
    );
}
