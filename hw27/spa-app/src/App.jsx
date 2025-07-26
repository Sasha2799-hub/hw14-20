import Header from "./components/Header"
import ToDo from "./components/ToDo"
import AboutUs from "./components/AboutUs"
import Contacts from "./components/Contacts"
import { ThemeContext, theme } from "./themeContext"
import {BrowserRouter,Routes, Route} from "react-router-dom"
import { useState } from "react"
import ErrorBoundary from "./components/ErrorBoundary"


const App = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "yellow" ? theme.yellow : theme.gray;
  })
  const toggleTheme = () => {
    setCurrentTheme((prev) => {
      const newTheme = prev === theme.gray ? theme.yellow : theme.gray;
      localStorage.setItem("theme", newTheme === theme.yellow ? "yellow" : "gray");
      return newTheme;
    });
  };
  return(
  <ThemeContext.Provider value={{currentTheme, toggleTheme }}>
    <BrowserRouter>
      <ErrorBoundary>
        <div className="container">
        <Header />
          <Routes>
          <Route path="/" element={<ToDo />}/>
          <Route path="/contacts" element={<Contacts />}/>
          <Route path="/about" element={<AboutUs />}/>
        </Routes>
      </div>
      </ErrorBoundary>
    </BrowserRouter>

  </ThemeContext.Provider>)
}
export default App 