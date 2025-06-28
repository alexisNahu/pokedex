import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterUserScheme, type RegisterUserType } from "../Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "../CustomInput/CustomInput"
import '../Form.css'
import { useDispatch, useSelector } from "react-redux"
import { RootState, AppDispatch } from "src/redux/store"
import { Rol, User } from "@models/user.model"
import { registerUser } from "../../../redux/slices/User"

function RegisterForm() {
    const userState = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch<AppDispatch>();
    
    const {control, handleSubmit, formState: { errors }} = useForm<RegisterUserType>({
        resolver: zodResolver(RegisterUserScheme),
    })

    const onSubmit: SubmitHandler<RegisterUserType>= (data) => {
        const newUser: User = {
            name: data.username,
            password: data.password,
            email: data.email,
            rol: Rol.USER
        }

        dispatch(registerUser(newUser))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form col-md-6 mx-auto">
            <div style={{ width: '100%', height: '100px' }} className="d-flex align-items-center justify-content-center">
                <i className="bi bi-person-circle text-blue" style={{ fontSize: '80px' }}></i>
            </div>
            <CustomInput name="username" control={control} label="Username" type="text" placeholderIcon="👤" error={errors.username}/>
            <CustomInput name="password" control={control} label="Password" type="password" placeholderIcon="🗝" error={errors.password}/>
            <CustomInput name="confirmPassword" control={control} label="Confirm password" placeholderIcon="🗝" type="password" error={errors.confirmPassword}/>
            <CustomInput name="email" control={control} label="Email" type="email" placeholderIcon="🖂" error={errors.email}/>
            <button type="submit" className="btn btn-outline-light col-md-9 mx-auto">Register</button>
        </form>
    )
}

export default RegisterForm