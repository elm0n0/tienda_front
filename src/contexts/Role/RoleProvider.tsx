import { ReactNode, useEffect, useState } from "react";
import RoleContext from "./RoleContext"; 

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('AuthUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setRoles(user.roles);
    }
  }, []);

  return (
    <RoleContext.Provider value={{ roles, setRoles }}>
      {children}
    </RoleContext.Provider>
  );
};
