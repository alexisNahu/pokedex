import { SubmitHandler, useForm } from "react-hook-form"
import { LoginUserScheme, type LoginUserType } from "../Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "../CustomInput/CustomInput"
import '../Form.css'
import { useNavigate } from "react-router-dom"
import { PUBLIC } from "@models/routes/routes"
import { Modal } from "@components/Modal/CustomModal"
import { useModalContext } from "@components/Modal/context/UseModalContext"
import * as authService from "@services/auth.service"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "src/redux/store"
import { UsersState } from "../../../redux/slices/user/reducers/user.reducer"

function LoginForm() {
    const dispatch = useDispatch<AppDispatch>();
    const navigator = useNavigate()
    const usersState: UsersState = useSelector((store: RootState) => store.user)
    const {setState} = useModalContext()
    
    const {control, handleSubmit, formState: { errors }} = useForm<LoginUserType>({
        resolver: zodResolver(LoginUserScheme),
    })

    const onSubmit: SubmitHandler<LoginUserType>= (data) => {
        const user = {
            username: data.username,
            password: data.password,
        }

        if (!authService.login(user, dispatch, usersState)) {
            setState(true)
            return
        } 
        
        navigator(`/${PUBLIC.LANDING_PAGE}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form col-md-6 mx-auto">
            <div style={{ width: '100%', height: '100px' }} className="d-flex align-items-center justify-content-center">
                <i className="bi bi-person-circle text-blue" style={{ fontSize: '80px' }}></i>
            </div>
            <CustomInput name="username" control={control} label="Username" type="text" placeholderIcon="👤" error={errors.username}/>
            <CustomInput name="password" control={control} label="Password" type="password" placeholderIcon="🗝" error={errors.password}/>
            <button type="submit" className="btn btn-outline-light col-md-9 mx-auto">Login</button>
            <Modal>
                <p>User not found</p>
                <p>Check if the password or username is wrong</p>
            </Modal>
        </form>
    )
}

export default LoginForm