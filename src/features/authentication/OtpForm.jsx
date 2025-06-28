import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrPowerReset } from "react-icons/gr";
import mainLogo from "../../assets/images/logo/main-logo.png";
import translate from "../../locale/translate";

const schema = yup.object({
    otp: yup.string().required("کد تأیید الزامی است").length(5, "کد باید ۵ رقمی باشد"),
});

export default function OtpForm({ mobile, onSubmit, onBack }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const inputsRef = useRef([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [resendVisible, setResendVisible] = useState(false);
    const [otpError, setOtpError] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setResendVisible(true);
        }
    }, [timeLeft]);

    const handleResend = () => {
        setTimeLeft(60);
        setResendVisible(false);
        // اینجا تابع ارسال مجدد SMS رو صدا بزن اگه داری
    };


    const focusInput = (index) => {
        const el = inputsRef.current[index];
        if (el) el.focus();
    };

    const handleOtpInput = (e, index) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length > 1) {
            value.split("").forEach((digit, i) => {
                const el = inputsRef.current[i];
                if (el) el.value = digit;
            });
            const otp = value.slice(0, 5);
            setValue("otp", otp);
            focusInput(otp.length < 5 ? otp.length : 4);
            if (otp.length === 5) {
                handleSubmit(onValidSubmit)();
            }
            return;
        }

        if (value) {
            e.target.value = value;
            if (index < 4) focusInput(index + 1);
        }

        const currentOtp = inputsRef.current.map((el) => el?.value || "").slice(0, 5).join("");
        setValue("otp", currentOtp);
        if (currentOtp.length === 5) {
            handleSubmit(onValidSubmit)();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (!inputsRef.current[index].value && index > 0) {
                focusInput(index - 1);
            }
        }
    };

    const onValidSubmit = (data) => {
        const isValidOtp = data.otp === "12345"; // شبیه‌سازی پاسخ صحیح

        if (isValidOtp) {
            setOtpError(false);
            toast.success("ورود با موفقیت انجام شد", {
                className: "text-lg font-semibold",
            });
            onSubmit(data);
        } else {
            setOtpError(true);
            toast.error("کد وارد شده اشتباه است", {
                className: "text-lg font-semibold",
            });
            inputsRef.current.forEach((el) => {
                if (el) el.value = "";
            });

            setValue("otp", "");
            focusInput(0);
        }
    };

    useEffect(() => {
        focusInput(0);
    }, []);

    return (
        <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl px-8 py-10 flex flex-col items-center gap-8 border border-white/30">
            <img src={mainLogo} alt={translate.altdescription} className="w-48 mb-4" />

            <div className="text-center space-y-3">
                <h2 className="text-xl text-right py-3 font-bold">{translate.otp}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                    لطفاً کد ۵ رقمی ارسال شده به شماره{" "}
                    <span
                        className="text-blue-600 underline cursor-pointer"
                        onClick={onBack}
                    >
                        {mobile}
                    </span>{" "}
                    را وارد کنید.
                </p>
            </div>

            <form onSubmit={handleSubmit(onValidSubmit)} className="w-full space-y-6">
                <Controller
                    name="otp"
                    control={control}
                    defaultValue=""
                    render={() => (
                        <div className="flex justify-center gap-3" dir="ltr">
                            {Array(5)
                                .fill("")
                                .map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70 backdrop-blur-md
                                              ${otpError ? "border-red-500" : "border-gray-300"}`}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        onChange={(e) => handleOtpInput(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                    />
                                ))}
                        </div>
                    )}
                />
                {errors.otp && (
                    <p className="text-sm text-red-600 text-center">{errors.otp.message}</p>
                )}

                <div className="pt-5 flex justify-center text-center">
                    {resendVisible ? (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="text-md flex items-center bg-lightBlue hover:bg-darkBlue text-white rounded-[25px] px-9 py-3 cursor-pointer"
                        >
                            <GrPowerReset className="ml-4" />
                            {translate.sendagainotp}
                        </button>
                    ) : (
                        <p className="text-sm text-gray-600">
                            {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
                            {String(timeLeft % 60).padStart(2, '0')}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
