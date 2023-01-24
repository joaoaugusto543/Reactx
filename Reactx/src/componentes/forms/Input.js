import Styles from './Input.module.css'

function Input({tipo,type,placeholder,name,value,onChange,text}){
    return(
    <div className={`${Styles.contaForms}`} id={tipo}>
        <form>
        <label htmlFor={name}>{text}</label>
        <input type={type} placeholder={placeholder} name={name} id={name} value={value} onChange={onChange}></input>

        </form>
    </div>
    )
}

export default Input