import musicStyle from '../../models/musicStyle';

export const getAllStyles = async () => {
    let myStyles = await musicStyle.find().select('name').sort({ name: 1 }).exec();
    return {
        styles: myStyles
    }
};



