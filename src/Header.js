import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
        <div>
            <h3 className='title'>Wellcome!</h3>
        </div>
        <nav>
            <ul>
                <li>
                    <Link to='/'>Game</Link>
                </li>
                <li>
                    <Link to='/rule'>Rule</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
};

export default Header