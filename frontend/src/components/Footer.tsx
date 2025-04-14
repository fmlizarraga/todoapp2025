import { FaClipboardList, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/footer.css';

export const Footer = () => {
    return (
        <div className="footer-container">
            <div className="info">
                <div className="logo">
                    <FaClipboardList size={22} />
                </div>
                <div className="copyright">
                    © 2025 ToDo App by Franco Matías Lizárraga
                </div>
            </div>
            <div className="links">
                <ul>
                    <li>
                        <a href="https://github.com/fmlizarraga" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={20} />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/franco-matias-lizarraga" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={20} />
                        </a>
                    </li>
                    <li>
                        <a href="mailto:lizarragafranco91@gmail.com">
                            <FaEnvelope size={20} />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};
