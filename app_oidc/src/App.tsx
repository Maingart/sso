import React from 'react';
import {OidcConfiguration, OidcProvider} from "@axa-fr/react-oidc";
import {Root} from "./Root";

const configuration: OidcConfiguration = {
    client_id: "app-oidc",
    redirect_uri: window.location.origin + "/authentication/callback",
    silent_redirect_uri:
        window.location.origin + "/authentication/silent-callback",
    scope: "openid profile email",
    authority: "http://localhost:8080/realms/master",
    service_worker_relative_url: "/OidcServiceWorker.js",
    service_worker_only: true,
    demonstrating_proof_of_possession: true,
    refresh_time_before_tokens_expiration_in_second: 60,
};

const Loading = () => <h1>Loading...</h1>

function App() {
    return (
        <div className="app">
            <OidcProvider
                configuration={configuration}
                loadingComponent={Loading}
                authenticatingComponent={Loading}
                callbackSuccessComponent={Loading}
                onSessionLost={() => {
                    window.location.reload();
                }}
            >
                <Root/>
            </OidcProvider>
        </div>
    );
}

export default App;
