import { FormEvent, useState } from 'react' 
import { useMultiStepForm } from '../customHooks/useMultiStepForm'
import { UserForm } from '../formSteps/UserForm'
import { AddressForm } from '../formSteps/AddressForm'
import { AccountForm } from '../formSteps/AccountForm'
import '../style.css'
import { useLocation } from 'react-router-dom'

type FormData = {
  clientName: string
  address: string
  email: string
  phone: string
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
  clientName: '',
  address: '',
  email: '',
  phone: '',
  adults: '',
  kids: '',
  pets: '',
  notes: '',

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
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />
  ])

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if(!isLastStep) return next()
    return alert(JSON.stringify(data))
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
          marginTop: "1rem", display: "flex", gap: ".5rem", justifyContent: "space-between"
        }}>
          {!isFirstStep && <button type="button" className="secondaryButton" onClick={back}>Back</button>}
          <button type="submit">
            {isLastStep ? "Finish and Submit" : "Save and Continue"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ClientDetailForm
