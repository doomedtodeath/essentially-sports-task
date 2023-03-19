import Layout from "./container/layout";
import AppContext from "../public/AppContext";
import {useState} from "react";

export default function App({Component, pageProps}) {
    let [data, setData] = useState();
    let [fullData, setFullData] = useState();
    let [isLoaded, setIsLoaded] = useState(false);
    return (
        <AppContext.Provider
            value={{
                state: {
                    data: data,
                    fullData: fullData,
                    isLoaded: isLoaded
                },
                setData: setData,
                setFullData: setFullData,
                setIsLoaded: setIsLoaded,
            }}
        >
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </AppContext.Provider>
    )
}
