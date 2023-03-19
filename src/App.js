import './App.css';
import { useRef, useState } from "react";

function App() {

  const [valid, setValid] = useState({
    name: '', surname: '', number:''
})
const changeInput = (field, e) => {
    setValid({ ...valid, [field]: e.target.value })
}

let nameRef = useRef();
let surnameRef = useRef();
let numberRef = useRef();
let validName = /^[A-Z][a-z]+$/;
let validNumber = /^\d{4}-\d{4}-\d{4}-\d{4}$/;


const valiudFields = (e) => {
  e.preventDefault();
  nameRef.current.style.opacity = valid.name.match(validName) ? 0 : 1;
  surnameRef.current.style.opacity = valid.surname.match(validName) ? 0 : 1;
  numberRef.current.style.opacity = valid.number.match(validNumber) ? 0 : 1;
}
const numberChange = e => {
  if (e.target.value.toString().charAt(e.target.value.length - 1).charCodeAt() >= 48 && e.target.value.toString().charAt(e.target.value.length - 1).charCodeAt() <= 57) {
      if (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14) {
          setValid({ ...valid, number: e.target.value.toString().concat('-') })
      }
      else {
          setValid({ ...valid, number: e.target.value })
      }
  }
}
const numberKeyChange = e => {
  if (e.key === 'Backspace') {
      e.preventDefault();
      setValid({ ...valid, number: e.target.value.toString().slice(0, -1) })
  }
}


  return (
    <div className="App">
      <div className="valid-fields">
        <div className="invalid" ref={nameRef}>!</div>
        <input type="text" ref={surnameRef}
        placeholder="Name"
        value={valid.name}
        onChange={(e) => changeInput('name', e)}
        />
        <div className="invalid" ref={surnameRef}>!</div>
        <input type="text" 
        placeholder="Surname"
        value={valid.surname}
        onChange={(e) => changeInput('surname', e)}
        />
        <div className="invalid" ref={numberRef}>!</div>
        <input type="text" 
        placeholder="XXXX-XXXX-XXXX-XXXX"
        value={valid.number}
        maxLength={19}
        onChange={(e) => numberChange(e)}
        onKeyDown={(e) => numberKeyChange(e)}
        />
      </div>
      <button onClick={valiudFields}>Check</button>
      
    </div>
  );
}

export default App;
