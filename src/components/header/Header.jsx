import translate from "../../locale/translate";

// images
import mainLogo from "../../assets/images/logo/main-logo.png"
import SearchBox from "../search/SearchBox";
import Button from "../button/Button";
import Banner from "./Banner";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="flex flex-col mt-4 w-full px-4 bg-white rounded-[20px]">
      {/* desktop */}
      <div className="hidden md:flex justify-between items-center">
        <div>
          <img
            className="w-[125px] h-auto"
            src={mainLogo}
            alt={translate.altdescription}
          />
        </div>

        <div className="min-w-[300px] max-w-[600px] flex-grow mx-4">
          <SearchBox />
        </div>

        <div>
          <Button size="small" color="blue">
            {translate.loginOrSignup}
          </Button>
        </div>
      </div>

      {/* mobile*/}
      <div>
        <Navbar />
      </div>

      <div className="flex flex-col items-center md:hidden mb-4">
        <div className="flex w-full gap-4 justify-center items-center">
          <div className="flex-grow max-w-[600px]">
            <SearchBox />
          </div>

          <div>
            <Button size="small" color="blue">
              {translate.loginOrSignup}
            </Button>
          </div>
        </div>
      </div>


    </div>
  );
}
