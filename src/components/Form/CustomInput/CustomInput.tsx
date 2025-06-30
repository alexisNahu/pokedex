import { Control, Controller, FieldError } from 'react-hook-form'
import './CustomInput.css'

interface Props {
    name: string,
    control: Control<any>
    label: string,
    type?:string,
    error?: FieldError,
    placeholderIcon?: string,
    text?: string
}

function CustomInput({name, control, label, type, error, placeholderIcon, text}: Props) {
  return (
    <div className='form-group'>
        <Controller 
            name={name}
            control = {control}
            render={({ field }) => (
            <>
              {text && <label className={`col-md-${type==='checkbox'?'6':'12'} col-form-label text-white`}>{text}</label>}                
              <input
                id={name}
                placeholder={`${placeholderIcon ?? ''} ${label}`}
                type={type}
                {...field}
                className={`col-md-${type==='checkbox'?'2':'9 mx-auto'} ${error ? 'is-invalid' : 'valid'}`}
              />
            </>
          )}
          />
          {error && <div className='error'>{error.message}</div>}
    </div>
  )
}

export default CustomInput