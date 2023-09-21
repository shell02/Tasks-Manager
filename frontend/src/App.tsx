import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AppWrapper } from "./styles/App.styles";
import { HomeLayout } from "./components/HomeLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Error404 } from "./pages/Error404";
import { useLoggedIn } from "./hooks/useLoggedIn";

function App() {

  const client = new QueryClient();
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();


  return (
    <AppWrapper>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route element={<HomeLayout />}>
              <Route path="/" element={<Home />}/>
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
              <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>}/>
            </Route>
            {isLoggedIn &&
              <Route path="/dashboard" element={<h1>This is the dashboard</h1>}/>
            }
            <Route path="*" element={<Error404 isLoggedIn={isLoggedIn}/>} />
          </Routes>
        </Router>
      </QueryClientProvider>

    </AppWrapper>
  );
}

export default App;
