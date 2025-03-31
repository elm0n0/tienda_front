import { ReactNode, useEffect, useState } from "react";
import RoleContext from "./RoleContext";

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const loadRoles = () => {
      const storedUser = localStorage.getItem('AuthUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setRoles(user.roles);
      } else {
        setRoles([]);
      }
    };

    loadRoles();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'AuthUser') {
        loadRoles();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authUserChanged', loadRoles);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authUserChanged', loadRoles);
    };
  }, []);

  return (
    <RoleContext.Provider value={{ roles, setRoles }}>
      {children}
    </RoleContext.Provider>
  );
};
