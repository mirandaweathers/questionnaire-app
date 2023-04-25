import { FormWrapper } from "../../utilities/FormWrapper";

type ResidentData = {
    adults: string
    kids: string
    pets: string
    notes: string
}

type HouseholdFormProps = ResidentData & {
    updateFields: (fields: Partial<ResidentData>) => void
}

export function HouseholdForm({ adults, kids, pets, notes, updateFields }: HouseholdFormProps) {
    return (
        <FormWrapper title="Household Information">
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