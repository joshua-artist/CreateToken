
// CreateToken/index.js
import { ethers } from "ethers";
import fs from "fs";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = JSON.parse(fs.readFileSync("./TokenABI.json", "utf-8"));
  const bytecode = fs.readFileSync("./TokenBytecode.txt", "utf-8");

  console.log("Deploying token...");
  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy("MyToken", "MTK", 18, ethers.parseUnits("1000000", 18));
  console.log("Token deployed at:", await contract.getAddress());
}

main().catch(console.error);
