import Styles from './Select.module.css'

function Select({name,array,text,value,OnChange}){

    return(
    <div className={Styles.select}>
    <label htmlFor={name}>{text}</label>
    <select name={name} id={name} onChange={OnChange} value={value || ''}>
        <option value=''>selecione uma opção</option>
        { array && array.map((elemento)=>{
            return(
                <option key={elemento.id} value={elemento.id}>{elemento.tipo}</option>
            )
        })}
    </select>

    </div>

    )
}

export default Select