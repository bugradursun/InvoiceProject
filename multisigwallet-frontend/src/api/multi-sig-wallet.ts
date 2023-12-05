import Web3 from "web3";
import BN from "bn.js";
import multiSigWalletTruffle from "../build/contracts/MultiSigWallet.json"
import TruffleContract from "@truffle/contract";
import { text } from "stream/consumers";
import { Log } from "ethers/providers";

//@ts-ignore
const MultiSigWallet = TruffleContract(multiSigWalletTruffle)

interface Transaction {
    txIndex:number,
    to:string;
    value:BN;
    data:string;
    executed:boolean;
    numConfirmations:number;
    isConfirmedByCurrentAccount:boolean;
}

interface GetResponse {
    address: string;
    balance: string;
    owners: string[];
    numConfirmationsRequired: number;
    transactionCount: number;
    transactions: Transaction[];
  }

//getter fnc to get data from the contract

export async function get(web3:Web3,account:string) : Promise<GetResponse> {
    MultiSigWallet.setProvider(web3.currentProvider);
    const multiSig = await MultiSigWallet.deployed()
    //contract instance : multisig
    const owners = await multiSig.getOwners()
    const numConfirmationsRequired  = await multiSig.numConfirmationsRequired()
    const transactionCount = await multiSig.getTransactionCount()
    const balance = await web3.eth.getBalance(multiSig.address) //contract balance

    // get 10 most recent tx
    const count = transactionCount.toNumber(); //tx count
    const transactions: Transaction[] = []
    for(let i = 1; i <=10; i++) {
        const txIndex = count - i //assume 5 tx. iteration 1 => 5-1 = 4 => tx[4] => last one |||||| next iteration i = 2 => txIndex 5-2 = 3 => tx[3] ... until tx[0]
        if(txIndex < 0 ) {
            break
        }

        const tx = await multiSig.getTransaction(txIndex) // will return to,value,data,executed , numConfirmations
        const isConfirmed = await multiSig.isConfirmed(txIndex,account)   

        transactions.push({
            txIndex,
            to:tx.to,
            value:tx.value,
            data:tx.data,
            executed:tx.executed,
            numConfirmations:tx.numConfirmations.toNumber(),
            isConfirmedByCurrentAccount:isConfirmed,
        });
    }
    return {
        address:multiSig.address,
        balance,
        owners,
        numConfirmationsRequired:numConfirmationsRequired.toNumber(), //test numconfirmations required!
        transactionCount:transactionCount.toNumber(),
        transactions,
    }
 
}

export async function deposit(
    web3:Web3,
    account:string,
    params: {
        value:BN;
    }
) {
    MultiSigWallet.setProvider(web3.currentProvider)
    const multiSig = await MultiSigWallet.deployed()

    await multiSig.sendTransaction({from:account,value:params.value}) //sendTransaction truffle builtin method
}

export async function submitTx(
    web3:Web3,
    account:string,
    params: {
        to:string;
        value:string;
        data:string;
    }
) {
    const {to,value,data} = params
    MultiSigWallet.setProvider(web3.currentProvider)
    const multiSig = await MultiSigWallet.deployed()

    await multiSig.submitTransaction(to,value,data, {
        from:account,
    })

}

export async function confirmTx(
    web3:Web3,
    account:string,
    params : {
        txIndex: number;
    }
) {
    const {txIndex} = params
    MultiSigWallet.setProvider(web3.currentProvider)
    const multiSig = await MultiSigWallet.deployed()

    await multiSig.confirmTransaction(txIndex,{
        from:account,
    })
}

export async function revokeConfirmation(
    web3:Web3,
    account:string,
    params : {
        txIndex: number;
    }
) {
    const {txIndex} = params
    MultiSigWallet.setProvider(web3.currentProvider)
    const multiSig = await MultiSigWallet.deployed()

    await multiSig.revokeConfirmation(txIndex,{
        from:account,
    })
}

export async function executeTx (
    web3:Web3,
    account: string,
    params : {
        txIndex : number;
    }
) {
    const {txIndex}  = params
    MultiSigWallet.setProvider(web3.currentProvider)
    const multiSig = await MultiSigWallet.deployed()

    await multiSig.executeTransaction(txIndex,{
        from:account,
    })
}

export function subscribe(
    web3:Web3,
    address:string,
    callback : (error : Error | null , log: Log | null) => void
) {
    const multiSig = new web3.eth.Contract(MultiSigWallet.abi,address)

    const res = multiSig.events.allEvents((error:Error,log:Log) => {
        if(error) {
            callback(error,null)
        } else if(log) {
            callback(null,log)
        }
    });
    return () => res.unsubscribe();
}
//define interfaces for events in the smart contract!

interface Deposit {
    event:"Deposit",
    returnValues: {
        sender:string;
        amount: string;
        balance : string;
    };
}

interface SubmitTransaction {
    event:
}