import { useContext } from "react";
import RoleContext, { RoleContextType } from "./RoleContext";

export const useRoles = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoles must be used within a RoleProvider");
  }
  return context;
};
