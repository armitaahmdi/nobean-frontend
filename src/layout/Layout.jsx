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
        <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
            <div className="px-4 md:px-[6px] lg:px-[10px]">
                <Header />
                <Breadcrumb />
            </div>
            
            <main className="flex-grow px-4 md:px-8 lg:px-16">
                {children}
            </main>

            <div className=" w-full">
                <Footer />
            </div>
        </div>
    );
}