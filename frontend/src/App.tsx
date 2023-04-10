import React, {useRef} from 'react'
import './App.scss'
import Info from "./components/Info/Info";
import Experience from "./components/Experience/Experience";
import Header from "./components/Header/Header";
import Pdf from "react-to-pdf";
import './assets/styles/globals.scss'

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <Pdf targetRef={ref} filename="document.pdf">
        {({toPdf}) => (
          <button onClick={toPdf} className="button">
            Generate PDF
          </button>
        )}
      </Pdf>
      <div className="App" ref={ref}>
        <Header/>
        <Info/>
        <Experience/>
      </div>
    </>
  )
}

export default App
