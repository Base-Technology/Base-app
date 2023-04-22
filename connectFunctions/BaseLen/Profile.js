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
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  const profileIdbyhandle = await baseHub.callStatic.getProfileIdByHandle(
    handle,
  );
  if (profileIdbyhandle != 0) {
    console.log('handle repeated!');
    return 0;
  }
  const state = await baseHub.callStatic.getState();
  if (state != 0) {
    console.log("hub state != 0 reset before create profile")
    return 
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
}
