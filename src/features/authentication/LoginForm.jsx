import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../components/shared/Button";
import translate from "../../locale/translate";
import mainLogo from "../../assets/images/logo/main-logo.png";
import { FiPhone } from "react-icons/fi";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { HiExclamationCircle } from "react-icons/hi";
import { sendOtp, setMobile, clearError } from "./slices/loginSlice";

const schema = yup.object({
    mobile: yup
        .string()
        .required("این فیلد نمی‌تواند خالی باشد")
        .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export default function LoginForm({ onSubmit }) {
    const [isFocused, setIsFocused] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    
    // Get auth state from Redux
    const { isLoading, error, otpSent } = useSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const mobileValue = watch("mobile") || "";
    const digitsCount = mobileValue.replace(/\D/g, "").length;
    const isComplete = digitsCount === 11;

    // Handle form submission
    const handleFormSubmit = async (data) => {
        // Prevent multiple submissions
        if (isSubmitting || isLoading) {
            return;
        }

        setIsSubmitting(true);
        try {
            // Dispatch the sendOtp action
            const result = await dispatch(sendOtp(data.mobile));
            
            if (sendOtp.fulfilled.match(result)) {
                // Store mobile number in Redux state
                dispatch(setMobile(data.mobile));
                
                // Show success message
                toast.success("کد تأیید با موفقیت ارسال شد", {
                    className: "text-lg font-semibold",
                });
                
                // Call the parent onSubmit callback to navigate to OTP form
                if (onSubmit) {
                    onSubmit(data);
                }
            } else if (sendOtp.rejected.match(result)) {
                // Error is already handled by the slice, just show toast
                toast.error(result.payload || "خطا در ارسال کد تأیید", {
                    className: "text-lg font-semibold",
                });
            }
        } catch (error) {
            toast.error("خطا در ارسال کد تأیید", {
                className: "text-lg font-semibold",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Clear error when component mounts or when error changes
    useEffect(() => {
        if (error) {
            dispatch(clearError());
        }
    }, [dispatch, error]);

    return (
        <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl px-8 py-10 flex flex-col items-center gap-8 border border-white/30">

            <img src={mainLogo} alt={translate.altdescription} className="w-48 mb-4" />

            <div className="text-center space-y-3">
                <h2 className="text-xl text-right font-bold text-gray-800">{translate.loginOrSignup}</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                    لطفاً جهت ورود یا ثبت‌نام در نوبین، شماره همراه خود را وارد نمایید. <br />
                    ثبت‌نام شما به منزله‌ی تأیید{" "}
                    <span className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition">
                        قوانین و مقررات
                    </span>{" "}
                    کاربران می‌باشد.
                </p>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-6 relative">

                {/* آیکون داخل input */}
                <div className="relative">
                    <input
                        type="tel"
                        placeholder="0912  ___ ___"
                        {...register("mobile")}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`w-full text-center placeholder-gray-400 text-[18px] tracking-widest py-3 pl-12 pr-4 placeholder:text-center
                        bg-white/70 backdrop-blur-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[20px]
                        border ${errors.mobile ? "border-red-500" : "border-gray-300"}`}
                        dir="ltr"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {isComplete ? (
                            <RiCheckboxCircleFill className="text-darkBlue text-[25px]" />
                        ) : (
                            <FiPhone className={`text-xl transition-colors duration-200 ${
                                isFocused ? "text-darkBlue" : "text-gray-400"
                              }`} />
                        )}
                    </div>
                </div>

                {errors.mobile && (
                    <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                        <HiExclamationCircle />
                        {errors.mobile.message}
                    </p>
                )}

                <div className="pt-4 flex justify-center">
                    <Button 
                        type="submit" 
                        color="blue" 
                        size="large" 
                        buttonClassName="w-full rounded-[20px]"
                        disabled={isLoading || isSubmitting}
                    >
                        {(isLoading || isSubmitting) ? "در حال ارسال..." : translate.login}
                    </Button>
                </div>
            </form>
        </div>
    );
}
