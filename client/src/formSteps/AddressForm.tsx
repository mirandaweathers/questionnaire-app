import { FormWrapper } from "../utilities/FormWrapper";

type AddressData = {
    street: string
    cityState: string
    zip: string
}

type AddressFormProps = AddressData & {
    updateFields: (fields: Partial<AddressData>) => void
}

export function AddressForm({ street, cityState, zip, updateFields }: AddressFormProps) {
    return (
        <FormWrapper title="Address">
            <label>Street</label>
            <input 
                autoFocus 
                required 
                type="text" 
                value={street} 
                onChange={(e => updateFields({ street: e.target.value }))}
            />

            <label>City, State</label>
            <input 
                required 
                type="text" 
                value={cityState} 
                onChange={(e => updateFields({ cityState: e.target.value }))}
            />

            <label>Zip</label>
            <input 
                required 
                min={1} 
                max = {99999} 
                type="number" 
                value={zip} 
                onChange={(e => updateFields({ zip: e.target.value }))}
            />
        </FormWrapper>
    )
}