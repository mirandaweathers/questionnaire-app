import { FormWrapper } from "../../utilities/FormWrapper";
import { ClientData } from "../../models/ClientData";

type ProjectFormProps = ClientData & {
    updateFields: (fields: Partial<ClientData>) => void
}

export function ProjectForm({ firstName, lastName, address, email, phone, budget, updateFields }: ProjectFormProps) {
    const addressPlaceholder = "123 Main St.\nJacksonville, FL 32205";

    return (
        <FormWrapper title="Project Information">
            <label>First Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={firstName} 
                placeholder="Jane"
                onChange={(e => updateFields({ firstName: e.target.value }))} 
            />

            <label>Last Name</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={lastName} 
                placeholder="Doe"
                onChange={(e => updateFields({ lastName: e.target.value }))} 
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

            <label>Budget considerations</label>
            <textarea
                placeholder="Notes..."
                value={budget} 
                onChange={(e => updateFields({ budget: e.target.value }))} 
                style={{height: "100px", width: "500px"}} 
            ></textarea>
        </FormWrapper>
    )
}