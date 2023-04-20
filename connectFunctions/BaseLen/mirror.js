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