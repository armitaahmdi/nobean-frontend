import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrPowerReset } from "react-icons/gr";
import mainLogo from "../../assets/images/logo/main-logo.png";
import translate from "../../locale/translate";
import { verifyOtp, clearError } from "./slices/loginSlice";
import { resendOtp, clearOtpError, decrementCooldown } from "./slices/otpSlice";

const schema = yup.object({
    otp: yup.string().required("کد تأیید الزامی است").length(5, "کد باید ۵ رقمی باشد"),
});

export default function OtpForm({ mobile, onSubmit, onBack }) {
    const dispatch = useDispatch();
    
    // Get auth and OTP state from Redux
    const { isLoading: authLoading, error: authError, mobile: storedMobile } = useSelector((state) => state.auth);
    const { isLoading: otpLoading, error: otpError, resendCooldown, canResend } = useSelector((state) => state.otp);
    
    // Use mobile from props or Redux state
    const currentMobile = mobile || storedMobile;
    
    const isLoading = authLoading || otpLoading;
    const error = authError || otpError;

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
    const [otpValidationError, setOtpValidationError] = useState(false);

    // Countdown timer effect
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => {
                dispatch(decrementCooldown());
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown, dispatch]);

    // Clear errors when component mounts
    useEffect(() => {
        dispatch(clearError());
        dispatch(clearOtpError());
    }, [dispatch]);

    const handleResend = async () => {
        if (!canResend || !currentMobile) return;
        
        try {
            const result = await dispatch(resendOtp(currentMobile));
            
            if (resendOtp.fulfilled.match(result)) {
                toast.success("کد تأیید مجدداً ارسال شد", {
                    className: "text-lg font-semibold",
                });
            } else if (resendOtp.rejected.match(result)) {
                toast.error(result.payload || "خطا در ارسال مجدد کد", {
                    className: "text-lg font-semibold",
                });
            }
        } catch (error) {
            toast.error("خطا در ارسال مجدد کد", {
                className: "text-lg font-semibold",
            });
        }
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

    const onValidSubmit = async (data) => {
        if (!currentMobile) {
            toast.error("شماره موبایل یافت نشد", {
                className: "text-lg font-semibold",
            });
            return;
        }
    
        try {
            // ⚠️ تغییر به phone و code
            const result = await dispatch(verifyOtp({ phone: currentMobile, code: data.otp }));
            
            if (verifyOtp.fulfilled.match(result)) {
                setOtpValidationError(false);
                toast.success("ورود با موفقیت انجام شد", {
                    className: "text-lg font-semibold",
                });
    
                if (onSubmit) onSubmit(data);
            } else if (verifyOtp.rejected.match(result)) {
                setOtpValidationError(true);
                toast.error(result.payload || "کد وارد شده اشتباه است", {
                    className: "text-lg font-semibold",
                });
    
                // ⚠️ اصلاح دسترسی به refها
                inputsRef.current.forEach((el) => el?.value && (el.value = ""));
                setValue("otp", "");
                focusInput(0);
            }
        } catch (error) {
            setOtpValidationError(true);
            toast.error("خطا در تأیید کد", {
                className: "text-lg font-semibold",
            });
    
            // ⚠️ اصلاح دسترسی به refها
            inputsRef.current.forEach((el) => el?.value && (el.value = ""));
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
                        {currentMobile}
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
                                              ${otpValidationError ? "border-red-500" : "border-gray-300"}`}
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
                    {canResend ? (
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={isLoading}
                            className="text-md flex items-center bg-lightBlue hover:bg-darkBlue text-white rounded-[25px] px-9 py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <GrPowerReset className="ml-4" />
                            {isLoading ? "در حال ارسال..." : translate.sendagainotp}
                        </button>
                    ) : (
                        <p className="text-sm text-gray-600">
                            {String(Math.floor(resendCooldown / 60)).padStart(2, '0')}:
                            {String(resendCooldown % 60).padStart(2, '0')}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
