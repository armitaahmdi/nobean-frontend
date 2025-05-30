// components/Breadcrumb.jsx
import { Link, useLocation } from "react-router-dom";
import pathNameMap from "../../constants/pathNameMap";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-600 my-4 px-4">
      <ol className="list-reset flex flex-wrap items-center gap-1">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">صفحه اصلی</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const displayName = pathNameMap[name] || decodeURIComponent(name);

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-700 font-medium">{displayName}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:underline">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
