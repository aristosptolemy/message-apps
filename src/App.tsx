import { Routes, Route, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React, { useRef, useState } from "react";
import "./App.css";
import LoadingDisplay from "./router/loading";
import LoginPage from "./router/login";
import MessageDisplay from './router/message';
import RegisterUser from "./router/registerUser";
import { Toaster } from "react-hot-toast";

import PassWordReset from './router/ResetPassword';

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  
  const [isLoading, setisLoading] = useState(false);

  return (
    <>
      <Toaster />
      <TransitionGroup component={null}>
        <CSSTransition key={location.pathname} timeout={500} classNames="fade" nodeRef={nodeRef} unmountOnExit>
          <div ref={nodeRef} className="page">
            <Routes>
              <Route path="/" element={<LoginPage setisLoading={setisLoading} />} />
              <Route path="/message" element={<MessageDisplay />} />
              <Route path="/register" element={<RegisterUser />} />
              <Route path="/resetpass" element={<PassWordReset />} />
            </Routes>
            <div className="Loadingarea">
              <LoadingDisplay isLoading={isLoading} />
            </div>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}

export default App
