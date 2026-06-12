"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
// removed incorrect import: use authClient.requestPasswordReset instead
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState<'success' | 'error'>('success')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const { error } = await authClient.requestPasswordReset({
                email: email,
                redirectTo: "/reset-password",
            })

            if (error) {
                setMessage(error.message || "Something went wrong")
                setMessageType('error')
            } else {
                setMessage("Check your email to click the reset link")
                setMessageType('success')
            }
        } catch (err) {
            setMessage("Something went wrong. Please try again.")
            setMessageType('error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className = "">

            <h2 className="text-center mt-20">Enter your Email Below To Get Reset Link</h2>
            <form onSubmit={handleSubmit} className = "h-30 w-100 flex flex-col justify-center item-center mx-auto gap-4">
                <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send reset email"}
                </Button>
            </form>
            {message && (
                <p style={{ 
                    color: messageType === 'success' ? 'green' : 'red',
                    marginTop: '1rem'
                }}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default ForgotPassword