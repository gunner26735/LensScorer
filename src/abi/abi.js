export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_collectionId",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_userScore",
				"type": "uint256"
			}
		],
		"name": "storeUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_cname",
				"type": "uint32"
			}
		],
		"name": "getUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address[]",
						"name": "userAddress",
						"type": "address[]"
					},
					{
						"internalType": "uint256[]",
						"name": "score",
						"type": "uint256[]"
					}
				],
				"internalType": "struct testt.user",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]