import { FaClipboardList, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import '../styles/header.css';

export const Header = () => {
    return (
        <div className="header-container">
            <div className="corp">
                <div className="logo">
                    <FaClipboardList size={28} />
                </div>
                <div className="title">To Do App</div>
            </div>
            <div className="header-toolbar">
                <button className="header-button">
                    <FaPlus /> New
                </button>
                <button className="header-button header-button-exit">
                    <FaSignOutAlt /> Exit
                </button>
            </div>
        </div>
    );
};
