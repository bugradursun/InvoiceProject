import Web3 from "web3";
import BN from "bn.js";
import multiSigWalletTruffle from "../build/contracts/MultiSigWallet.json"
import TruffleContract from "@truffle/contract";


//@ts-ignore
const MultiSigWallet = TruffleContract(multiSigWalletTruffle)