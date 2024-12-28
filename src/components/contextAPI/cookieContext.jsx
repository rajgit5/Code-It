import React, { createContext, useState } from "react";

export const cookieContext = createContext();

function CookieProvider({ children }) {
  function getCookieValue(cookieName) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  }

  return <cookieContext.Provider value={{getCookieValue}}>{children}</cookieContext.Provider>;
}

export default CookieProvider;
