import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterUserScheme, type RegisterUserType } from "../Schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import {CustomInput} from "@components"
import { useModalContext, Modal } from "@components/Modal"
import { useDispatch, useSelector} from "react-redux"
import { AppDispatch, RootState, UsersState } from "@redux"
import { Rol, User } from "@models"
import { PUBLIC } from "@models/routes/routes"
import { useNavigate } from "react-router-dom"
import * as authService from "@services"
import '../Form.css'
import { useMobileContext } from "@contexts/isMobile.context"

function RegisterForm() {
    const dispatch = useDispatch<AppDispatch>();
    const usersState: UsersState = useSelector((store: RootState) => store.user)
    const navigator = useNavigate()
    const {state, setState} = useModalContext()
    const {isMobile} = useMobileContext()
    
    const {control, handleSubmit, formState: { errors }} = useForm<RegisterUserType>({
        resolver: zodResolver(RegisterUserScheme),
    })

    const onSubmit: SubmitHandler<RegisterUserType>= (data) => {
        const newUser: User = {
            id: usersState.users.length + 1,
            username: data.username,
            password: data.password,
            email: data.email,
            favorites: [],
            teams: [],
            rol: Rol.USER,
        }

        if (!authService.register(newUser, dispatch, usersState)) {
            setState(true)
            return
        }

        navigator(`/${PUBLIC.LANDING_PAGE}`)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`auth-form mx-auto ${isMobile ? 'w-100' : 'w-60'}`}>
            <div style={{ width: '100%', height: '100px' }} className="d-flex align-items-center justify-content-center">
                <i className="bi bi-person-circle text-blue" style={{ fontSize: '80px' }}></i>
            </div>
            <CustomInput name="username" control={control} label="Username" type="text" placeholderIcon="👤" error={errors.username}/>
            <CustomInput name="password" control={control} label="Password" type="password" placeholderIcon="🗝" error={errors.password}/>
            <CustomInput name="confirmPassword" control={control} label="Confirm password" placeholderIcon="🗝" type="password" error={errors.confirmPassword}/>
            <CustomInput name="email" control={control} label="Email" type="email" placeholderIcon="🖂" error={errors.email}/>
            <button type="submit" className="btn btn-outline-light col-md-9 mx-auto">Register</button>
            <Modal>
                <p>That username is already choosen</p>
                <p>Please try another one</p>
            </Modal>
        </form>
    )
}

export default RegisterForm