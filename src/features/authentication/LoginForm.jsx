




// import * as yup from "yup";
// import Input from "../../components/input/Input";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import Dropdown from "../../components/dropdown/Dropdown";
// import SearchBox from "../../components/search/SearchBox";

// const loginSchema = yup.object().shape({
//     email: yup
//         .string()
//         .email("ایمیل معتبر نیست")
//         .required("وارد کردن ایمیل الزامی است."),
//     password: yup
//         .string()
//         .min(6, "حداقل ۶ کاراکتر باید باشد")
//         .required("وارد کردن رمز عبور الزامی است")
// })

// const options = [
//     { label: "دانشجو", value: "student" },
//     { label: "مشاور", value: "therapist" },
//     { label: "مدیر", value: "admin" },
// ];

// export default function LoginForm({ onSubmit }) {

    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors, isSubmitting },
    // } = useForm({
    //     resolver: yupResolver(loginSchema),
    //     mode: "onBlur", // اعتبارسنجی هنگام خروج از فیلد
    // });

//     const submitHandler = async (data) => {
//         if (onSubmit) {
//             await onSubmit(data);
//         } else {
//             console.log("فرم ارسال شد:", data);
//         }
//     };

//     const handleChange = (val) => {
//         console.log("گزینه انتخاب شده:", val);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//                 <Input
//                     label="ایمیل"
//                     type="email"
//                     containerClassName="w-[390px] h-[100px]"
//                     placeholder="ایمیل خود را وارد کنید"
//                     error={errors.email?.message}
//                     {...register("email")}
//                 />
//                 <div className="my-10"></div>
//                 <Input
//                     label="رمز عبور"
//                     type="password"
//                     containerClassName="w-[390px] h-[100px]"
//                     placeholder="رمز عبور خود را وارد کنید"
//                     error={errors.password?.message}
//                     {...register("password")}
//                 />

//                 <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-lg transition"
//                 >
//                     {isSubmitting ? "در حال ارسال..." : "ورود"}
//                 </button>
//             </form>
//             <div>
//                 <Dropdown
//                     label="عنوان دراپ داون"
//                     placeholder="انتخاب کتید"
//                     options={options}
//                     onChange={handleChange} />
//             </div>

//             <div>
//                 <SearchBox
//                     placeholder="جست و جو"
//                     onSearch={value => {
//                         console.log("جست‌وجو:", value);
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }