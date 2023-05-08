import axios from 'axios';
import { ipfsAddress } from '../constants/ipfs';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';

const tmpPath = RNFS.CachesDirectoryPath + '/';

function getRoundedDate(minutes, d = new Date()) {
    let ms = 1000 * 60 * minutes; // convert minutes to ms
    let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);
    return roundedDate;
}

async function sign(signer) {
    const currDate = new Date();
    const date = getRoundedDate(1, currDate);
    const msg = date.getTime().toString();

    const signature = await signer.signMessage(msg);
    return signature;
}

// fileType image/png
export async function uploadFile(file, fileType, signer) {
    const signature = await sign(signer);

    var formData = new FormData();
    formData.append('my-file', { uri: file, type: fileType, name: file.substring(file.lastIndexOf('/') + 1) });
    formData.append('uploaderAddress', signer.address);
    formData.append('encryptId', 0);
    formData.append('signature', signature);
    console.log(formData);
    try {
        const response = await axios.post(`${ipfsAddress}/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        await updateAccessControl(response.data.cid, signer.address, "", "makePublic", signer);
        return response.data.cid;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function uploadObject(object, signer) {
    const name = uuid.v4();
    try {
        const filePath = tmpPath + name;
        await RNFS.writeFile(filePath, JSON.stringify(object), 'utf8');
        const cid = await uploadFile(`file://${filePath}`, "text/json", signer);
        await RNFS.unlink(filePath);
        return cid;
    } catch {
        console.log(err);
        throw err;
    }
}

export async function downloadFile(cid, uploaderAddress, signer) {
    const signature = await sign(signer);

    try {
        const response = await axios.get(`${ipfsAddress}/api/download`, {
            params: {
                cid: cid,
                uploaderAddress: uploaderAddress,
                downloaderAddress: signer.address,
                signature: signature,
            },
            responseType: 'arraybuffer',
        });
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function downloadObject(cid, uploaderAddress, signer) {
    const signature = await sign(signer);

    try {
        const response = await axios.get(`${ipfsAddress}/api/download`, {
            params: {
                cid: cid,
                uploaderAddress: uploaderAddress,
                downloaderAddress: signer.address,
                signature: signature,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function getMetadata(cid, uploaderAddress) {
    try {
        const response = await axios.get(`${ipfsAddress}/api/metadata`, {
            params: {
                cid: cid,
                uploaderAddress: uploaderAddress,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function getMetadatas(uploaderAddress) {
    try {
        const response = await axios.get(`${ipfsAddress}/api/uploaded-files`, {
            params: {
                uploaderAddress: uploaderAddress,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function getAccessControl(cid, uploaderAddress, signer) {
    const signature = await sign(signer);

    try {
        const response = await axios.get(`${ipfsAddress}/api/access-control`, {
            params: {
                cid: cid,
                uploaderAddress: uploaderAddress,
                signature: signature,
            }
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}

export async function updateAccessControl(cid, uploaderAddress, downloaderAddress, mode, signer) {
    const signature = await sign(signer);

    var formData = new FormData();

    formData.append('cid', cid);
    formData.append('uploaderAddress', uploaderAddress);
    formData.append('mode', mode);
    formData.append('downloaderAddress', downloaderAddress);
    formData.append('signature', signature);
    console.log(formData);
    try {
        const response = await axios.post(`${ipfsAddress}/api/update-access-control`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        return response.data.cid;
    } catch (err) {
        console.log(err?.response?.data);
        throw err;
    }
}
