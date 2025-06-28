import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBox() {
  return (
    <div className="flex items-center gap-3 bg-white shadow-lg rounded-xl px-4 py-2 w-full 
    focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 hover:shadow-[0_0_0_5px_rgba(3,105,161,0.3)]">
      <HiOutlineSearch className="text-gray-400 text-xl" />
      <input
        type="text"
        placeholder="جستجو ..."
        className="flex-1 bg-transparent border-none text-base text-gray-700 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}
