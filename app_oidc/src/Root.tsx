import React, {useEffect, useState} from "react";
import {OidcUserStatus, useOidc, useOidcUser} from "@axa-fr/react-oidc";

type Book = { name: string; author: string; year: number }

export const Root = () => {
    const {isAuthenticated: hasTokens, login, logout} = useOidc();
    const {oidcUser, oidcUserLoadingState} = useOidcUser();

    const [items, setItems] = useState<Book[]>([]);

    const handleLogin = () => {
        login();
    }

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        if (hasTokens && oidcUser) {
            fetch("http://localhost:4444/api/books")
                .then((response) => {
                    return response.json();
                })
                .then(setItems)
                .catch(console.error);
        }
    }, [hasTokens, oidcUser]);

    return (
        <>
            {(!hasTokens || (oidcUser === null && oidcUserLoadingState === OidcUserStatus.Loaded)) && (
                <div className="login">
                    <h1>Книги</h1>

                    <button onClick={handleLogin}>Login via SSO</button>
                </div>
            )}

            {hasTokens && oidcUser && (
                <div className="page">
                    <div className="header">
                        <h2>Любимые книги пользователя с именем {oidcUser.name}</h2>

                        <button onClick={handleLogout}>logout</button>
                    </div>

                    {items.length > 0 && (
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Year</th>
                            </tr>
                            </thead>

                            <tbody>
                            {items.map((item) => (
                                <tr className="row" key={item.name}>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>{item.year}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </>
    );
}

