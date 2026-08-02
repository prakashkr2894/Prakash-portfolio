import "./middlepart.css"
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { handleEmailClick } from "../../Connect";
function Front_p() {
    const handleLinkClick = (e) => {
        e.preventDefault(); 
        handleEmailClick();
    };
    return (
        <>
            <div className="social-btns-container">
                <a className="social-btn github" href="https://github.com/prakashkr2894" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="icon" />
                </a>
                <a className="social-btn linkedin" href="https://www.linkedin.com/in/prakashkr2894/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="icon" />
                </a>
                <a className="social-btn gmail" onClick={handleEmailClick} rel="noopener noreferer">
                    <FaEnvelope className="icon" />
                </a>
            </div>
        </>
    );
}

export default Front_p;