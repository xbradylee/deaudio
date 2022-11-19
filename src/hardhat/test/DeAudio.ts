import {expect} from "chai";
import {ethers} from "hardhat";
import {Contract} from "@ethersproject/contracts";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {loadFixture} from "@nomicfoundation/hardhat-network-helpers";
import {BigNumber} from "ethers";


const parseEther = (num: number): BigNumber => ethers.utils.parseEther(num.toString());
const formatEther = (num: BigNumber): string => ethers.utils.formatEther(num);

describe("DeAudio", () => {

    async function deployDeAudioFixture() {
        let contract: Contract;
        let deployer: SignerWithAddress;
        let artist1: SignerWithAddress;
        let artist2: SignerWithAddress;
        let user1: SignerWithAddress;
        let user2: SignerWithAddress;
        let royalty = parseEther(0.01);
        let price = parseEther(1);
        let relistPrice = parseEther(2);

        const contractFactory = await ethers.getContractFactory("DeAudio");
        [deployer, artist1, artist2, user1, user2] = await ethers.getSigners();

        contract = await contractFactory.deploy();

        await contract.connect(deployer).addArtist(artist1.address, 'Ardie Son');
        await contract.connect(deployer).addArtist(artist2.address, 'Alex Grohl');

        return { contract, deployer, artist1, artist2, user1, user2, royalty, price, relistPrice };
    }

    describe("Deployment", () => {

        it("should provide name, symbol, admin, tokenId", async function () {
            const { contract, deployer } = await loadFixture(deployDeAudioFixture);

            expect(await contract.name()).to.equal("DeAudio");
            expect(await contract.symbol()).to.equal("DAD");
            expect(await contract.admin()).to.equal(deployer.address);
            expect(await contract.audioTrackCount()).to.equal(0);
        });

    });

    describe("Mint", () => {

        it("should add artists", async () => {
            const { contract, artist1, artist2 } = await loadFixture(deployDeAudioFixture);

            const chainArtist1 = await contract.artists(0);
            const chainArtist2 = await contract.artists(1);
            expect(chainArtist1.artistAddress).to.equal(artist1.address);
            expect(chainArtist2.artistAddress).to.equal(artist2.address);
        })

        it("should mint audio tracks and verify that they are stored in the blockchain", async () => {
            const { contract, deployer, artist1, artist2, royalty, price } = await loadFixture(deployDeAudioFixture);

            expect(await contract.balanceOf(contract.address)).to.equal(0);

            await contract.connect(deployer).mint(artist1.address, 'Wildfires', royalty, price, 'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
            expect(await contract.balanceOf(contract.address)).to.equal(1);

            await contract.connect(deployer).mint(artist2.address, 'Breath of Light', royalty, price, 'https://bafybeihxjifzvcxhnd6ax4mouj3w2o6qmpxgf2z5alnhx4goyvhpe7reue.ipfs.nftstorage.link/');
            expect(await contract.balanceOf(contract.address)).to.equal(2);

            const track0 = await contract.audioTracks(0);
            expect(track0.tokenId).to.equal(0);
            expect(track0.artistAddress).to.equal(artist1.address);
            expect(track0.name).to.equal('Wildfires');
            expect(track0.seller).to.equal(deployer.address);
            expect(track0.royalty).to.equal(royalty);
            expect(track0.price).to.equal(price);
            expect(track0.uri).to.equal('https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
            expect(await contract.ownerOf(0)).to.equal(contract.address);

            const track1 = await contract.audioTracks(1);
            expect(track1.tokenId).to.equal(1);
            expect(track1.artistAddress).to.equal(artist2.address);
            expect(track1.name).to.equal('Breath of Light');
            expect(track1.seller).to.equal(deployer.address);
            expect(track1.royalty).to.equal(royalty);
            expect(track1.price).to.equal(price);
            expect(track1.uri).to.equal('https://bafybeihxjifzvcxhnd6ax4mouj3w2o6qmpxgf2z5alnhx4goyvhpe7reue.ipfs.nftstorage.link/');
            expect(await contract.ownerOf(1)).to.equal(contract.address);
        });

    });

    describe("Buy Audio Tracks", () => {

        it("should buy audio tracks and update the balances in the buyer, the seller, the artist accordingly", async () => {
            const { contract, deployer, artist1, artist2, user1, royalty, price } = await loadFixture(deployDeAudioFixture);

            await contract.connect(deployer).mint(
                artist1.address,
                'Wildfires',
                royalty,
                price,
                'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/'
            );

            await contract.connect(deployer).mint(
                artist2.address,
                'Breath of Light',
                royalty,
                price,
                'https://bafybeihxjifzvcxhnd6ax4mouj3w2o6qmpxgf2z5alnhx4goyvhpe7reue.ipfs.nftstorage.link/'
            );

            const deployerInitalBalance = await deployer.getBalance();
            const userInitialBalance = await user1.getBalance();
            const artistInitialBalance = await artist1.getBalance();

            await expect(contract.connect(user1).buyAudioTrack(0, { value: price }))
                .to.emit(contract, "AudioTrackBought")
                .withArgs(
                    0,
                    deployer.address,
                    user1.address,
                    price
                );

            const deployerFinalBalance = await deployer.getBalance();
            const artistFinalBalance = await artist1.getBalance();
            const userFinalBalance = await user1.getBalance();

            expect(await contract.ownerOf(0)).to.equal(user1.address);
            expect(+formatEther(userFinalBalance)).to.be.lessThan(+formatEther(userInitialBalance) - +formatEther(price));
            expect((await contract.audioTracks(0)).seller).to.equal("0x0000000000000000000000000000000000000000");
            expect(+formatEther(deployerFinalBalance)).to.equal(+formatEther(deployerInitalBalance) + +formatEther(price) - +formatEther(royalty));
            expect(+formatEther(artistFinalBalance)).to.equal(+formatEther(artistInitialBalance) + +formatEther(royalty));

        });

    });

    describe("Relist Audio Tracks", () => {

        it("should buy audio track, then be able to relist it on the contract for sale", async () => {
            const { contract, deployer, artist1, user1, royalty, price, relistPrice } = await loadFixture(deployDeAudioFixture);

            await contract.connect(deployer).mint(
                artist1.address,
                'Wildfires',
                royalty,
                price,
                'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/'
            );

            await expect(contract.connect(user1).buyAudioTrack(0, { value: price }))
                .to.emit(contract, "AudioTrackBought")
                .withArgs(
                    0,
                    deployer.address,
                    user1.address,
                    price
                );

            await expect(contract.connect(user1).relistAudioTrack(0, relistPrice))
                .to.emit(contract, "AudioTrackRelisted")
                .withArgs(
                    0,
                    user1.address,
                    relistPrice
                );

            expect(await contract.ownerOf(0)).to.equal(contract.address);

        });

    });

    describe("Getters", () => {

        it("should get audio tracks by artists", async () => {
            const { contract, deployer, artist1, royalty, price } = await loadFixture(deployDeAudioFixture);

            await contract.connect(deployer).mint(artist1.address, 'Wildfires', royalty, price, 'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
            await contract.connect(deployer).mint(artist1.address, 'Breath of Light', royalty, price, 'https://bafybeihxjifzvcxhnd6ax4mouj3w2o6qmpxgf2z5alnhx4goyvhpe7reue.ipfs.nftstorage.link/');

            const audioTracks = await contract.connect(deployer).getAudioTracksByArtist(artist1.address);

            expect(audioTracks[0].tokenId.toNumber()).to.equal(0);
            expect(audioTracks[0].artistAddress).to.equal(artist1.address);
            expect(audioTracks[0].seller).to.equal(deployer.address);
            expect(audioTracks[0].royalty).to.equal(royalty);
            expect(audioTracks[0].price).to.equal(price);
            expect(audioTracks[0].uri).to.equal('https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');

            expect(audioTracks[1].tokenId.toNumber()).to.equal(1);
            expect(audioTracks[1].artistAddress).to.equal(artist1.address);
            expect(audioTracks[1].seller).to.equal(deployer.address);
            expect(audioTracks[1].royalty).to.equal(royalty);
            expect(audioTracks[1].price).to.equal(price);
            expect(audioTracks[1].uri).to.equal('https://bafybeihxjifzvcxhnd6ax4mouj3w2o6qmpxgf2z5alnhx4goyvhpe7reue.ipfs.nftstorage.link/');

        });

        it("should get no audio tracks if user has not bought any", async () => {
            const { contract, user1 } = await loadFixture(deployDeAudioFixture);

            const audioTracks = await contract.connect(user1).getMyAudioTracks();
            expect(audioTracks.length).to.equal(0);
        });

        it("should get audio tracks after user bought them", async() => {
            const { contract, deployer, artist1, user1, user2, royalty, price } = await loadFixture(deployDeAudioFixture);

            await contract.connect(deployer).mint(artist1.address, 'Wildfires', royalty, price, 'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
            await contract.connect(user1).buyAudioTrack(0, { value: price });

            const audioTracks1 = await contract.connect(user1).getMyAudioTracks();

            expect(audioTracks1[0].tokenId.toNumber()).to.equal(0);
            expect(audioTracks1[0].artistAddress).to.equal(artist1.address);
            expect(audioTracks1[0].uri).to.equal('https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
            expect(audioTracks1.length).to.equal(1);

            const audioTracks2 = await contract.connect(user2).getMyAudioTracks();
            expect(audioTracks2.length).to.equal(0);
        });

        it("should get audio tracks on sale", async () => {
            const { contract, deployer, artist1, user1, royalty, price } = await loadFixture(deployDeAudioFixture);

            await contract.connect(deployer).mint(artist1.address, 'Wildfires', royalty, price, 'https://bafybeigpro7ka3ununvuw65rkvehqd63dq4if2xogz57weizeb7b4g2jrm.ipfs.nftstorage.link/');
            await contract.connect(deployer).mint(artist1.address, 'Breath of Light', royalty, price, 'https://bafybeihxjifzvcxhnd6ax4mouj3w2o6qmpxgf2z5alnhx4goyvhpe7reue.ipfs.nftstorage.link/');

            const audioTracksOnSale1 = await contract.connect(deployer).getAudioTracksOnSale();
            expect(audioTracksOnSale1.length).to.equal(2);

            await contract.connect(user1).buyAudioTrack(0, { value: price });
            const audioTracksOnSale2 = await contract.connect(deployer).getAudioTracksOnSale();
            expect(audioTracksOnSale2.length).to.equal(1);

            await contract.connect(user1).buyAudioTrack(1, { value: price });
            const audioTracksOnSale3 = await contract.connect(deployer).getAudioTracksOnSale();
            expect(audioTracksOnSale3.length).to.equal(0);
        });

    });

});