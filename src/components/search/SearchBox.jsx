import { useEffect, useState } from "react"
import Input from "../input/Input";
import { HiSearch } from "react-icons/hi";

export default function SearchBox({
  placeholder = "جست و جو",
  onSearch,
  error,
  ...rest
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch && onSearch(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <Input
      type="search"
      placeholder={placeholder}
      containerClassName="w-full h-[48px] md:h-[56px]"
      borderColor="border-[#BFBFBF] border-2"
      value={query}
      onChange={e => setQuery(e.target.value)}
      error={error}
      icon={<HiSearch size={20} />}
      {...rest}
    />

  )
}
