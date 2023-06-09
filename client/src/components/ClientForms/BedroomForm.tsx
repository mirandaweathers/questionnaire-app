import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FormWrapper } from "../../utilities/FormWrapper";
import { FormEvent, useState } from "react";

export function BedRoomForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const { email, name, diningRoomDone, livingRoomDone } = location.state;

    const [selectedStyles, setSelectedStyles] = useState([]);
    const [otherStyle, setOtherStyle] = useState('');
    const [moods, setMoods] = useState([]);
    const [otherMood, setOtherMood] = useState('');
    const [activities, setActivities] = useState([]);
    const [otherActivities, setOtherActivities] = useState('');
    const [color, setColor] = useState('');
    const [bedding, setBedding] = useState('');
    const [furniture, setFurniture] = useState('');
    const [notes, setNotes] = useState('');

    type BedroomData = {
        client: string
        style: string
        mood: string
        activities: string
        color:string
        bedding:string
        furnitureToKeep:string
        otherNotes:string
    }

    const INITIAL_STATE: BedroomData = {
        client: email,
        style: '',
        mood: '',
        activities: '',
        color: '',
        bedding: '',
        furnitureToKeep: '',
        otherNotes: ''
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

    const activityOptions = [
        {
            value: 'Reading'
        },
        {
            value: 'Deskwork'
        },
        {
            value: 'Television',
        }
    ]

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

    const handleActivityChange = (option:any) => {
        // @ts-ignore
        const isChecked = activities.some(activity => activity.value === option.value)
        if (isChecked) {
            setActivities(
                activities.filter(
                    // @ts-ignore
                    (activity) => activity.value !== option.value
                )
            );
        } else {
            setActivities(activities.concat(option));
        }
    };

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

    const submitTest = (e: any) => {
        let submission:BedroomData = INITIAL_STATE;

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

        for(let a of activities) {
            // @ts-ignore
            submission.activities += a.value + ', ';
        }
        // @ts-ignore
        submission.activities += otherActivities + ', ';
        submission.bedding = bedding;
        submission.color = color;
        submission.furnitureToKeep = furniture;
        submission.otherNotes = notes;

        // alert(JSON.stringify(submission))

        fetch('http://localhost:3000/bedroom', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
          })
          .then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                navigate('/rooms', { 
                    replace: true, 
                    state: {
                        email: email, 
                        name: name, 
                        bedroomDone: true, 
                        diningRoomDone: diningRoomDone,
                        livingRoomDone: livingRoomDone
                    }
                })
            } else {
                throw new Error('Failed to add client');
            }
          })
          .catch(error => {
            console.error(error);
          });
    }

    function onCancel(e: FormEvent) {
        if(confirm("Are you sure? All bedroom data will be lost!")) {
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
            <FormWrapper title="Bedroom Details">
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


                <p className="label">
                    Activities
                    {activityOptions.map((data, index) => (
                        <div className="regularCheckboxes">
                            <input
                                key={`cb-${index}`}
                                id={data.value}
                                value={data.value}
                                type="checkbox"
                                // @ts-ignore
                                checked={activities.some(activity => activity.value === data.value)}
                                onChange={() => handleActivityChange(data)}
                            />
                            <label htmlFor={data.value}>{data.value}</label>
                        </div>
                    ))}
                </p>

                <label className="wideInput">
                    Other Activities <span className="labelHelper">(optional)</span>
                    <input
                        type="text"
                        value={otherActivities}
                        onChange={(e)=>setOtherActivities(e.target.value)}
                        placeholder="Activity not listed above..."
                    ></input>
                </label>

                <label className="wideInput">
                    Bedding Requirements
                    <input
                        type="text"
                        value={bedding}
                        onChange={(e)=>setBedding(e.target.value)}
                        placeholder="Bedding..."
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

                <label className="wideInput">
                    Other Notes
                    <textarea
                        placeholder="Notes..."
                        value={notes}
                        onChange={(e)=>setNotes(e.target.value)}
                    >
                    </textarea>
                </label>

                <button style={{marginTop: '20px'}} type="button" onClick={submitTest}>Save</button>
                <button style={{marginLeft: '20px'}} type="button" className='cancelButton' onClick={onCancel}>Cancel</button>
            </FormWrapper>
        </div>
    )
}