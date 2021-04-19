import { createContext } from "react";

function noop(){}

export const AlertContext = createContext({
    setAppError: noop,
    setAppMessage: noop
})