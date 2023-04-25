import { FormEvent, useState } from 'react' 
import { useMultiStepForm } from '../../customHooks/useMultiStepForm'
import { ProjectForm } from '../ClientForms/ProjectForm'
import { HouseholdForm } from '../ClientForms/HouseholdForm'
import '../../style.css'
import { Link, useLocation } from 'react-router-dom'

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
  street: string
  cityState: string
  zip: string
  password: string
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
  budget: '',

  street: '',
  cityState: '',
  zip: '',
  
  password: ''
}

function ClientDetailForm(props: any) {
  const location = useLocation();
  const {test} = location.state;
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

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if(!isLastStep) return next()
    return window.location.pathname = '/rooms';
  }

  function onCancel(e: FormEvent) {
    setData(INITIAL_DATA);
    window.location.pathname = '/';
  }

  return (
    <div className="formContainer">
      <form onSubmit={onSubmit}>
        <div style={{marginBottom: "20px"}}>
          <h1>Interior Design Client Questionnaire</h1>
          <p>{test}</p>
          <span className="sectionText">
            Section {currentStepIndex + 1} of {steps.length}
          </span>
        </div>
        {step}
        <div style={{
          margin: "3rem 0 1rem 0", display: "flex", gap: ".5rem", justifyContent: "space-between"
        }}>
          {!isFirstStep && <button type="button" className="secondaryButton" onClick={back}>Back</button>}
          
            {isLastStep ? <Link className="button" to={'/rooms'} state={{ email: data.email, name: data.firstName }}>Finish and Submit</Link> : <button type="submit">Save and Continue</button>}
          
          
        </div>
      </form>
      <button type="button" className='cancelButton' onClick={onCancel}>Cancel</button>
    </div>
  )
}

export default ClientDetailForm
