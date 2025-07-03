interface Props {
    children: React.ReactNode;
}

const AuthLayout = ({children}: Props) =>  {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-svh flex flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout