export async function post(
  sender,
  wallet,
  baseHub,
  profileId,
  contentURI,
  collectModule,
  collectModuleData,
  referenceModule,
  referenceModuleData,
) {
  const owner = await baseHub.callStatic.ownerOf(profileId);
  const isOwner = wallet.isOwner(sender.address);

  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  if (owner != wallet.address) {
    console.log('is not owner');
    return false;
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
}

