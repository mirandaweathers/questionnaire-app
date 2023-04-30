import { FormEvent, useState } from 'react' 
import { useMultiStepForm } from '../../customHooks/useMultiStepForm'
import { ProjectForm } from '../ClientForms/ProjectForm'
import { HouseholdForm } from '../ClientForms/HouseholdForm'
import '../../style.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type FormData = {
  firstName: string
  lastName: string
  address: string
  email: string
  phone: string
  budget: string
  adults: string
  kids: string
  pets: string
  notes: string
}

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  address: '',
  email: '',
  phone: '',
  adults: '',
  kids: '',
  pets: '',
  notes: '',
  budget: ''
}

function ClientDetailForm(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(INITIAL_DATA)
  const {
    step,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    back,
    next
  } = useMultiStepForm([
    <ProjectForm {...data} updateFields={updateFields} />,
    // <AddressForm {...data} updateFields={updateFields} />,
    <HouseholdForm {...data} updateFields={updateFields} />
  ])

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if(!isLastStep) return next()
    
    await addClient(data);
  }

  const addClient = async (clientData:any) => {
    // alert(JSON.stringify(clientData))

    try {
      const response = await fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to add client');
      }
  
      const data = await response.json();
      console.log(data);
      return navigate('/rooms', { 
        replace: true, 
        state: {
            email: clientData.email, 
            name: clientData.firstName
        }
    });
    } catch (error) {
      console.error(error);
    }
  };

  function onCancel(e: FormEvent) {
    if(confirm("Are you sure? All new client data will be lost!")) {
      setData(INITIAL_DATA);
      window.location.pathname = '/';
    }
  }

  return (
    <div className="formContainer">
      <form onSubmit={onSubmit}>
        <div style={{marginBottom: "20px"}}>
          <h1>Interior Design Client Questionnaire</h1>
          <span className="sectionText">
            Section {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
        {step}
        <div style={{
          margin: "3rem 0 1rem 0", display: "flex", gap: ".5rem", justifyContent: "space-between"
        }}>
          {!isFirstStep && <button type="button" className="secondaryButton" onClick={back}>Back</button>}
          
            {isLastStep ? <button className="button" type="submit">Finish and Submit</button> : <button type="submit">Save and Continue</button>}
          
          
        </div>
      </form>
      <button type="button" className='cancelButton' onClick={onCancel}>Cancel & Exit</button>
    </div>
  )
}

export default ClientDetailForm
