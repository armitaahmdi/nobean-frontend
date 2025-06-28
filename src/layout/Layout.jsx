import Footer from "../components/footer/Footer";
import Breadcrumb from "../components/header/Breadcrumb";
import Header from "../components/header/Header";
import AuthContainer from "../features/authentication/AuthContainer"
import { useLocation, useNavigate } from "react-router-dom";
import translate from "../locale/translate";
import { HiOutlineHome } from "react-icons/hi";

export default function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();


  const showAuth = new URLSearchParams(location.search).get("auth") === "true";

  if (showAuth) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4">
        <AuthContainer />
        <button
          className="flex justify-center items-center mt-5 text-gray-500 hover:text-black"
          onClick={() => {
            const params = new URLSearchParams(location.search);
            params.delete("auth");
            navigate({ search: params.toString() });
          }}
        >
          <HiOutlineHome /> {translate.returntomainpage}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">

        <div className="absolute top-[150px] left-[80px] w-[30rem] h-[30rem] bg-[#4286F5] rounded-full opacity-50 blur-[100px] z-0"></div>
        <div className="absolute top-[500px] right-[200px] w-[30rem] h-[30rem] bg-[#F7BC2D] rounded-full opacity-40 blur-[80px] -translate-y-1/2 z-0"></div>
        <div className="absolute top-[750px] left-[500px] w-[30rem] h-[30rem] bg-red-400 rounded-full opacity-50 blur-[100px] z-0"></div>
        <div className="absolute bottom-1/3 -right-[20px] w-[26rem] h-[26rem] bg-[#A9C6FD] rounded-full opacity-50 blur-[80px] z-0"></div>
        <div className="absolute bottom-[250px] left-[0px] w-[30rem] h-[30rem] bg-[#eb7836] rounded-full opacity-40 blur-[100px] z-0"></div>
        <div className="absolute bottom-[80px] right-[450px] w-[30rem] h-[30rem] bg-[#a0ebcf] rounded-full opacity-40 blur-[100px] z-0"></div>

        <div className="relative mt-2  px-4 md:px-[6px] lg:px-[10px]">
          <Header />
          <Breadcrumb />
        </div>

        <main className="relative  flex-grow px-4 md:px-8 lg:px-16">
          {children}
        </main>
      </div>


      <div className=" w-full">
        <Footer />
      </div>
    </>
  );
}
