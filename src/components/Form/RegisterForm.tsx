import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterUserScheme, type RegisterUserType } from "./Schema"
import { zodResolver } from "@hookform/resolvers/zod"
import CustomInput from "./CustomInput"

function RegisterForm() {
    const {control, handleSubmit, formState: { errors }} = useForm<RegisterUserType>({
        resolver: zodResolver(RegisterUserScheme),
    })

    const onSubmit: SubmitHandler<RegisterUserType>= (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput name="username" control={control} label="username" type="text" error={errors.username}/>
            <CustomInput name="password" control={control} label="password" type="password" error={errors.password}/>
            <CustomInput name="confirmPassword" control={control} label="confirmPassword" type="password" error={errors.confirmPassword}/>
            <CustomInput name="email" control={control} label="email" type="email" error={errors.email}/>
            <button type="submit">Register</button>
        </form>
    )
}

export default RegisterForm