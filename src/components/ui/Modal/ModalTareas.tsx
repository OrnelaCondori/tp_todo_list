import React, { useState } from 'react';
import "./ModalTareas.css"

interface ModalTareasProps {
isOpen: boolean;
onClose: () => void;
onSave: (titulo: string, descripcion: string) => void;
}

const ModalTareas: React.FC<ModalTareasProps> = ({ isOpen, onClose, onSave }) => {
const [titulo, setTitulo] = useState('');
const [descripcion, setDescripcion] = useState('');

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(titulo, descripcion);
    setTitulo('');
    setDescripcion('');
    onClose();
};

if (!isOpen) return null;

return (
    <div className="modal">
    <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Agregar tarea</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="input"
            required
        />
        <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="textarea"
        />
        <button type="submit" className="save-btn">Guardar</button>
        </form>
    </div>
    </div>
);
};

export default ModalTareas;

