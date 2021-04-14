import { useState } from 'react'
import s from './Auth.module.css'

const Auth = (props) => {

    const [currentAction, setCurrentAction] = useState('LOGIN')
    const [isFetching, setIsFetching] = useState(false)

    let changeAction = (e) => {
        console.log(e);
        console.log(currentAction);
        setIsFetching(true)
        setTimeout(() => {
            switch(e){
                case 'Login':
                    setCurrentAction('LOGIN')
                    break
                case 'New user':
                    setCurrentAction('REGISTRATION')
                    break
                default:
                    break
            }
        }, 1000);
        setTimeout(() => {
            setIsFetching(false)
        }, 2000);
    }

    return(
        <div className={s.auth}>
            <h1 className={ isFetching ? s.fetching : null} >{currentAction}</h1>

            <div className={s.inputs}>
                <input type="text"/>
                <input type="text"/>
            </div>

            <div className="btns">
                <button disabled={isFetching} onClick={ (e) => changeAction(e.target.innerHTML) } >Login</button>
                <button disabled={isFetching} onClick={ (e) => changeAction(e.target.innerHTML) } >New user</button>
            </div>
        </div>
    )
}

export default Auth