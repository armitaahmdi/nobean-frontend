import Footer from "../components/footer/Footer";
import Breadcrumb from "../components/header/Breadcrumb";
import Header from "../components/header/Header";
import AuthForm from "../features/authentication/AuthForm";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
            <div className="px-4 md:px-[6px] lg:px-[10px]">
                <Header />
                <Breadcrumb />
            </div>
            
            <main className="flex-grow px-4 md:px-8 lg:px-16">
                {children}
            </main>

            <AuthForm />

            <div className=" w-full">
                <Footer />
            </div>
        </div>
    );
}