import { useState, useEffect } from 'react'
import fullReport from '../services/openweather'

const WeatherReport = ({city}) => {
  const [report, setReport] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const report = await fullReport(city)
        setReport(report)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [city]) 

  if (!report) return 

  return (
    <>
      <p>Temperature: {report.main.temp} Celsius</p>
      <img 
        src={`https://openweathermap.org/img/wn/${report.weather[0].icon}@2x.png`}
        alt={`${report.weather[0].description}`}
      ></img>
      <p>Wind: {report.wind.speed} m/s</p>
    </>
  )
} 

export default WeatherReport
