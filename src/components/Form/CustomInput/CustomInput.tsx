import { Control, Controller, FieldError } from 'react-hook-form'
import './CustomInput.css'

interface Props {
    name: string,
    control: Control<any>
    label: string,
    type?:string,
    error?: FieldError,
    placeholderIcon?: string,
}

function CustomInput({name, control, label, type, error, placeholderIcon}: Props) {
  return (
    <div className='form-group row'>
        <Controller 
            name={name}
            control = {control}
            render = {({field}) => 
                <input id={name} placeholder={`${placeholderIcon} ${label}`} type={type} {...field} className={`col-md-9 ${error ? 'is-invalid' : 'valid'} `} />
            }
        />
        {error && <div className='error'>{error.message}</div>}
    </div>
  )
}

export default CustomInput