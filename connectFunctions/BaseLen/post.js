import { freeCollectModuleAddr } from "../../constants/contract_address";
import { ethers } from "ethers";

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const abiCoder = ethers.utils.defaultAbiCoder;

/* 用于发布publication
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseHub ： 对象，Hub和合约
* profileId : int，发帖者的profileid
* contentURI ： 字符串，内容的标识
* collectModule : 地址，用户为该publication选定的collect module
* collectModuleData ： 初始化profile 的 collect module时传递的参数
* referenceModule ： 地址，用户为该publication选定的reference module
* referenceModuleData ： 初始化profile 的 reference module时传递的参数
*/
export async function post(
  sender,
  wallet,
  baseHub,
  profileId,
  contentURI,
  collectModule = freeCollectModuleAddr,
  collectModuleData = abiCoder.encode(['bool'], [true]),
  referenceModule = ZERO_ADDRESS,
  referenceModuleData = [],
) {
  const owner = await baseHub.callStatic.ownerOf(profileId);
  const isOwner = wallet.isOwner(sender.address);

  if (!isOwner) {
    throw new Error('sender is not wallet owner');
  }
  if (owner != wallet.address) {
    throw new Error('is not profile owner');
  }
  const methodData = baseHub.interface.encodeFunctionData('post', [
    {
      profileId: profileId,
      contentURI: contentURI,
      collectModule: collectModule,
      collectModuleInitData: collectModuleData,
      referenceModule: referenceModule,
      referenceModuleInitData: referenceModuleData,
    },
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseHub.address, methodData, {
      gasLimit: 1000000,
    });
  await tx.wait();
}

