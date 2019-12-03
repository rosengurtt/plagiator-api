import band from '../../models/band';

export const getAllBandsForStyle = async (styleId: string) => {
    let myBands = await band.find({ musicStyle: styleId }).select('name').sort({ name: 1 }).exec();
    return {
        bands: myBands
    }
};

export const getAllBands = async () => {
    let myBands = await band.find().select('name').sort({ name: 1 }).exec();
    return {
        bands: myBands
    }
};



