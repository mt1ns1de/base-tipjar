# 🪙 BaseTipJar

**BaseTipJar** is a minimalistic smart contract for receiving tips and micro-payments on the **Base Mainnet**.  
It allows anyone to send ETH to the contract owner with an optional message.  
The owner can later withdraw the collected funds or update the payout address.

---

## 🔗 Verified Contract

[![Verified on BaseScan](https://img.shields.io/badge/Verified%20on-BaseScan-1b75d0?style=flat&logo=ethereum&logoColor=white)](https://basescan.org/address/0x823810f48ac0de186e87bced0d849ff64a3cb62b)

**Network:** Base Mainnet  
**Contract Address:** [`0x823810f48ac0de186e87bced0d849ff64a3cb62b`](https://basescan.org/address/0x823810f48ac0de186e87bced0d849ff64a3cb62b#code)  
**License:** MIT  
**Category:** DeFi  

---

## 🧩 Features

- 💸 Accepts ETH tips from anyone  
- ✉️ Supports optional text messages with each tip  
- 🔐 Owner can update the withdrawal address  
- ⚙️ Optimized bytecode (200 runs, Solidity 0.8.20)

---

## ⚙️ Deployment Details

- **Compiler Version:** `v0.8.20+commit.a1b79de6`
- **Optimization:** Enabled (`runs = 200`)
- **EVM Version:** Default (Prague)
- **Constructor Argument:** `0x0000000000000000000000000000000000000000`  
  (automatically assigns `msg.sender` as owner)

---

## 🧠 Contract Overview (Solidity)

```solidity
function tip(string calldata message_) external payable;
function withdraw() external;
function setOwner(address newOwner) external;
function owner() external view returns (address);
💬 Example Use Case
A user sends 0.01 ETH with a message:

“Thanks for the great content!”

The contract emits the event:

solidity
event Tipped(address from, uint256 amount, string message);
The owner later calls withdraw() to collect the accumulated tips.

📦 Repository Structure
bash
/contracts/BaseTipJar.sol    # main smart contract
/scripts/deploy.js           # deployment script
/.env.example                # environment configuration template
/package.json
/README.md
🧰 Local Development
bash
git clone https://github.com/yourusername/base-tipjar.git
cd base-tipjar
npm install
cp .env.example .env
node scripts/deploy.js
👤 Author
Deployed by: 0x87204f681de62581311b05ebf9fdd91c3fcd39a1

🧾 Notes
This project was built as part of the Base Builders initiative and integrated into Talent Protocol as a verified on-chain builder contribution.

---
