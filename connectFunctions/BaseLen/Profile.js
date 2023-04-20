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
