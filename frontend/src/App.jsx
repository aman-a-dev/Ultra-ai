// library
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
// css 
import './App.css'
// pages
import Home from "./pages/Home.jsx";
import ChatBot from "./pages/ChatBot.jsx";
import Plan from "./pages/Plan.jsx";
import Contact from "./pages/Contact.jsx";
import Setting from "./pages/Setting.jsx";
import Auth from "./pages/Auth.jsx";
import ImgGen from "./pages/ImgGen.jsx";


const App = () => {
    return (
        <>
            <main>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/ChatBot" element={<ChatBot />}></Route>
                    <Route path="/Plan" element={<Plan />}></Route>
                    <Route path="/Contact" element={<Contact />}></Route>
                    <Route path="/Setting" element={<Setting />}></Route>
                    <Route path="/Auth" element={<Auth />}></Route>
                    <Route path="/ImgGen" element={<ImgGen />}></Route>
                </Routes>
            </main>
        </>
    );
};

export default App;
