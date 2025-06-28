import { SubmitHandler, useForm } from "react-hook-form"
import { LoginUserScheme, type LoginUserType } from "../Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "../CustomInput/CustomInput"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "../../../redux/store"
import { loginUser } from "../../../redux/slices/User"
import '../Form.css'
import { useNavigate } from "react-router-dom"
import { PUBLIC } from "@models/routes/routes"

function LoginForm() {
    const userState = useSelector((store: RootState) => store.user)
    const dispatch = useDispatch<AppDispatch>();
    const navigator = useNavigate()
    
    const {control, handleSubmit, formState: { errors }} = useForm<LoginUserType>({
        resolver: zodResolver(LoginUserScheme),
    })

    const onSubmit: SubmitHandler<LoginUserType>= (data) => {
        const user = {
            username: data.username,
            password: data.password,
        }
        navigator(`/${PUBLIC.LANDING_PAGE}`)

        console.log(dispatch(loginUser(user)))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form col-md-6 mx-auto">
            <div style={{ width: '100%', height: '100px' }} className="d-flex align-items-center justify-content-center">
                <i className="bi bi-person-circle text-blue" style={{ fontSize: '80px' }}></i>
            </div>
            <CustomInput name="username" control={control} label="Username" type="text" placeholderIcon="👤" error={errors.username}/>
            <CustomInput name="password" control={control} label="Password" type="password" placeholderIcon="🗝" error={errors.password}/>
            <button type="submit" className="btn btn-outline-light col-md-9 mx-auto">Login</button>
        </form>
    )
}

export default LoginForm