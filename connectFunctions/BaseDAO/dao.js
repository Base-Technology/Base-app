import { ethers } from "ethers";

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const abiCoder = ethers.utils.defaultAbiCoder;

/* 创建DAO
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* profileId : 创建者的profileid
* symbol ： 群名
* desc : 群描述
* imageURI ： 头像地址
* modules ： 创建dao时添加的modules
* members ： 创建dao是添加的成员
*/
export async function createDAO(
  sender,
  wallet,
  baseDAO,
  profileId,
  symbol,
  desc,
  imageURI,
  modules,
  members,
) {
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    throw new Error('sender is not wallet owner');
  }
  const methodData = baseDAO.interface.encodeFunctionData('createDAO', [
    {
      profileId,
      symbol,
      desc,
      imageURI,
      modules,
      members
    },
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseDAO.address, methodData, {
      gasLimit: 1000000,
    });
  await tx.wait();
}

