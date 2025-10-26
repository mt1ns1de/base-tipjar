# 🪙 BaseTipJar

**BaseTipJar** is a minimalistic smart contract for receiving tips and micro-payments on the **Base Mainnet**.  
Anyone can send ETH to the contract owner with an optional message.  
The owner can later withdraw collected funds or update the payout address.

---

## 🔗 Verified Contract

[![Verified on BaseScan](https://img.shields.io/badge/Verified%20on-BaseScan-1b75d0?logo=ethereum&logoColor=white)](https://basescan.org/address/0x823810f48ac0de186e87bced0d849ff64a3cb62b)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue?logo=ethereum)]()
[![Network](https://img.shields.io/badge/Network-Base%20Mainnet-0052FF)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)]()

**Network:** Base Mainnet  
**Contract Address:** [`0x823810f48ac0de186e87bced0d849ff64a3cb62b`](https://basescan.org/address/0x823810f48ac0de186e87bced0d849ff64a3cb62b)  
**License:** MIT  
**Category:** DeFi  

---

## 🧩 Features

- 💸 Accepts ETH tips from anyone  
- ✉️ Optional text message included with each tip  
- 🔐 Owner can update the withdrawal address  
- ⚙️ Optimized bytecode (200 runs, Solidity 0.8.20)  

---

## ⚙️ Deployment Details

- **Compiler Version:** `v0.8.20+commit.a1b79de6`  
- **Optimization:** Enabled (`runs = 200`)  
- **EVM Version:** Default (`Prague`)  
- **Constructor Argument:** `0x0000000000000000000000000000000000000000`  
  → automatically assigns `msg.sender` as the owner  

---

## 🧠 Contract Overview (Solidity)

```
solidity
function tip(string calldata message_) external payable;
function withdraw() external;
function setOwner(address newOwner) external;
function owner() external view returns (address);
```

💬 **Example Use Case**
A user sends 0.01 ETH with a message:

“Thanks for the great content!”

The contract emits the event:
```
solidity
event Tipped(address from, uint256 amount, string message);
Later, the owner calls withdraw() to collect accumulated tips.
```
🧱 **Repository Structure**
```
bash
contracts/BaseTipJar.sol    # main smart contract
scripts/deploy.js           # deployment script
.env.example                # environment configuration template
package.json
README.md
```
⚙️ **Environment Configuration**
//Copy .env.example → .env and fill in the following values:
```
bash
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
BASE_RPC=https://mainnet.base.org
# Optional: predefined owner (or leave blank to use msg.sender)
#OWNER_ADDRESS=0x0000000000000000000000000000000000000000
```
🧾**Explanation:**

PRIVATE_KEY — wallet that deploys the contract
BASE_RPC — Base Mainnet RPC endpoint
OWNER_ADDRESS — optional, pre-defined owner

💡 **How to Interact**
### Using Node.js (ethers.js)
```
js
// Send a tip
const tipJar = new ethers.Contract(
  "0x823810f48ac0de186e87bced0d849ff64a3cb62b",
  abi,
  signer
);

await tipJar.tip("Thanks for the amazing content!", {
  value: ethers.parseEther("0.01"),
});
js
// Withdraw collected tips
await tipJar.withdraw();
```
## 👤 Author
**Deployed by:** 0x87204f681de62581311b05ebf9fdd91c3fcd39a1
**Verified on Base Mainnet** — open for contributions, PRs and forks.

## 🧾 Notes
This project was developed as part of the Base Builders initiative and integrated into Talent Protocol as a verified on-chain builder contribution.

