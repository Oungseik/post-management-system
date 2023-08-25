import React, { createContext } from "react";
import type { User } from "../types";


type UserContext = { user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>> }

const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => { }
});

export { UserContext };
