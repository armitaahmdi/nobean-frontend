import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import mainLogo from "../../assets/images/logo/main-logo.png";
import translate from "../../locale/translate";

const schema = yup.object({
    otp: yup
        .string()
        .required("کد تایید الزامی است")
        .length(6, "کد تایید باید ۶ رقمی باشد"),
});

export default function OtpForm({ mobile, onSubmit, onBack }) {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema),
            mode: "onBlur"
        });

    return (
        <div className="w-[500px] flex flex-col items-center gap-6 p-8 rounded-2xl border border-[#6c6e70] bg-[#F1F5F9] shadow-sm">
            <div className="text-right">
                <img
                    src={mainLogo}
                    alt={translate.altdescription}
                    className="w-[250px] mx-auto"
                />
                <div className="mt-10">
                    <h2 className="text-2xl py-3 font-bold">{translate.otp}</h2>
                    <h4 className="text-lg py-3 px-3">کد تایید به شماره {mobile} ارسال شد</h4>
                    <button
                        type="button"
                        onClick={onBack}
                        className="bg-transparent border-none text-md font-light py-3 px-3 text-darkBlue hover:text-blue-800"
                    >
                        {translate.editNumber}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <Input
                    type="text"
                    placeholder="کد ۶ رقمی"
                    error={errors.otp?.message}
                    {...register("otp")}
                />

                <button className="bg-transparent border-none p-0 text-sm underline hover:text-blue-800 cursor-pointer">
                    {translate.sendagainotp}
                </button>

                <div className="pt-5 flex justify-center text-center">
                    <Button type="submit" color="blue" size="large">
                        {translate.login}
                    </Button>
                </div>
            </form>
        </div>
    );
}
