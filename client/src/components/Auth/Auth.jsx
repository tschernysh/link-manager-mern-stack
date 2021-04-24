import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../context/alertContext'
import { AuthContext } from '../../context/authContext'
import { useHttp } from '../../hooks/http.hook'
import s from './Auth.module.css'

const Auth = (props) => {
    const { request, loading, error, message, clearError, clearMessage } = useHttp()
    const [currentAction, setCurrentAction] = useState('LOGIN')
    const auth = useContext(AuthContext)
    const alert = useContext(AlertContext)
    const [isFetching, setIsFetching] = useState(false)
    const [forms, setForms] = useState({ email: '', password: '' })

    let formsHandler = (event) => {
        setForms({ ...forms, [event.target.name]: event.target.value })
    }

    let changeAction = (e) => {
        // console.log(loading);
            if (e === 'Login' && currentAction === 'REGISTRATION') {
                setIsFetching(true)
                setTimeout(() => {
                    setCurrentAction('LOGIN')
                }, 1000);
                setForms({email: '', password: ''})
            }
            else if (e === 'New user' && currentAction === 'LOGIN') {
                setIsFetching(true)
                setTimeout(() => {
                    setCurrentAction('REGISTRATION')
                }, 1000);
                setForms({email: '', password: ''})
            }
            else if (e === 'Login' && currentAction === 'LOGIN') {
                loginHandler()
            }
            else if (e === 'New user' && currentAction === 'REGISTRATION') {
                registerHandler()
            }

        setTimeout(() => {
            setIsFetching(false)
        }, 2000);
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...forms })
            console.log(data.message);
        } catch (error) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...forms })
            console.log(data);
            setTimeout(() => {
                auth.login(data.token, data.userId)
            }, 1000);
        } catch (error) { }
    }

    useEffect(() => {
        alert.setAppError(error)
        if(error){
            setTimeout(() => {
                clearError()
            }, 5000);
        }

        return () => {
            alert.setAppError(null)
        }
    }, [error])
    useEffect(() => {
        alert.setAppOk(message)
        if(message){
            setTimeout(() => {
                clearMessage()
            }, 5000);
        }
        return () => {
            alert.setAppOk(null)
        }
    }, [message])

    return (
        <div className={`${s.auth}  ${error ? s.error : message ? s.good : s.default}  `}>
            <h1 className={isFetching ? s.fetching : null} >{currentAction}</h1>

            <div className={s.inputs}>
                <input autoFocus={true} autoComplete='off' value={forms.email} placeholder='Enter email' onChange={formsHandler} name='email' type="email" />
                <input value={forms.password} placeholder='Enter password' onChange={formsHandler} name='password' type="password" />
            </div>

            <div className={s.btns}>
                <button disabled={isFetching || loading} className={currentAction === 'LOGIN' ? s.active : null} onClick={(e) => changeAction(e.target.innerHTML)} >Login</button>
                <button disabled={isFetching || loading} className={currentAction === 'REGISTRATION' ? s.active : null} onClick={(e) => changeAction(e.target.innerHTML)} >New user</button>
            </div>
        </div>
    )
}

export default Auth
