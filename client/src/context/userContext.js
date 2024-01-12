import { createContext, useContext, useState } from "react";


export const ActiveUser = createContext()

const ActiveUserContextProvider = ({children}) =>{
    const [activeUserId,setActiveUserId] = useState();

    return (
        <ActiveUser.Provider value={{activeUserId,setActiveUserId}} >
            {children}
        </ActiveUser.Provider>
    )
}

export function useActiveUserContext(){
    const activeUserId = useContext(ActiveUser)

    if ((activeUserId === null) || (activeUserId === undefined)) {
        throw new Error("useActiveUserContext Should used on ParameterContextProvider")
    };

    return activeUserId;
}

export default ActiveUserContextProvider;