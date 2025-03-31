import { createContext } from 'react';

export interface RoleContextType {
  roles: string[];
  setRoles: (roles: string[]) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export default RoleContext;
