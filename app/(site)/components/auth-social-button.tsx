interface AuthSocialButtonProps {
    provider: string
    icon: any | React.ReactNode
    onClick: () => void
}

const AuthSocialButton = ({ icon, onClick, provider }: AuthSocialButtonProps) => {
    return (
        <button
            onClick={onClick}
            className='flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focs:outline-offset-0'
        >
            <span className='sr-only'>Sign in with {provider}</span>
            {icon}
        </button>
    )
}

export default AuthSocialButton