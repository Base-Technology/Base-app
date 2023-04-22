/* 转载publication
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseHub ： 对象，Hub和合约
* profileId : 转载者的profileId
* profileIdPointed ： 被转载publication所属的profileId
* pubId : publication的id
* referenceModule ：  传递给reference module的参数
* referenceModuleData ： 初始化 follow module 时传递的参数
* referenceModuleInitdata ： 初始化 reference module 时传递的参数
*/
export async function mirror(
  sender,
  wallet,
  baseHub,
  profileId,
  profileIdPointed,
  pubId,
  referenceModuleData,
  referenceModule,
  referenceModuleInitdata,
) {
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  const name = await baseHub.callStatic.getHandle(profileId);
  if (name == '') {
    console.log('is not id of profile');
    return false;
  }

  const owner = await baseHub.callStatic.ownerOf(profileId)
  if(owner != wallet.address){
      console.log("is not owner")
      return false
   }

  const name2 = await baseHub.callStatic.getHandle(profileIdPointed);
  if (name2 == '') {
    console.log('targer is not profile');
    return false;
  }

  const pubCount = await baseHub.callStatic.getPubCount(profileIdPointed);
  if (pubCount < pubId) {
    console.log('is not publication of profile');
    return false;
  }

  const methodData = baseHub.interface.encodeFunctionData('mirror', [
    {
      profileId: profileId,
      profileIdPointed: profileIdPointed,
      pubIdPointed: pubId,
      referenceModuleData: referenceModuleData,
      referenceModule: referenceModule,
      referenceModuleInitData: referenceModuleInitdata,
    }
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseHub.address, methodData, {
      gasLimit: 1000000,
    });
}