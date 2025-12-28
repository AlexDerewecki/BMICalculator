import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)


function BmiChart({ bmi }) {
  if (!bmi) return null

  const data = {
    labels: ["Underweight", "Normal", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI scale",
        data: [18.5, 24.9, 29.9, 40],
        backgroundColor: [
          "#4da6ff",
          "#4caf50",
          "#ff9800",
          "#f44336"
        ]
      },
      {
        label: "Your BMI",
        data: [
          bmi < 18.5 ? bmi : 0,
          bmi >= 18.5 && bmi < 25 ? bmi : 0,
          bmi >= 25 && bmi < 30 ? bmi : 0,
          bmi >= 30 ? bmi : 0
        ],
        backgroundColor: "#000"
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        min: 0,
        max: 40,
        title: {
          display: true,
          text: "BMI value"
        }
      }
    }
  }

  return <Bar data={data} options={options} />
}

export default BmiChart