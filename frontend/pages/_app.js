import 'regenerator-runtime/runtime';
import React from 'react';

import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';

import '../styles/global.css';
import { createEmotionSsrAdvancedApproach } from 'tss-react/next';

// NEAR
import { HelloNEAR } from '../api/near-interface';
import { Wallet } from '../api/near-wallet';

import { Web3Storage } from 'web3.storage';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { useEffect, useState } from 'react';

const { augmentDocumentWithEmotionCache, withAppEmotionCache } = createEmotionSsrAdvancedApproach({ key: 'css' });

export { augmentDocumentWithEmotionCache };

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.NEXT_PUBLIC_CONTRACT_NAME });

// Abstract the logic of interacting with the contract to simplify your flow
const helloNEAR = new HelloNEAR({ contractId: process.env.NEXT_PUBLIC_CONTRACT_NAME, walletToUse: wallet });

const web3StorageClient = new Web3Storage({
    token: process.env.NEXT_PUBLIC_WEB_STORAGE_TOKEN,
});

const graphClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/gupnik/ama-near',
    cache: new InMemoryCache(),
});

function App({ Component, pageProps }) {
    const [isSignedIn, setSignedIn] = useState(false);

    useEffect(() => {
        wallet.startUp().then((isSignedIn) => setSignedIn(isSignedIn));
    }, [wallet]);

    return (
        <Provider store={store}>
            <ApolloProvider client={graphClient}>
                <Component
                    {...pageProps}
                    isSignedIn={isSignedIn}
                    helloNEAR={helloNEAR}
                    wallet={wallet}
                    web3StorageClient={web3StorageClient}
                    graphClient={graphClient}
                />
            </ApolloProvider>
        </Provider>
    );
}

export default withAppEmotionCache(App);
