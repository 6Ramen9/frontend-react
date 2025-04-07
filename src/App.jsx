import { use, useEffect, useState } from 'react';
import './App.css'
import FormComponent from './components/FormComponent'
import TableStudents from './components/TableStudents';
import UpdateDialog from './components/UpdateDialog';
import WarningDialog from './components/WarningDialog';

function App() {
  const [warningTitle, setWarningTitle] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [numEt, setNumEt] = useState("");
  const [numEtToDelete, setNumEtToDelete] = useState("");
  const [minGrade, setMinGrade] = useState(0.0);
  const [maxGrade, setMaxGrade] = useState(0.0);
  const [avgGrade, setAvgGrade] = useState(0.0);
  const [etudiants, setEtudiants] = useState([]);
  const [etudiant, setEtudiant] = useState({
    numEt: "",
    nom: "",
    moyenne: 0
  });
  const [updatedEtudiant, setUpdatedEtudiant] = useState({
    numEt: "",
    nom: "",
    moyenne: 0
  });

  const handleChangeForm = (e) => {
    setEtudiant({
      ...etudiant,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeUpdateForm = (e) => {
    setUpdatedEtudiant({
      ...updatedEtudiant,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateDialogOpening = (index) => {
    setUpdatedEtudiant(etudiants[index]);
    setNumEt(etudiants[index].numEt);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClosing = () => {
    setNumEt("");
    setUpdatedEtudiant({
      numEt: "",
      nom: "",
      moyenne: 0
    });
    setIsUpdateDialogOpen(false);
  };

  const handleDeletePromptOpening = (numEt) => {
    setWarningTitle("ATTENTION");
    setWarningMessage("Cette action est irréversible.");
    setNumEtToDelete(numEt);
    setIsDeletePromptOpen(true);
  };

  const handleDeletePromptClosing = () => {
    setWarningMessage("");
    setWarningTitle("");
    setNumEtToDelete("");
    setIsDeletePromptOpen(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    await fetch('http://localhost:5000/etudiants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(etudiant)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsSubmitted(true);
      })
      .catch(error => {
        console.error('Erreur: ', error);

      });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/etudiants/${numEt}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedEtudiant)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsSubmitted(true);
        handleUpdateDialogClosing();
      })
      .catch(error => {
        console.error('Error: ', error);

      });
  };

  const handleSubmitDelete = async () => {
    await fetch(`http://localhost:5000/etudiants/${numEtToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsSubmitted(true);
        handleDeletePromptClosing();
      })
      .catch(error => {
        console.error('Error: ', error);

      });
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/etudiants');
        const data = await response.json();
        if (Array.isArray(data)) {
          setEtudiants(data);
          setIsSubmitted(false);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const fetchMinGrade = async () => {
      try {
        const response = await fetch('http://localhost:5000/etudiants/min');
        const data = await response.json();
        setMinGrade(data.moyenne_min);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const fetchMaxGrade = async () => {
      try {
        const response = await fetch('http://localhost:5000/etudiants/max');
        const data = await response.json();
        setMaxGrade(data.moyenne_max);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const fetchAvgGrade = async () => {
      try {
        const response = await fetch('http://localhost:5000/etudiants/avg');
        const data = await response.json();
        setAvgGrade(data.moyenne_avg);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchStudents();
  }, [isSubmitted]);

  return (
    <>
      <FormComponent
        onChange={handleChangeForm}
        onSubmit={handleSubmitForm}
        etudiant={etudiant}
      />
      {
        Array.isArray(etudiants) && etudiants.length > 0 &&
        <TableStudents
          onDelete={handleDeletePromptOpening}
          onUpdate={handleUpdateDialogOpening}
          etudiants={etudiants}
          min={minGrade}
          max={maxGrade}
          avg={avgGrade}
        />
      }
      {
        isUpdateDialogOpen &&
        <UpdateDialog
          onChange={handleChangeUpdateForm}
          onClose={handleUpdateDialogClosing}
          onUpdate={handleSubmitUpdate}
          updatedEtudiant={updatedEtudiant}
        />
      }
      {
        isDeletePromptOpen &&
        <WarningDialog
          title={warningTitle}
          message={warningMessage}
          onClose={handleDeletePromptClosing}
          onValidate={handleSubmitDelete}
        />
      }
    </>
  )
}

export default App
