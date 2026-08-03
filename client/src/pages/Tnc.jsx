import React from 'react'
import { Link } from 'react-router-dom'

const Tnc = () => {
    return (
        <div className="min-h-screen bg-[#0B0F14] text-[#E8E6DF] px-6 py-16">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
                    <span className="font-['Fraunces'] text-xl tracking-wide">
                        <Link to="/" rel="noopener noreferrer">
                            Vault<span className="text-xl text-[#C9A227] font-bold tracking-widest">X</span> 2.0
                        </Link>
                    </span>
                </div>

                <h1 className="font-['Fraunces'] text-3xl mb-4">Terms & Conditions</h1>
                <p className="text-[#8B94A0] text-sm mb-10">Last updated: August 2026</p>

                <div className="space-y-8 text-sm leading-relaxed text-[#8B94A0]">
                    <section>
                        <h2 className="font-['Fraunces'] text-lg text-[#E8E6DF] mb-2">About this project</h2>
                        <p>
                            VaultX is a personal password management project built to demonstrate secure
                            credential storage, encryption, and account protection practices. It is not a
                            commercial product, and no warranty of any kind is provided.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-['Fraunces'] text-lg text-[#E8E6DF] mb-2">What we store</h2>
                        <p>
                            We store your email address, a hashed version of your account password, hashed
                            security question answers, and your saved vault entries in encrypted form. We do
                            not store your master password in any recoverable form.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-['Fraunces'] text-lg text-[#E8E6DF] mb-2">Your responsibility</h2>
                        <p>
                            You are responsible for remembering your master password and keeping your account
                            credentials confidential. Since vault entries are encrypted using a key tied to
                            your master password, it cannot be recovered if lost.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-['Fraunces'] text-lg text-[#E8E6DF] mb-2">No data resale</h2>
                        <p>
                            Your data is never sold, shared with advertisers, or used for any purpose beyond
                            operating this application.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-['Fraunces'] text-lg text-[#E8E6DF] mb-2">Changes</h2>
                        <p>
                            These terms may be updated as the project evolves. Continued use after changes
                            means you accept the updated terms.
                        </p>
                    </section>
                </div>

                <Link to="/register" className="inline-block mt-12 text-[#C9A227] hover:underline text-sm">
                    &larr; Back to registration
                </Link>
            </div>
        </div>
    )
}

export default Tnc