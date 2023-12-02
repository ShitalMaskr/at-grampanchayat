import { User } from "@libs/dbmodels/user.model"
import { GetItem } from "@libs/interfaces/get-item.interface"

export const getUserById = async (params: GetItem) => {
    return await User.get({ PK: params.PK, SK: params.SK })
}