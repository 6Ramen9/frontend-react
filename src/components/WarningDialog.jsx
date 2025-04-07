function WarningDialog({ title, message, onClose, onValidate }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{message}</p>
            <div>
                <button
                    type="button"
                    onClick={onValidate}
                >
                    Confirmer
                </button>
                <button
                    type="button"
                    onClick={onClose}
                >
                    Annuler
                </button>
            </div>
        </div>
    );
}

export default WarningDialog;