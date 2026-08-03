import React from 'react';
import { Link } from 'react-router-dom';
const LandingPageLogo = () => {
    return (
        <>
            <span className="font-['Fraunces'] text-xl tracking-wide">
                <Link to="/" rel="noopener noreferrer">
                    Vault<span className="text-xl text-[#C9A227] font-bold tracking-widest">X</span> 2.0
                </Link>
            </span>
        </>

    )
}

export default LandingPageLogo
