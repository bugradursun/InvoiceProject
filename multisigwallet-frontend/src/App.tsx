import React from 'react';
import { Message, Button } from 'semantic-ui-react';
import logo from './logo.svg';
import { useWeb3Context } from './contexts/Web3';
import { unlockAccount } from './api/web3';
import useAsync from "./components/useAsync";
import './App.css';

function App() {
  const {
    state : {account},
    updateAccount
  } = useWeb3Context();

  const {pending, error, call} = useAsync(unlockAccount)

  async function onClickConnect() {
    const {error,data} = await call(null)
    
    if(error) {
      console.error(error)
    }
    if(data) {
      updateAccount(data)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi Sig Wallet</h1>
        <div>Account : {account} </div>
        <Message warning>Metamask is not connected</Message>
        <Button 
        color="green"
        onClick={() => onClickConnect()}
        disabled = {pending}
        loading = {pending}
        >Connect to Metamask</Button>

      </header>
    </div>
  );
}

export default App;
