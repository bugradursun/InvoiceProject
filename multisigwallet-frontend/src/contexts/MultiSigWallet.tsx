import Web3 from "web3";
import BN from "bn.js";
import React,{useReducer,useEffect,createContext,useContext,useMemo} from "react";
import { useWeb3Context } from "./Web3";
import {get as getMultiSigWallet,subscribe} from "../api/multi-sig-wallet";
