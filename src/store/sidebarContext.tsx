import React, { useState } from "react";

type TSidebarContext = { isOpen: boolean; toggleSidebar: () => void };

const SidebarContext = React.createContext<TSidebarContext>({
  isOpen: true,
  toggleSidebar: () => {},
});

interface ISidebarContextProviderProps {
  children: React.ReactNode;
}

export const SidebarContextProvider: React.FunctionComponent<
  ISidebarContextProviderProps
> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  function ToggleSidebar() {
    setIsOpen((prev) => !prev);
  }

  const contextValue: TSidebarContext = {
    isOpen,
    toggleSidebar: ToggleSidebar,
  };
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
