import "./index.css"
import React, {useState} from "react"



function Component(){

    const[weight, setWeight] = useState("")
    const[weightInput, setWeightInput] = useState(" ")
    const[unit, setUnit] = useState('Kg')
    const[height, setHeight] = useState("")
    const[bmi, setBmi] = useState(" ")
    const[numericBmi, setNumericBmi] = useState(null)

    const LB_per_Kg = 2.2

    function calcCateogory(bmi){
        switch(true){
            case(bmi < 18.5) : return "Underweight"
            case(bmi >= 18.5 && bmi < 24.9) : return "normal"
            case(bmi >= 25 && bmi < 29.9) : return "Overweight"
            case(bmi >= 30) : return "Obese"
            default : return ""
        }
    }
    function HandleUnitChange(newUnit){
        if(!weightInput){
            setUnit(newUnit)
            return
        }
    
        const val = parseFloat(weightInput)
        if(Number.isNaN(val)){
            setUnit(newUnit)
            return
        }

        let converted
        if(unit === 'Kg' && newUnit === "Lbs"){
            converted = (val * LB_per_Kg).toFixed(2
            )
        }
        else if(unit === "Lbs" && newUnit === "Kg"){
            converted = (val / LB_per_Kg).toFixed(2)
        } else {
            converted = val.toFixed(2)
        }
        setWeightInput(String(converted))
        setUnit(newUnit)
    }

    function HandleCalc(){
        const w = parseFloat(weightInput)
        const h = parseFloat(height) / 100
        if(!w || !h){
            setBmi("Please enter valid weight and height")
            setNumericBmi(null)
            return
        }

        const weightKg = unit === "Kg" ? w : w / LB_per_Kg
        const result = +(weightKg / (h * h)).toFixed(2)
        const category = calcCateogory(result)
        setBmi(`${result} - ${category}`)
        setWeight(`${parseFloat(weightInput).toFixed(2)} ${unit}`)
        setNumericBmi(result)
    }
    
    return(
        <div className="container">
            <h1>BMI Tracker</h1>
            
            <input 
                type="number" 
                value={weightInput} 
                onChange ={e => setWeightInput(e.target.value)}
                placeholder={`weight (${unit})`}
            />


            <input
                type="number"
                onChange={e => setHeight(e.target.value)}
                placeholder="height (cm)"
            />

            <div id="choose-Btns">
                <label>
                    <input
                        type="radio"
                        name="unit"
                        checked={unit === "Kg"}
                        onChange={() => HandleUnitChange("Kg")}
                    />
                    <span className="checkmark"></span>
                    Kg
                </label>
                <label>
                    <input
                        type="radio"
                        name="unit"
                        checked={unit === "Lbs"}
                        onChange={() => HandleUnitChange("Lbs")}
                    />
                    <span className="checkmark"></span>
                    Lbs
                </label>
            </div>

            <button onClick={HandleCalc} >
                Calculate BMI</button>
            <p>{bmi}</p>
            

            
        </div>
    )
}

export default Component