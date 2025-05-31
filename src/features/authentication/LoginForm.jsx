import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import translate from "../../locale/translate";
import mainLogo from "../../assets/images/logo/main-logo.png";

const schema = yup.object({
    mobile: yup
        .string()
        .required("این فیلد نمی‌تواند خالی باشد")
        .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
});

export default function LoginForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
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
                    <h2 className="text-2xl py-3 font-bold">{translate.loginOrSignup}</h2>
                    <h4 className="text-lg py-3 px-3">{translate.hello}</h4>
                    <h4 className="text-lg py-3 px-3">{translate.enteryournumberoremail}</h4>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                <Input
                    inputClassName="bg-[#F1F5F9]"
                    type="tel"
                    placeholder="09123456789"
                    {...register("mobile")}
                    error={errors.mobile?.message}
                />

                <div className="pt-5 flex justify-center text-center">
                    <Button type="submit" color="blue" size="large">
                        {translate.login}
                    </Button>
                </div>
            </form>
        </div>
    );
}
