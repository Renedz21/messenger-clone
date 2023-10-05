import { User } from "@prisma/client"
import Image from "next/image"

import UserImage from '@/public/images/placeholder.webp'

interface AvatarProps {
    user?: User
}

const Avatar = ({ user }: AvatarProps) => {
    return (
        <div className="relative">
            <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:w-11 md:h-11">
                <Image
                    src={user?.image ? user.image : UserImage}
                    alt="User Image"
                    fill
                />
            </div>
            <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />

        </div>
    )
}

export default Avatar