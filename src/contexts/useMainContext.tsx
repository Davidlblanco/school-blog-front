import React, { createContext, useContext, useEffect, useState } from 'react';
import { JwtPayload } from '../typings/projectTypes';
import { jwtDecode } from 'jwt-decode';

type FormProviderType = {
    children: React.ReactNode;
};
if (import.meta.env.SSR) {
    console.log('SSR');
}

export type MainContextType = {
    jwtToken: string | undefined;
    setJwtToken: React.Dispatch<React.SetStateAction<string | undefined>>;

    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    contextError: string | undefined;
    setContextError: React.Dispatch<React.SetStateAction<string | undefined>>;

    contextSuccess: string | undefined;
    setContextSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;

    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    searchUser: string;
    setSearchUser: React.Dispatch<React.SetStateAction<string>>;

    openModalId: string;
    setOpenModalId: React.Dispatch<React.SetStateAction<string>>;

    role: string;
};

const ProvideMainContext = () => {
    const [jwtToken, setJwtToken] = useState<string | undefined>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [contextError, setContextError] = useState<string | undefined>();
    const [contextSuccess, setContextSuccess] = useState<string | undefined>();
    const [search, setSearch] = useState<string>('');
    const [searchUser, setSearchUser] = useState<string>('');
    const [openModalId, setOpenModalId] = useState<string>('');
    const [role, setRole] = useState<string>('');

    useEffect(() => {
        const jwt = getJwtCookie('school-blog-jwt');

        if (!jwt) {
            setIsLoggedIn(false);
            return;
        }

        const decoded: JwtPayload = jwtDecode(jwt);

        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiration = decoded.exp - currentTime;

        if (timeUntilExpiration > 0) {
            setJwtToken(jwt);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        getRoleFromJwt(jwt);
    }, [jwtToken]);

    const getRoleFromJwt = (jwt: string) => {
        const decoded: any = jwtDecode(jwt);
        setRole(decoded.role);
    };
    return {
        jwtToken,
        setJwtToken,
        isLoggedIn,
        setIsLoggedIn,
        contextError,
        setContextError,
        contextSuccess,
        setContextSuccess,
        search,
        setSearch,
        searchUser,
        setSearchUser,
        openModalId,
        setOpenModalId,
        role,
    };
};

function getJwtCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

const MainContext = createContext<MainContextType>({} as MainContextType);

const MainProvider = ({ children }: FormProviderType) => {
    const value: MainContextType = ProvideMainContext();

    return (
        <MainContext.Provider value={value}>{children}</MainContext.Provider>
    );
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
