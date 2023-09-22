import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { AppWrapper } from "./styles/App.styles";
import { HomeLayout } from "./components/HomeLayout";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Error404 } from "./pages/Error404";
import { useLoggedIn } from "./hooks/useLoggedIn";
import { HeaderLayout } from "./components/HeaderLayout";
import { Dashboard } from "./pages/Dashboard";
import { HomeTitle } from "./styles/Home.styles";

const ReloadDashboard = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    if (localStorage.getItem("token"))
      navigate('/dashboard');
  }

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
		}, 500);

  })

  return (
    <>
      
    </>
  )
}

const ReloadHome = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    if (!localStorage.getItem("token"))
      navigate('/')
  }

  useEffect(() => {
    setTimeout(() => {
      checkLogin();
		}, 1000);

  })

  return (
    <>
      <HomeTitle>Unauthorized access</HomeTitle>
    </>
  )
}

function App() {

  const client = new QueryClient();
  const [isLoggedIn, setIsLoggedIn] = useLoggedIn();

  const closeWindow = () => {
      window.addEventListener("beforeunload", () => {
        localStorage.removeItem("token");
      });
  };

  useEffect(() => {
      closeWindow();
  }, []);

  return (
    <AppWrapper>
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            {isLoggedIn &&
              <Route element={<HeaderLayout />}>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path='/' element={<ReloadDashboard />} />
                <Route path="/login" element={<ReloadDashboard />}/>
                <Route path="/register" element={<ReloadDashboard />}/>
              </Route>
            }
            {!isLoggedIn &&
              <>
                <Route path="/dashboard" element={<ReloadHome />}/>
                <Route element={<HomeLayout />}>
                  <Route path="/" element={<Home />}/>
                  <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                  <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>}/>
                </Route>
              </>
            }
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Router>
      </QueryClientProvider>

    </AppWrapper>
  );
}

export default App;
