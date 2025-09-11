import { createContext, useContext, useState } from 'react';

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

export const BreadcrumbProvider = ({ children }) => {
  const [currentPageTitle, setCurrentPageTitle] = useState(null);

  const setPageTitle = (title) => {
    setCurrentPageTitle(title);
  };

  const clearPageTitle = () => {
    setCurrentPageTitle(null);
  };

  return (
    <BreadcrumbContext.Provider value={{
      currentPageTitle,
      setPageTitle,
      clearPageTitle
    }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
