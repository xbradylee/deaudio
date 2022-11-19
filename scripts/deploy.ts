import {ethers} from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {BigNumber} from "ethers";

async function main() {

    const contractFactory = await ethers.getContractFactory("DeAudio");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    let deployer: SignerWithAddress;
    let artist1: SignerWithAddress;
    let artist2: SignerWithAddress;
    let artist3: SignerWithAddress;
    let artist4: SignerWithAddress;
    let artist5: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let users: SignerWithAddress[];
    let royalty = parseEther(0.01);
    let price = parseEther(1);
    [deployer, artist1, artist2, artist3, artist4, artist5, user1, user2, ...users] = await ethers.getSigners();

    await contract.connect(deployer).addArtist(artist1.address, 'Ardie Son');
    await contract.connect(deployer).addArtist(artist2.address, 'Alex Grohl');
    await contract.connect(deployer).addArtist(artist3.address, 'Letra');
    await contract.connect(deployer).addArtist(artist4.address, 'Luc Allieres');
    await contract.connect(deployer).addArtist(artist5.address, 'Monako');

    await contract.connect(deployer).mint(artist1.address, 'Wildfires', royalty, price, 'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist2.address, 'Breath of Light', royalty, price, 'https://bafybeihxjifzvcxhnd6ax4mouj3w2o6qmpxgf2z5alnhx4goyvhpe7reue.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist3.address, 'Circle of Life', royalty, price, 'https://bafybeib36bibrpewgfnq6jxn23lbgzfeauimgkz2l7o43lxztuz3oj6h2q.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist4.address, 'Tango Bolero', royalty, price, 'https://bafybeibjxfr57nrzehrg7lanuuihvhanofbvwjlvadhs5qf4brusqt4yhi.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist5.address, 'BKN', royalty, price, 'https://bafybeiblnmrxemttpyvzqqkidp7wsauwzyx24zhuw6adxtdxicxzbhvay4.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist1.address, 'CHONKLAP!', royalty, price, 'https://bafybeibuiqky24mw63kpksqdwc247hzggejqxlqxnjdnj7fzja4an6puoq.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist1.address, 'Arise', royalty, price, 'https://bafybeibuiqky24mw63kpksqdwc247hzggejqxlqxnjdnj7fzja4an6puoq.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist2.address, 'Its Going Down', royalty, price, 'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist3.address, 'Waltz', royalty, price, 'https://bafybeih5hptqp3hxegpbkbmxprasjx3chceyrtpcs5n7fkpuusntww6nnq.ipfs.nftstorage.link/');
    await contract.connect(deployer).mint(artist3.address, 'I Dont Get the Lesson', royalty, price, 'https://bafybeib6p7jwmnsox7pnox3eey4oty2yfx35uzfku4b3z3gxu3zxd5swvq.ipfs.nftstorage.link/');

    console.log("Contract address is:", contract.address);

}

const parseEther = (num: number): BigNumber => ethers.utils.parseEther(num.toString());

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
