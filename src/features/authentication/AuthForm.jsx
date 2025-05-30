// import { useForm } from 'react-hook-form';
// import * as yup from "yup";
// import { yupResolver } from '@hookform/resolvers/yup';

// import Input from '../../components/input/Input';
// import Button from "../../components/button/Button";
// import translate from '../../locale/translate';

// const loginSchema = yup.object().shape({
//     mobile: yup
//       .string()
//       .required("شماره موبایل الزامی است")
//       .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
//   });
  

// export default function AuthForm({ onSubmit }) {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors, isSubmitting },
//     } = useForm({
//         resolver: yupResolver(loginSchema),
//         mode: "onBlur",
//     });

//     const submitHandler = async (data) => {
//         if (onSubmit) {
//             await onSubmit(data);
//         } else {
//             console.log("فرم ارسال شد:", data);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
//                 <Input
//                     label="شماره موبایل"
//                     type="number"
//                     containerClassName="w-[390px] h-[100px]"
//                     placeholder="موبایل خود را وارد کنید"
//                     error={errors.mobile?.message}
//                     {...register("mobile")}
//                 />

//                 <Button color='blue' size='large'>
//                     {translate.login}
//                 </Button>
//             </form>
//         </div>
//     );
// }
