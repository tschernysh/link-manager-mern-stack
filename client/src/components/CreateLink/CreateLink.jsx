import s from './CreateLink.module.css'
import {useContext, useState, useEffect} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/authContext";
import {AlertContext} from "../../context/alertContext";

const CreateLink = (props) => {
    const {request, message, error, clearError, clearMessage} = useHttp()
    const auth = useContext(AuthContext)
    const alert = useContext(AlertContext)
    const [link, setLink] = useState('')

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

    const formHandler = async event => {
        console.log(auth.token)
        if(event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                } )
                console.log(data)
            }catch (e) {}
        }
    }


    return(
        <div className={s.create_block}>
            <h1>Create Link</h1>
            <div className="">
                <input autoComplete='off'
                       type="text"
                       value={link}
                       onChange={ (e) => setLink(e.target.value)}
                       onKeyPress={formHandler}/>
            </div>
        </div>
    )
}

export default CreateLink
