// ERC721 NFTs emit this event when transferred:
// Transfer (address from, address to, uint256 tokenId)

import { toUtf8Bytes } from "@ethersproject/strings";
import { ethers } from "ethers";

export const ERC721TransferTopic = ethers.utils.keccak256(
  toUtf8Bytes("Transfer(address,address,uint256)")
);

// ERC1155 NFTs emit these event when transferred:
// TransferSingle (address operator, address from, address to, uint256 id, uint256 value)
// TransferBatch (address operator, address from, address to, uint256[] ids, uint256[] values)
