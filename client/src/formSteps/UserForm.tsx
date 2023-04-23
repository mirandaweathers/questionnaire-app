import { FormWrapper } from "../utilities/FormWrapper";
import { ClientData } from "../models/ClientData";

type UserFormProps = ClientData & {
    updateFields: (fields: Partial<ClientData>) => void
}

export function UserForm({ clientName, address, email, phone, adults, kids, pets, notes, updateFields }: UserFormProps) {
    const addressPlaceholder = (
        "123 Main St.\nJacksonville, FL 32205"
    )
    return (
        <FormWrapper title="Household Information">
            <h3>Project Contact Information</h3>
            <label>Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={clientName} 
                placeholder="Jane Doe"
                onChange={(e => updateFields({ clientName: e.target.value }))} 
            />

            <label>Address</label>
            <textarea 
                placeholder={addressPlaceholder} 
                style={{height: "48px"}}
                value={address} 
                onChange={(e => updateFields({ address: e.target.value }))} 
            ></textarea>

            <label>Email address</label>
            <input  
                required 
                type="email" 
                value={email} 
                placeholder="hello@example.com"
                onChange={(e => updateFields({ email: e.target.value }))} 
            />

            <label>Phone number</label>
            <input  
                required 
                type="text" 
                value={phone} 
                placeholder="904-626-2000"
                onChange={(e => updateFields({ phone: e.target.value }))} 
            />

            <h3>Residents</h3>

            <label>Adults' names and ages</label>
            <input 
                required 
                type="text" 
                style={{width:"minmax(auto, 500px)"}} 
                value={adults}
                onChange={(e => updateFields({ adults: e.target.value }))} 
            />

            <label>Kids' names and ages <span className="labelHelper">(optional)</span></label>
            <input 
                type="text" 
                style={{width:"minmax(auto, 500px)"}} 
                value={kids}
                onChange={(e => updateFields({ kids: e.target.value }))} 
            />

            <label>Pets <span className="labelHelper">(optional)</span></label>
            <input 
                type="text" 
                style={{width:"minmax(auto, 500px)"}} 
                value={pets}
                onChange={(e => updateFields({ pets: e.target.value }))} 
            />

            <label>Notes - Accessibility needs, home activities, etc. <span className="labelHelper">(optional)</span></label>
            <textarea 
                placeholder="Notes..."
                value={notes} 
                onChange={(e => updateFields({ notes: e.target.value }))} 
                style={{height: "100px", width: "500px"}} 
            ></textarea>
        </FormWrapper>
    )
}