import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const schema = yup.object().shape({
    comment: yup.string().required("متن نظر الزامی است"),
});

export default function SubmitComment({ onSubmit }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onFormSubmit = async (data) => {
        setSuccess("");
        setLoading(true);
        try {
            await onSubmit(data);
            setSuccess("نظر شما با موفقیت ثبت شد.");
            reset();
        } catch {
            setError("comment", { message: "ثبت نظر با خطا مواجه شد." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form id="submit-comment"
            onSubmit={handleSubmit(onFormSubmit)}
            className="px-5 py-2 overflow-hidden lg:w-[85%] "
            noValidate>
            <h4 className="text-sm bg-white text-darkBlue font-semibold w-fit px-8 py-2 rounded-t-lg">
                نظر شما
            </h4>

            <div>
                <input
                    {...register("comment")}
                    placeholder="متن نظر خود را وارد کنید"
                    className={`w-full h-24 border  rounded-tl-md rounded-bl-none rounded-tr-none rounded-br-md p-3 pr-4 text-sm resize-y focus:outline-none focus:ring-2 ${errors.comment
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-darkBlue"
                        }`}
                />
            </div>

            <div className="flex justify-end pb-4">
                <div className="bg-darkBlue rounded-b-lg w-fit">
                    <button
                        type="submit"
                        disabled={loading}
                        className="text-white text-sm font-medium px-5 py-2 disabled:opacity-50 transition"
                    >
                        {loading ? "در حال ارسال..." : "ثبت نظر"}
                    </button>
                </div>
            </div>

            <div>
                {(errors.comment || success) && (
                    <div className="mt-1 flex justify-between items-center">
                        {errors.comment && (
                            <p className="text-red-500 text-xs">{errors.comment.message}</p>
                        )}
                        {success && <p className="text-green-600 text-xs">{success}</p>}
                    </div>
                )}
            </div>
        </form>
    );
}