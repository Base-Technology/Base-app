import { ethers } from "ethers";

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const abiCoder = ethers.utils.defaultAbiCoder;

/* 成员加入
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoId：目标dao
* profileId : 调用成员的profileid
*/
export async function memberJoin(
  sender,
  wallet,
  baseDAO,
  daoId,
  profileId,
) {
  const isOwner = wallet.isOwner(sender.address);

  if (!isOwner) {
    throw new Error('sender is not wallet owner');
  }
  const methodData = baseDAO.interface.encodeFunctionData('MemberJoin', [
    {
      daoId,
      profileId,
    },
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseDAO.address, methodData, {
      gasLimit: 1000000,
    });
  await tx.wait();
}
/* 成员退出
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoId：目标dao
* profileId : 调用成员的profileid
*/
export async function memberQuit(
    sender,
    wallet,
    baseDAO,
    daoId,
    profileId,
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('MemberQuit', [
      {
        daoId,
        profileId,
      },
    ]);
    const tx = await wallet
      .connect(sender)
      .execute(baseDAO.address, methodData, {
        gasLimit: 1000000,
      });
    await tx.wait();
}
/* 添加成员
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoId：目标dao
* profileId : 调用成员的profileid
* member：目标成员profileId
*/
export async function addMember(
    sender,
    wallet,
    baseDAO,
    daoId,
    profileId,
    member
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('addMember', [
      {
        daoId,
        profileId,
        member
      },
    ]);
    const tx = await wallet
      .connect(sender)
      .execute(baseDAO.address, methodData, {
        gasLimit: 1000000,
      });
    await tx.wait();
}
/* 删除成员
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoId：目标dao
* profileId : 调用成员的profileid
* member：目标成员profileId
*/
export async function removeMember(
    sender,
    wallet,
    baseDAO,
    daoId,
    profileId,
    member
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('removeMember', [
      {
        daoId,
        profileId,
        member
      },
    ]);
    const tx = await wallet
      .connect(sender)
      .execute(baseDAO.address, methodData, {
        gasLimit: 1000000,
      });
    await tx.wait();
}