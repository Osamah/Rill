# Rill

Rill is the next generation of e-sports gaming.

Built on Tron

The Tron smart contract can be deployed using TronBox to any Testnet or Mainnet. The dApp uses [React](https://reactjs.org/)



Please refer to the following steps to deploy this DApp on Nile testnet
### 1. NodeJS version 10 or 12
```
node -v
> v10.24.1
```
### 2. TronLink

[Download TronLink chrome extension](https://www.tronlink.org/)

### 3. TronBox
```
npm install -g tronbox 
```

### 4. Account 
If there is no Tron account, please use TronLink to create a new Account. And then apply for some test coins of Nile testnet for testing. Please make sure the account has enough TRX. [Get test coins](https://nileex.io/join/getJoinPage)

### 5. Install npm dependencies
Run following command in the root of the project:
```
npm i
```
### 6. Modify the privatekey in tronbox.js
Paste your account's private key to 'privateKey' in tronbox.js

### 7. Deploy contract using TronBox
Compile contract:
```
npm run compile
```
Deploy contract:
```
npm run tronbox migrate --reset --network nile
```
On sucessfull deploy, copy the `contract address`

### 8. TODO: Paste your contract address to a variable somewhere in the dapp-ui project

### 9. Run DApp UI
```
cd dapp-ui
npm i
npm start
```

### 10. Navigate to http://localhost:3000/ to see the app running.

