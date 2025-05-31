/* eslint-disable no-unused-vars */
import { useState } from "react";
import LoginForm from "./LoginForm";
import OtpForm from "./OtpForm";

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
        alert("ورود موفقیت‌آمیز بود");
        setStep("login");
        setMobile(null);
    };

    return (
        <div className="w-full flex items-center justify-center px-4">
            {step === "login" && <LoginForm onSubmit={handleLoginSubmit} />}
            {step === "otp" && (
                <OtpForm
                    mobile={mobile}
                    onSubmit={handleOtpSubmit}
                    onBack={() => setStep("login")}
                />
            )}
        </div>
    );
}