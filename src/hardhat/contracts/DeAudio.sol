// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DeAudio is ERC721("DeAudio", "DAD"), Ownable {

    address public admin;
    Artist[] public artists;
    AudioTrack[] public audioTracks;
    uint public audioTrackCount = 0;
    uint public artistCount = 0;
    mapping(address => bool) artistExists;
    mapping(address => uint[]) artistToAudioTracks;

    struct AudioTrack {
        uint256 tokenId;
        address payable artistAddress;
        string name;
        address payable seller;
        uint256 royalty;
        uint256 price;
        string uri;
    }

    struct Artist {
        address payable artistAddress;
        string name;
    }

    event AudioTrackBought(
        uint256 indexed tokenId,
        address indexed seller,
        address buyer,
        uint256 price
    );

    event AudioTrackRelisted(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    constructor() payable {
        admin = msg.sender;
    }

    function addArtist(address payable _artistAddress, string memory _name) external onlyOwner {
        require(!artistExists[_artistAddress], "Artist has already been added.");

        artists.push(Artist(_artistAddress, _name));
        artistExists[_artistAddress] = true;
        artistCount++;
    }

    function mint(address _artistAddress, string memory _name, uint256 _royalty, uint256 _price, string memory _uri) external onlyOwner {
        require(artistExists[_artistAddress], "Artist must exist.");
        require(_price > 0, "Price must be greater than 0.");

        _mint(address(this), audioTrackCount);

        audioTracks.push(AudioTrack(audioTrackCount, payable(_artistAddress), _name, payable(msg.sender), _royalty, _price, _uri));
        artistToAudioTracks[_artistAddress].push(audioTrackCount);
        audioTrackCount++;
    }

    function buyAudioTrack(uint256 _tokenId) external payable {
        uint256 price = audioTracks[_tokenId].price;
        uint256 royalty = audioTracks[_tokenId].royalty;
        address artistAddress = audioTracks[_tokenId].artistAddress;
        address seller = audioTracks[_tokenId].seller;
        require(msg.value == price, "Please send the ask price to purchase audio track.");

        audioTracks[_tokenId].seller = payable(address(0));

        _transfer(address(this), msg.sender, _tokenId);
        payable(artistAddress).transfer(royalty);
        payable(seller).transfer(msg.value - royalty);

        emit AudioTrackBought(_tokenId, seller, msg.sender, price);
    }

    function relistAudioTrack(uint256 _tokenId, uint256 _price) external payable {
        audioTracks[_tokenId].seller = payable(msg.sender);
        audioTracks[_tokenId].price = _price;

        _transfer(msg.sender, address(this), _tokenId);
        emit AudioTrackRelisted(_tokenId, msg.sender, _price);
    }

    function getAudioTracksByArtist(address _artistAddress) external view returns (AudioTrack[] memory) {
        AudioTrack[] memory tracks = new AudioTrack[](artistToAudioTracks[_artistAddress].length);

        for (uint256 i = 0; i < artistToAudioTracks[_artistAddress].length; i++) {
            tracks[i] = audioTracks[artistToAudioTracks[_artistAddress][i]];
        }

        return tracks;
    }

    function getMyAudioTracks() external view returns (AudioTrack[] memory) {
        uint256 myTokenCount = balanceOf(msg.sender);
        AudioTrack[] memory tracks = new AudioTrack[](myTokenCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < audioTrackCount; i++) {
            if (ownerOf(i) == msg.sender) {
                tracks[currentIndex] = audioTracks[i];
                currentIndex++;
            }
        }

        return tracks;
    }

    function getAudioTracksOnSale() external view returns (AudioTrack[] memory) {
        uint256 count = balanceOf(address(this));
        AudioTrack[] memory audioTracksOnSale = new AudioTrack[](count);

        uint256 currentIndex;
        for (uint256 i = 0; i < audioTracks.length; i++) {
            if (audioTracks[i].seller != address(0)) {
                audioTracksOnSale[currentIndex] = audioTracks[i];
                currentIndex++;
            }
        }

        return audioTracksOnSale;
    }

}
