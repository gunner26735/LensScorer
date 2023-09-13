import { ethers , Contract } from "ethers";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config.json";
import { abi } from '../abi/abi';

const Auth = createContext({});

export const AuthProvider = ({ children }) => {

	const apiKey = api.API_KEY;
	const apiURL = api.baseURL;
	const chainId = [1, 137, 56, 2020]; //ETH, MATIC, Binance, Ronin


	const [walletAddress, setWalletAddress] = useState(null);

	const [loading, setLoading] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [nftsList, setNftsList] = useState([]);
	const navigate = useNavigate();
	var nftList = []

	//Connecting Contract
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contractAddress = '0x43634212B371a3F9124f8dE0366D18C74F08b7fE';
	const contractABI = abi;
	const contractRead = new Contract(
		contractAddress,
		contractABI,
		provider
	);
	const contractWrite = new ethers.Contract(contractAddress, contractABI, signer);


	const getNftData = () => {

		nftList.push({id : 1, name_l: "First", description_l: "TEST", image_l: "https://static.ffx.io/images/$width_584/t_resize_width/q_86%2Cf_auto/a76c1590a4ab2ae7219ea36817a6e2dfd6a00c27", price: 0.002 })
		nftList.push({id : 2, name_l: "Second", description_l: "TEST 2", image_l: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg", price: 0.025 })

		return nftList;
	};

	const loadingAnime = async () => {

		setLoading(true);
		const data = await getNftData(inputValue);
		!data ? console.log("err") : setNftsList(data);

		setLoading(false);

		navigate("/nft-collection")

	};

	const loadingAnime2 = async () => {

		setLoading(true);

		const data = await getNftData(walletAddress);
		!data ? console.log("err") : setNftsList(data.slice(0, data.length / 2));

		setLoading(false);

	};

	const connectWallet = async () => {

		//check for metamask extension
		if (window.ethereum) {

			try {
				const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

				provider.send("eth_requestAccounts", []).then(() => {
					provider.listAccounts().then((accounts) => {
						// let signer = provider.getSigner(accounts[0]);
						// console.log(accounts[0]);
						setWalletAddress(accounts[0])
					});
				});

			} catch (error) {
				console.log(error);
			}

		} else {
			console.log("Metamask not found!");
		}
	}

	return (
		<Auth.Provider
			value={{
				loading, setLoading, loadingAnime, loadingAnime2,
				inputValue, setInputValue,
				nftsList, setNftsList,
				connectWallet, walletAddress,
				getNftData,
				contractRead,contractWrite
			}}
		>
			{children}
		</Auth.Provider>
	);
};

export default Auth;
