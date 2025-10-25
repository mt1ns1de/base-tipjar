// Minimal deployment using ethers v6 + prebuilt ABI/bytecode.
// ENV required: PRIVATE_KEY, BASE_RPC (e.g. https://mainnet.base.org)
// Optional: OWNER_ADDRESS

import 'dotenv/config';
import { ethers } from 'ethers';
import fs from 'fs';

const artifact = JSON.parse(fs.readFileSync('./abi/BaseTipJar.json', 'utf8'));

async function main() {
  const { PRIVATE_KEY, BASE_RPC, OWNER_ADDRESS } = process.env;
  if (!PRIVATE_KEY || !BASE_RPC) {
    throw new Error('Missing env: PRIVATE_KEY or BASE_RPC');
  }

  const provider = new ethers.JsonRpcProvider(BASE_RPC);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log('Deployer:', await wallet.getAddress());
  const net = await provider.getNetwork();
  console.log('Network:', net);

  // Safety: ensure Base mainnet (8453)
  if (Number(net.chainId) !== 8453) {
    throw new Error(`Wrong chainId: ${net.chainId}. Connect to Base mainnet (8453).`);
  }

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);

  const owner = (OWNER_ADDRESS && ethers.isAddress(OWNER_ADDRESS))
    ? OWNER_ADDRESS
    : await wallet.getAddress();

  const contract = await factory.deploy(owner, { value: 0n });
  console.log('Deploy tx:', contract.deploymentTransaction().hash);

  const deployed = await contract.waitForDeployment();
  const addr = await deployed.getAddress();
  console.log('BaseTipJar deployed at:', addr);

  const currentOwner = await deployed.owner();
  console.log('Owner:', currentOwner);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
