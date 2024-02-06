import { TSmartphone } from "./smartphone.interface"
import { Smartphone } from "./smartphone.model"

export const createSmartphoneToDb = async (payload: TSmartphone) => {

    const result = await Smartphone.create(payload)
    return result
}
export const getSingleProductIntoDB = async (id: string) => {
    const result = await Smartphone.findById(id);
    return result;
  };
export const getSmartphoneToDb = async () => {


    const result = await Smartphone.find()
    return result
}
export const patchSmartphoneToDb = async (id: string, payload: Partial<TSmartphone>) => {

    const result = await Smartphone.findByIdAndUpdate(id, payload, { new: true })
    return result
}
export const deleteSmartphoneToDb = async (id: string) => {

    await Smartphone.findByIdAndDelete(id)

}
export const deleteManyProductsIntoDB = async (ids: string[]) => {
    const filter = { _id: { $in: ids } };
    const result = await Smartphone.deleteMany(filter);
    return result;
  };