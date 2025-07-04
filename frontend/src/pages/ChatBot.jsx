import "../css/ChatBot.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FiFile,
    FiSend,
    FiPlus,
    FiMenu,
    FiMoreVertical,
    FiCopy,
    FiEdit,
    FiThumbsUp,
    FiThumbsDown,
    FiFlag,
    FiRefreshCw,
    FiDownload
} from "react-icons/fi";
import { FaFileAlt, FaRegCopy } from "react-icons/fa";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";
import { MdImage } from "react-icons/md";
import { FaBars } from "react-icons/fa";

export default function Chatbot() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="chatbot">
            <NavBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
            <SideBar
                isOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
            />
            <Bot />
        </div>
    );
}

function NavBar({ toggleSidebar }) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="botnavbar">
            {width < 600 && (
                <i onClick={toggleSidebar}>
                    <FaBars />
                </i>
            )}
            <span>
                Ultra<span className="colored">AI</span>
            </span>
            <i>
                <FiPlus />
            </i>
        </div>
    );
}

function SideBar({ isOpen, closeSidebar }) {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        if (width < 600 && isOpen) {
            const handleClickOutside = e => {
                if (!e.target.closest(".sidebar")) {
                    closeSidebar();
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, width, closeSidebar]);

    return (
        <div className={`sidebar ${width > 600 || isOpen ? "open" : ""}`}>
            <center className="brand">
                <img src="/img/favicon.png" alt="logo" />
                <Link to="/ImgGen">
                    <h3>
                        <MdImage size={30} /> <b>AI Image Generator</b>
                    </h3>
                </Link>
                <hr style={{ border: "1px dashed var(--primary)" }} />
            </center>
            <div className="history"></div>
        </div>
    );
}

function Bot() {
    return (
        <div className="bot">
            <div className="result">
                <div className="bot-msg">
                    <div className="msg">
                        Ai is a a technology based program intelligent computer.
                    </div>
                    <div className="bot-tool">
                        <FaRegCopy />
                        <FiFlag />
                        <AiOutlineLike />
                        <AiOutlineDislike />
                    </div>
                </div>
                <div className="user-msg">
                    <div className="msg">What is AI?</div>
                    <div className="user-tool">
                        <span></span>
                        <span></span>
                        <FaRegCopy />
                        <FiEdit />
                    </div>
                </div>
            </div>
            <form>
                <textarea placeholder="Ask me any thing..."></textarea>
                <div className="chat-btns">
                    <button type="button">
                        <label htmlFor="file-input">
                            <FiFile />
                        </label>
                        <input type="file" id="file-input" />
                    </button>
                    <button type="submit">
                        <FiSend />
                    </button>
                </div>
            </form>
        </div>
    );
}
