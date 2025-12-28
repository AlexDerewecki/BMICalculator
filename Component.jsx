import "./index.css"
import React, {useState} from "react"
import BmiChart from "./Graph.jsx"



function Component(){

    const[system, setSystem] = useState("Metric")

    const[weightKg, setWeightKg] = useState("")
    const[weightLbs, setWeightLbs] = useState("")

    const[heightCm, setHeightCm] = useState("")
    const[heightFeet, setHeightFeet] = useState("")
    const[heightInches, setHeightInches] = useState("")

    const[bmi, setBmi] = useState("")
    const[numericBmi, setNumericBmi] = useState(null)

    function calcCateogory(bmiValue){
        switch(true){
            case(bmiValue < 18.5) : return "Underweight"
            case(bmiValue >= 18.5 && bmiValue <= 24.9) : return "normal"
            case(bmiValue >= 25 && bmiValue <= 29.9) : return "Overweight"
            case(bmiValue >= 30) : return "Obese"
            default : return ""
        }
    }
    function HandleSystemChange(sys){
        if(sys === "Metric"){
            setSystem("Metric")
            setWeightKg("")
            setHeightCm("")
        }
        else if(sys === "Imperial"){
            setSystem("Imperial")
            setWeightLbs("")
            setHeightFeet("")
            setHeightInches("")
        }
    }

    function HandleCalc() {
        let bmiValue = 0
        if(system === "Metric"){
            const heightInCm = parseFloat(heightCm)
            const weightInKg = parseFloat(weightKg)
            if(heightCm > 0 && weightInKg > 0){
                bmiValue = weightInKg / ((heightInCm) ** 2) * 10000
                const category = calcCateogory(bmiValue)
                setBmi(`Your BMI is ${bmiValue.toFixed(2)} (${category})`)
            }
            else{
                setBmi("Please enter valid height and weight")
            }
        }
        else if(system === "Imperial"){
            const heightInInches = (parseFloat(heightFeet) * 12) + parseFloat(heightInches)
            const weightInLbs = parseFloat(weightLbs)
            if(heightInInches > 0 && weightInLbs > 0){
                bmiValue = weightInLbs / (heightInInches ** 2) * 703
                const category = calcCateogory(bmiValue)
                setBmi(`Your BMI is ${bmiValue.toFixed(2)} (${category})`)
            }
            else {
                setBmi("Please enter valid height and weight")
            }
        }
    }
    
    return(
        <div className="container">
            <div className="i_Panel">
                <h1>BMI Tracker</h1>
                <div className="Sys_toggle">
                    <label>
                        <input
                            type="radio"
                            name="system"
                            checked ={system === "Metric"}
                            onChange={() => HandleSystemChange("Metric")}
                        />
                        <span className="checkmark"></span>
                        Metric
                    </label>
                    <label>
                        <input 
                            type="radio"
                            name="system"
                            checked={system === "Imperial"}
                            onChange={() => HandleSystemChange("Imperial")}
                        />
                        <span className="checkmark"></span>
                        Imperial
                    </label>
                </div>

                {system === "Metric" ? (
                    <div className="metric-inputs">
                        <div className="weight">
                            <input
                                type="number"
                                value={weightKg}
                                onChange={(e) => setWeightKg(e.target.value)}
                                placeholder="Weight (Kg)"
                            />
                        </div>
                        <div className="height">
                            <input
                                type="number"
                                value={heightCm}
                                onChange={(e) => setHeightCm(e.target.value)}
                                placeholder="Height (Cm)"
                            />
                        </div>
                    </div>   
                ) : (
                    <div className="Imperial-inputs">
                        <div className="weight">
                            <input
                                type="number"
                                value={weightLbs}
                                onChange={(e) => setWeightLbs(e.target.value)}
                                placeholder="Weight (Lbs)"
                            />
                        </div>
                        <div className="height">
                            <div id="height-feet-inches">
                                <input
                                    type="number"
                                    value={heightFeet}
                                    onChange={(e) => setHeightFeet(e.target.value)}
                                    placeholder="Height (Feet)"
                                />
                                <input
                                    type="number"
                                    value={heightInches}
                                    onChange={(e) => setHeightInches(e.target.value)}
                                    placeholder="Height (Inches)"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={HandleCalc}>Calculate BMI</button>
            <p>{bmi}</p>
        </div>
    )
}
export default Component