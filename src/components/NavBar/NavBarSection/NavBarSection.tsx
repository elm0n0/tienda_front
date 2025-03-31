import React, { useState } from 'react';
import { useRoles } from '../../../contexts/Role/RoleHooks';
import './NavBarSection.css'
import CustomLink from '../../Link/Link';
import addIcon from './icons/add-circle.svg';
import removeIcon from './icons/remove-circle.svg';

const NavBarSection: React.FC = () => {
    const { roles } = useRoles();
    const isAdmin = roles.includes("ADMIN");

    const [sections, setSections] = useState([
        { label: "Sección 1", path: "/seccion-1" },
        { label: "Sección 2", path: "/seccion-2" },
        { label: "Sección 3", path: "/seccion-3" },
        { label: "Sección 4", path: "/seccion-4" },
    ]);

    const [newSection, setNewSection] = useState({ label: "", path: "" });
    const [isAdding, setIsAdding] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);
    const [sectionToDelete, setSectionToDelete] = useState("");


    const handleAddSection = () => {
        if (newSection.label.trim() && newSection.path.trim()) {
            setSections([...sections, newSection]);
            setNewSection({ label: "", path: "" });
            setIsAdding(false);
        }
    };

    const handleDeleteSection = () => {
        if (sectionToDelete) {
            setSections(sections.filter((sec) => sec.label !== sectionToDelete));
            setSectionToDelete("");
            setIsDeleting(false);
        }
    };


    return (
        <>
            {isAdmin && (
                <img
                    src={removeIcon}
                    className="add-section-icon"
                    alt="Eliminar sección"
                    onClick={() => setIsDeleting(true)}
                />
            )}
            {sections.map((section, index) => (
                <span key={index}>
                    <CustomLink to={section.path} className="nav-bar-link">
                        {section.label}
                    </CustomLink>
                </span>
            ))}

            {isAdmin && (
                <img
                    src={addIcon}
                    className="add-section-icon"
                    alt="Agregar sección"
                    onClick={() => setIsAdding(true)}
                />
            )}

            {isAdding && (
                <div className="add-section-form">
                    <input
                        type="text"
                        placeholder="Nombre de la sección"
                        value={newSection.label}
                        onChange={(e) => setNewSection({ ...newSection, label: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Ruta (ej. /nueva-seccion)"
                        value={newSection.path}
                        onChange={(e) => setNewSection({ ...newSection, path: e.target.value })}
                    />
                    <button onClick={handleAddSection}>Agregar</button>
                    <button onClick={() => setIsAdding(false)}>Cancelar</button>
                </div>
            )}

            {isDeleting && (
                <div className="add-section-form">
                    <select
                        value={sectionToDelete}
                        onChange={(e) => setSectionToDelete(e.target.value)}
                    >
                        <option value="">Selecciona una sección</option>
                        {sections.map((sec, i) => (
                            <option key={i} value={sec.label}>{sec.label}</option>
                        ))}
                    </select>
                    <button onClick={handleDeleteSection}>Eliminar</button>
                    <button onClick={() => setIsDeleting(false)}>Cancelar</button>
                </div>
            )}

        </>
    );
};

export default NavBarSection;
