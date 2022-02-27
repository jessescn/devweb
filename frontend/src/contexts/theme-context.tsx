import { createContext, ReactNode, useState } from "react";

export const themes = {
  light: {
    name: "light",
    color: "#414241",
    bgColor: "#fff",
  },
  dark: {
    name: "dark",
    color: "#fff",
    bgColor: "#414241",
  },
};

type ThemeContextData = {
  theme: typeof themes.light;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    if (theme.name === "light") {
      setTheme(themes.dark);
    } else {
      setTheme(themes.light);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
