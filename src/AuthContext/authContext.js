import React, { useState } from 'react';

export const authContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <authContext.Provider value={[user, setUser]}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
