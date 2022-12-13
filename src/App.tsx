import React  from 'react'
import './App.scss'
import Info from "./components/Info/Info";
import Experience from "./components/Experience/Experience";

const App: React.FC = () => {

  return (
    <div className="App">
      <Info/>
      <Experience/>
    </div>
  )
}

export default App
