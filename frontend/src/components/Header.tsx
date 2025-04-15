import { FaClipboardList, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import '../styles/header.css';

type HeaderProps = {
    onAdd: () => void;
};

export const Header = ({onAdd}: HeaderProps) => {
    return (
        <div className="header-container">
            <div className="corp">
                <div className="logo">
                    <FaClipboardList size={28} />
                </div>
                <div className="title">To Do App</div>
            </div>
            <div className="header-toolbar">
                <button className="header-button" onClick={onAdd}>
                    <FaPlus /> Add
                </button>
                <button className="header-button header-button-exit">
                    <FaSignOutAlt /> Exit
                </button>
            </div>
        </div>
    );
};
