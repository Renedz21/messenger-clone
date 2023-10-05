'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import { useState, useCallback, useEffect } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import AuthSocialButton from './auth-social-button'
import { toast } from 'sonner'
import { Github, Chrome } from 'lucide-react'
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [
        session?.status,
        router
    ])

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    },
        [variant]
    )

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => {
                    signIn('credentials', data)
                    toast.success('User created')
                })
                .catch(() => toast.error("Error"))
                .finally(() => setIsLoading(false))
        } else {
            signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid Credentials')
                    }

                    if (callback?.ok || !callback?.error) {
                        toast.success('Logged in!')
                        router.push('/users')

                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = async (provider: string) => {
        setIsLoading(true)

        //Next auth social login
        signIn(provider, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid Credentials')
                }

                if (callback?.ok || !callback?.error) {
                    toast.success('Logged in!')
                }
            })
    }

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'REGISTER' && (
                        <Input
                            label='Nombre'
                            register={register}
                            id='name'
                            type='text'
                            disabled={isLoading}
                            errors={errors}
                        />
                    )}

                    <Input
                        label='Email address'
                        register={register}
                        id='email'
                        type='email'
                        disabled={isLoading}
                        errors={errors}
                    />

                    <Input
                        label='Password'
                        register={register}
                        id='password'
                        type='password'
                        disabled={isLoading}
                        errors={errors}
                    />
                    <div>
                        <Button
                            type='submit'
                            fullWidth
                            disabled={isLoading}
                        >
                            {variant === 'LOGIN' ? 'Login' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className='relative'>
                        <div className="absolute inset-0 flex items-center">
                            <div className='w-full border-t border-gray-300' />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className='bg-white px-2 text-gray-500'>Or continue with</span>
                        </div>
                    </div>
                    <div className='mt-6 flex gap-2'>
                        <AuthSocialButton
                            icon={
                                <Github />
                            }
                            onClick={() => socialAction('github')}
                            provider='Github'
                        />
                        <AuthSocialButton
                            icon={
                                <Chrome />
                            }
                            onClick={() => socialAction('google')}
                            provider='Github'
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>{variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}</div>
                    <div
                        onClick={toggleVariant}
                        className='underline cursor-pointer'
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm