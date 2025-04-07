import FormComponent from "./FormComponent";

function UpdateDialog({ onClose, onUpdate, onChange, updatedEtudiant }) {
    return (
        <>
            <div>
                <FormComponent
                    onChange={onChange}
                    onSubmit={onUpdate}
                    etudiant={updatedEtudiant}
                />
                <div onClick={onClose}>
                    X
                </div>
            </div>
        </>
    );
}

export default UpdateDialog;