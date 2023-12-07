import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Message } from 'semantic-ui-react';
import { unlockAccount } from './api/web3';
import "semantic-ui-css/semantic.min.css"
import './index.css';
import useAsync from './components/useAsync';
import { useWeb3Context } from './contexts/Web3';
import App from './App';
import {
  Provider as Web3Provider,
  Updater as Web3Updater
} from "./contexts/Web3"
import {
  Provider as MultiSigWalletProvider,
  Updater as MultiSigWalletUpdater,
} from "./contexts/MultiSigWallet"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3Provider>
      <MultiSigWalletProvider>
        <App />
        <Web3Updater/>
        <MultiSigWalletUpdater/>
      </MultiSigWalletProvider>
    </Web3Provider>
  </React.StrictMode>
);

