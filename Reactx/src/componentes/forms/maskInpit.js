import React from 'react';
import InputMask from 'react-input-mask';
import Styles from './maskInput.modules.css'

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');

const MaskedInput = ({ value, onChange, name, mask,text }) => {
    function handleChange(event) {
      onChange({
        ...event,
        target: {
          ...event.target,
          name,
          value: onlyNumbers(event.target.value)
        }
      });
    }
  
    return (
        <div className={Styles.form_control}>
        <form>
        <label htmlFor={name}>{text}</label>
        <InputMask name={name} mask={mask} value={value} placeholder='ex:704.261.843-27' onChange={handleChange}/>
        </form>
        </div>  
      
    );
  };
  
  export default MaskedInput;