import "../css/ChatBot.css"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
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
} from "react-icons/fi"
import { FaFileAlt, FaHamburger, FaRegCopy } from "react-icons/fa"
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai"
import { BsThreeDotsVertical } from "react-icons/bs"
import { RiFileCopyLine } from "react-icons/ri"
import { MdImage } from "react-icons/md"
import { FaBars } from "react-icons/fa"

export default function Chatbot() {
    return (
        <div className="chatbot">
            <NavBar />
            <SideBar />
            <Bot />
        </div>
    )
}

function NavBar() {
    const [width, setWidth] = useState(window.innerWidth)
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
    }, [])
    return (
        <div className="botnavbar">
            {width < 600 && (
                <i>
                    <FaBars />
                </i>
            )}
            <span>
                Ultra<span class="colored">AI</span>
            </span>
            <i>
                <FiPlus />
            </i>
        </div>
    )
}

function SideBar() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
    }, [])
    return (
        <>
            <div
                className="sidebar"
                className={`sidebar ${
                    width > 600 ? "transformback" : "transformit"
                }`}
            >
                <center class="brand">
                    <img src="/img/favicon.png" alt="logo" />
                    <Link to="/ImgGen">
                        <h3>
                            <MdImage size={30}/> <span>AI Image Generator</span>
                        </h3>
                    </Link>
                    <hr style={{ border: "1px dashed var(--primary)" }} />
                </center>
                <div class="history"></div>
            </div>
        </>
    )
}

function Bot() {
    return (
        <div className="bot">
            <div class="result">
                <div class="bot-msg">
                    <div class="msg">
                        Ai is a a technology based program intelligent computer.
                    </div>
                    <div class="bot-tool">
                        <FaRegCopy />
                        <FiFlag />
                        <AiOutlineLike />
                        <AiOutlineDislike />
                    </div>
                </div>
                <div class="user-msg">
                    <div class="msg">What is AI?</div>
                    <div class="user-tool">
                        <span></span>
                        <span></span>
                        <FaRegCopy />
                        <FiEdit />
                    </div>
                </div>
            </div>
            <form>
                <textarea placeholder="Ask me any thing..."></textarea>
                <div class="chat-btns">
                    <button type="button">
                        <label for="file-input">
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
    )
}
