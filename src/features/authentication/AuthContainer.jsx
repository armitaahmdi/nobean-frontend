/* eslint-disable no-unused-vars */
import { useState } from "react";
import LoginForm from "./LoginForm";
import OtpForm from "./OtpForm";
import { Link } from "react-router-dom";
import translate from "../../locale/translate";
import { IoHome } from "react-icons/io5";

export default function AuthContainer() {
    const [step, setStep] = useState("login");
    const [mobile, setMobile] = useState(null);

    const handleLoginSubmit = (data) => {
        setMobile(data.mobile);
        // اینجا API ارسال کد OTP بزن
        setStep("otp");
    };

    const handleOtpSubmit = (data) => {
        // اینجا API تایید کد OTP بزن
        setStep("login");
        setMobile(null);
    };

    return (
        <div className="w-full relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-8">
            <div className="absolute -top-[50px] -left-[70px] w-[35rem] h-[35rem] bg-[#4286F5] rounded-full opacity-60 blur-[100px] z-0"></div>
            <div className="absolute top-[700px] -right-[50px] w-[35rem] h-[35rem] bg-[#F7BC2D] rounded-full opacity-60 blur-[80px] -translate-y-1/2 z-0"></div>

            <div className="w-full flex flex-col items-center max-w-md relative z-10">
            {step === "login" && <LoginForm onSubmit={handleLoginSubmit} />}
            {step === "otp" && (
                <OtpForm
                    mobile={mobile}
                    onSubmit={handleOtpSubmit}
                    onBack={() => setStep("login")}
                />
            )}

            <Link
                to="/"
                className="mt-6 flex items-center text-gray-800 text-sm hover:text-[15px] transition-transform z-10"
            >
                <IoHome className="ml-1" />
                {translate.returntomainpage}
            </Link>
        </div>
        </div>
    );
}