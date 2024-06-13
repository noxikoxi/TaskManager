'use client'

import {createContext, useReducer} from "react";

type State = {
    activeLink: string
}

type NavContext = {
    state: State,
    changeActive: (link: string) => void;
}

type Action = {type: "CHANGE_ACTIVE"; payload : string}

const NavReducer = (state : State, action: Action) => {
    switch(action.type){
        case "CHANGE_ACTIVE":
            return {
                ...state,
                activeLink: action.payload
            }
    }
}

const initialState : State = {
    activeLink : ""
}

const initialContext : NavContext = {
    changeActive(): void {

    },
    state: initialState
}

export const SideNavContext = createContext<NavContext>(initialContext);

type AppProviderProps = {
    children : React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({children})  => {
    const [state, dispatch] = useReducer(NavReducer, initialState);
    const changeActive = (link: string) => {
        dispatch({type: "CHANGE_ACTIVE", payload: link});
    };

    return(<SideNavContext.Provider value={{
        state,
        changeActive,

    }}>
        {children}
    </SideNavContext.Provider>)
}