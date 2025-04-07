import { useEffect, useState } from "react";

function TableStudents({ etudiants, onUpdate, onDelete, min, max, avg }) {
    const [minGrade, setMinGrade] = useState(0.0);
    const [maxGrade, setMaxGrade] = useState(0.0);
    const [avgGrade, setAvgGrade] = useState(0.0);

    const findMin = () => {
        setMinGrade(
            etudiants.reduce((min, etudiant) => {
                return etudiant.moyenne < min ? etudiant.moyenne : min
            }, Infinity)
        );
    };

    const findMax = () => {
        setMaxGrade(
            etudiants.reduce((max, etudiant) => {
                return etudiant.moyenne > max ? etudiant.moyenne : max
            }, 0)
        );
    };

    const calculateAvg = () => {
        const total = etudiants.reduce((sum, etudiant) => sum + etudiant.moyenne, 0);
        setAvgGrade(
            total / etudiants.length
        );
    };

    useEffect(() => {
        findMax();
        findMin();
        calculateAvg();
    }, [etudiants]);
    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Numéro Etudiant</th>
                        <th>Nom</th>
                        <th>Moyenne</th>
                        <th>Observation</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {etudiants.map((item, index) => (
                        <tr key={index}>
                            <td>{item.numEt}</td>
                            <td>{item.nom}</td>
                            <td>{item.moyenne}</td>
                            <td>{
                                Number(item.moyenne) >= 10 ? "Admis"
                                    : Number(item.moyenne) < 10 && Number(item.moyenne) >= 5 ? "Redoublant"
                                        : Number(item.moyenne) < 5 ? "Exclus"
                                            : "Introuvable"
                            }</td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => onUpdate(index)}
                                >
                                    Modifier
                                </button>
                                <button
                                    type="button"
                                    onClick={() => onDelete(item.numEt)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="3">MOYENNE</th>
                        <td colSpan="2">{avgGrade}</td>
                    </tr>
                    <tr>
                        <th colSpan="3">MINIMUM</th>
                        <td colSpan="2">{minGrade}</td>
                    </tr>
                    <tr>
                        <th colSpan="3">MAXIMUM</th>
                        <td colSpan="2">{maxGrade}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default TableStudents;