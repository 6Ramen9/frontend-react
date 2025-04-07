function FormComponent({ onSubmit, onChange, etudiant }) {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Numéro Etudiant</label>
                    <input
                        type="text"
                        name="numEt"
                        value={etudiant.numEt}
                        autoComplete="off"
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={etudiant.nom}
                        autoComplete="off"
                        onChange={onChange}
                        required
                    />
                </div>
                <div>
                    <label>Moyenne</label>
                    <input
                        type="number"
                        name="moyenne"
                        value={etudiant.moyenne}
                        min={0}
                        max={20}
                        step="any"
                        onChange={onChange}
                    />
                </div>
                <div>
                    <button
                        type="submit"
                    >
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormComponent;