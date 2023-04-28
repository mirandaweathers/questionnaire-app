import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormWrapper } from "../../utilities/FormWrapper";

export function DiningRoomForm() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { email, name, bedroomDone, livingRoomDone } = location.state;

    const [selectedStyles, setSelectedStyles] = useState([]);
    const [otherStyle, setOtherStyle] = useState('');
    const [moods, setMoods] = useState([]);
    const [otherMood, setOtherMood] = useState('');
    const [color, setColor] = useState('');
    const [furniture, setFurniture] = useState('');
    const [notes, setNotes] = useState('');

    const [storage, setStorage] = useState('');

    const [meals, setMeals] = useState({
        breakfast: {
            numPeople: 0,
            location: ''
        },
        lunch: {
            numPeople: 0,
            location: ''
        },
        dinner: {
            numPeople: 0,
            location: ''
        },
        notes: ''
    });

    const [entertaining, setEntertaining] = useState({
        parties: {
            numPeople: '',
            formalInformal: '',
            howOften: ''
        },
        dinners: {
            numPeople: '',
            formalInformal: '',
            howOften: ''
        },
        holidays: {
            numPeople: '',
            formalInformal: '',
            howOften: ''
        },
        notes: ''
    })

    type DiningRoomData = {
        client: string
        style: []
        mood: []
        color: string
        storage: {}
        meals: {}
        entertaining: {}
        furniture: string
        notes: string
    }

    const INITIAL_STATE:DiningRoomData = {
        client: email,
        style: [],
        mood: [],
        color: '',
        storage: {},
        meals: {},
        entertaining: {},
        furniture: '',
        notes: ''
    }

    const styleOptions = [
        {
            id: 'myCheckbox1',
            imageUrl: "url('../../public/images/bedroom-midcentury-modern.jpg')",
            bgPosition: 'center',
            labelText: 'Midcentury Modern',
        },
        {
            id: 'myCheckbox2',
            imageUrl: "url('../../public/images/bedroom-traditional.jpg')",
            bgPosition: 'left center',
            labelText: 'Traditional',
        },
        {
            id: 'myCheckbox3',
            imageUrl: "url('../../public/images/bedroom-bohemian.jpg')",
            bgPosition: 'center',
            labelText: 'Bohemian',
        },
        {
            id: 'myCheckbox4',
            imageUrl: "url('../../public/images/bedroom-coastal.jpg')",
            bgPosition: 'center',
            labelText: 'Coastal',
        },
        {
            id: 'myCheckbox5',
            imageUrl: "url('../../public/images/bedroom-shabby-chic.jpg')",
            bgPosition: 'center',
            labelText: 'Shabby Chic',
        },
        {
            id: 'myCheckbox6',
            imageUrl: "url('../../public/images/bedroom-mountain-cabin.jpg')",
            bgPosition: 'center',
            labelText: 'Rustic Cabin',
        },
        {
            id: 'myCheckbox7',
            imageUrl: "url('../../public/images/bedroom-glam.jpg')",
            bgPosition: 'center',
            labelText: 'Glam',
        },
        {
            id: 'myCheckbox8',
            imageUrl: "url('../../public/images/bedroom-scandinavian.jpg')",
            bgPosition: 'center',
            labelText: 'Scandinavian',
        },
        {
            id: 'myCheckbox9',
            imageUrl: "url('../../public/images/bedroom-maximalist-colorful.jpg')",
            bgPosition: 'center',
            labelText: 'Colorful & Artsy',
        },
    ]

    const handleStyleChange = (data:any) => {
        // @ts-ignore
        const isChecked = selectedStyles.some(selectedStyle => selectedStyle.labelText === data.labelText)
        if (isChecked) {
            setSelectedStyles(
                selectedStyles.filter(
                    // @ts-ignore
                    (selectedStyle) => selectedStyle.labelText !== data.labelText
                )
            );
        } else {
            setSelectedStyles(selectedStyles.concat(data));
        }
    };

    const moodOptions = [
        {
            value: 'Cozy',
            divId: 'div1'
        },
        {
            value: 'Elegant',
            divId: 'div2'
        },
        {
            value: 'Bright',
            divId: 'div3'
        },
        {
            value: 'Dramatic',
            divId: 'div4'
        },
        {
            value: 'Relaxing',
            divId: 'div5'
        },
        {
            value: 'Glamorous',
            divId: 'div6'
        },
        {
            value: 'Romantic',
            divId: 'div7'
        },
        {
            value: 'Exciting',
            divId: 'div8'
        },
        {
            value: 'Welcoming',
            divId: 'div9'
        },
    ]

    const handleMoodChange = (option:any) => {
        // @ts-ignore
        const isChecked = moods.some(mood => mood.value === option.value)
        if (isChecked) {
            setMoods(
                moods.filter(
                    // @ts-ignore
                    (mood) => mood.value !== option.value
                )
            );
        } else {
            setMoods(moods.concat(option));
        }
    };

    const handleSubmit = () => {
        let submission:DiningRoomData = INITIAL_STATE;
        
        for(let s of selectedStyles) {
            // @ts-ignore
            submission.style += s.labelText + ', ';
        }

        // @ts-ignore
        submission.style += otherStyle + ', ';

        for(let m of moods) {
            // @ts-ignore
            submission.mood += m.value + ', ';
        }

        // @ts-ignore
        submission.mood += otherMood + ', ';

        submission.color = color;
        submission.storage = storage;
        submission.furniture = furniture;
        submission.meals = JSON.stringify(meals);
        submission.entertaining = JSON.stringify(entertaining);
        submission.notes = notes;

        alert(JSON.stringify(submission))

        fetch('http://localhost:3000/diningroom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        })
        .then(async (response) => {
            if(response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/rooms', { 
                    replace: true, 
                    state: {
                        email: email, 
                        name: name, 
                        diningRoomDone: true,
                        livingRoomDone: livingRoomDone,
                        bedroomDone: bedroomDone
                    }
                })
            } else {
                throw new Error('Failed to add dining room data');
            }
          })
          .catch(error => {
            console.error(error);
          });
    }

    function onCancel(e: FormEvent) {
        if(confirm("Are you sure? All dining room data will be lost!")) {
            navigate('/rooms', {
                replace: true, 
                    state: {
                        email: email, 
                        name: name,
                    }
            })
        }
    }

    return (
        <div className='formContainer'>
            <FormWrapper title="Dining Room Details">
                <h3>Aesthetics</h3>
                <p className='label'>Desired Style</p>

                <span>
                    <ul className='customCheckboxes' style={{paddingInlineStart: '0px'}}>
                        {styleOptions.map((option, index) => (
                            <li>
                                <input
                                    key={`cb-${index}`}
                                    id={option.id}
                                    value={option.labelText}
                                    type="checkbox"
                                    // @ts-ignore
                                    checked={selectedStyles.some(selectedStyle => selectedStyle.labelText === option.labelText)}
                                    onChange={() => handleStyleChange(option)}
                                />
                                <label htmlFor={option.id}>
                                    <div
                                        className="checkboxcard"
                                        style={{backgroundImage: option.imageUrl}}
                                    ></div>
                                    <div className="checkboxlabel">
                                        {option.labelText}
                                    </div>
                                </label>
                            </li>
                        )
                        )}
                    </ul>
                </span>

                <label>
                    Other Style Preferences <span className="labelHelper">(optional)</span>
                    <input 
                        type="text"
                        value={otherStyle}
                        onChange={(e) => setOtherStyle(e.target.value)}
                        placeholder="Style not listed above..."
                    ></input>
                </label>

                <p className="label">
                    Mood
                    <div className="parent">
                        {moodOptions.map((data, index) => (
                            <div id={data.divId} className="regularCheckboxes">
                                <input
                                    key={`cb-${index}`}
                                    id={data.value}
                                    value={data.value}
                                    type="checkbox"
                                    // @ts-ignore
                                    checked={moods.some(mood => mood.value === data.value)}
                                    onChange={() => handleMoodChange(data)}
                                />
                                <label htmlFor={data.value}>{data.value}</label>
                            </div>
                        ))}
                    </div>
                </p>

                <label className="wideInput">
                    Other Mood Preferences <span className="labelHelper">(optional)</span>
                    <input 
                        type="text"
                        value={otherMood}
                        onChange={(e) => setOtherMood(e.target.value)}
                        placeholder="Mood not listed above..."
                    ></input>
                </label>

                <label className="wideInput">
                    Color Preferences
                    <input 
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="Jewel tones, no orange, etc."
                    ></input>
                </label>

                <label className="wideInput">
                    Storage Needs
                    <input 
                        type="text"
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                        placeholder="Wine bar, display cabinet, etc."
                    ></input>
                </label>

                <label className="wideInput">
                    Furniture to Keep
                    <input
                        type="text"
                        value={furniture}
                        onChange={(e)=>setFurniture(e.target.value)}
                        placeholder="Furniture..."
                    ></input>
                </label>

                <h3 style={{marginTop: '40px'}}>Entertaining</h3>

                <h4>Parties</h4>
                <label>
                    Number of people
                    <input
                        type="text"
                        value={entertaining.parties.numPeople}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            parties: {
                                ...entertaining.parties, 
                                numPeople: e.target.value
                            }
                        })}
                        placeholder="10-20"
                    ></input>
                </label>
                <label>
                    Formal/Informal
                    <input
                        type="text"
                        value={entertaining.parties.formalInformal}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            parties: {
                                ...entertaining.parties, 
                                formalInformal: e.target.value
                            }
                        })}
                        placeholder="Formal"
                    ></input>
                </label>
                <label>
                    How often?
                    <input
                        type="text"
                        value={entertaining.parties.howOften}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            parties: {
                                ...entertaining.parties, 
                                howOften: e.target.value
                            }
                        })}
                        placeholder="Twice a year"
                    ></input>
                </label>

                <h4>Dinners</h4>
                <label>
                    Number of people
                    <input
                        type="text"
                        value={entertaining.dinners.numPeople}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            dinners: {
                                ...entertaining.dinners, 
                                numPeople: e.target.value
                            }
                        })}
                        placeholder="10-20"
                    ></input>
                </label>
                <label>
                    Formal/Informal
                    <input
                        type="text"
                        value={entertaining.dinners.formalInformal}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            dinners: {
                                ...entertaining.dinners, 
                                formalInformal: e.target.value
                            }
                        })}
                        placeholder="Formal"
                    ></input>
                </label>
                <label>
                    How often?
                    <input
                        type="text"
                        value={entertaining.dinners.howOften}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            dinners: {
                                ...entertaining.dinners, 
                                howOften: e.target.value
                            }
                        })}
                        placeholder="Twice a year"
                    ></input>
                </label>

                <h4>Holidays</h4>
                <label>
                    Number of people
                    <input
                        type="text"
                        value={entertaining.holidays.numPeople}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            holidays: {
                                ...entertaining.holidays, 
                                numPeople: e.target.value
                            }
                        })}
                        placeholder="10-20"
                    ></input>
                </label>
                <label>
                    Formal/Informal
                    <input
                        type="text"
                        value={entertaining.holidays.formalInformal}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            holidays: {
                                ...entertaining.holidays, 
                                formalInformal: e.target.value
                            }
                        })}
                        placeholder="Formal"
                    ></input>
                </label>
                <label>
                    How often?
                    <input
                        type="text"
                        value={entertaining.holidays.howOften}
                        onChange={(e) => setEntertaining({
                            ...entertaining, 
                            holidays: {
                                ...entertaining.holidays, 
                                howOften: e.target.value
                            }
                        })}
                        placeholder="Twice a year"
                    ></input>
                </label>

                <label>
                    <h4>Other Notes</h4>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Notes..."
                    ></textarea>
                </label>

                <button style={{marginTop: '20px'}} type="button" onClick={handleSubmit}>Save</button>
                <button style={{marginLeft: '20px'}} type="button" className='cancelButton' onClick={onCancel}>Cancel</button>
            </FormWrapper>
        </div>
    )
}