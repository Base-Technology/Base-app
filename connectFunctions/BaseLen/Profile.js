/* 用于用户创建profile
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseHub ： 对象，Hub和合约
* handle : 字符串，用户名
* imageURI ： 字符串 用户头像的标识
* followModuleAddr : 地址，用户为该profile选择的follow module 的地址
* followModuleData ： 初始化 follow module 时传递的参数
* followNFTURI ： 字符串，用于follow NFT 的标识
*/
export async function createProfile(
  sender,
  wallet,
  baseHub,
  handle,
  imageURI,
  followModuleAddr,
  followModuleData,
  followNFTURI,
) {
  const isOwner = await wallet.isOwner(sender.address);
  if (!isOwner) {
    throw new Error('sender is not wallet owner');
  }
  const profileIdbyhandle = await baseHub.callStatic.getProfileIdByHandle(
    handle,
  );
  if (profileIdbyhandle != 0) {
    throw new Error('handle repeated!');
  }
  const state = await baseHub.callStatic.getState();
  if (state != 0) {
    throw new Error("hub state != 0 reset before create profile")
  }

  const methodData = baseHub.interface.encodeFunctionData('createProfile', [
    {
      to: wallet.address,
      handle: handle,
      imageURI: imageURI,
      followModule: followModuleAddr,
      followModuleInitData: followModuleData,
      followNFTURI: followNFTURI,
    },
  ]);

  const tx = await wallet
    .connect(sender)
    .execute(baseHub.address, methodData, {
      gasLimit: 1000000,
    });
  await tx.wait();
}

export async function getProfileIdByHandle(
  baseHub,
  handle,
) {
  return await baseHub.callStatic.getProfileIdByHandle(
    handle,
  );
}

export async function getProfileById(
  baseHub,
  id,
) {
  return await baseHub.callStatic.getProfile(
    id,
  );
}
