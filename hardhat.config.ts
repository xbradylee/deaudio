import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  paths: {
    sources: "./src/hardhat/contracts",
    tests: "./src/hardhat/test",
    cache: "./src/hardhat/cache",
    artifacts: "./src/hardhat/artifacts"
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  },
};

export default config;
