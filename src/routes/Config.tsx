import React from 'react'
import { Link } from 'react-router-dom'

const config = () => {
  return (
    <div>
      <p>config</p>
      <ul>
        <li>
          <Link to="/">top</Link>
        </li>
        <li>
          <Link to="/config/wire">wire</Link>
        </li>
        <li>
          <Link to="/config/toggle">toggleButton</Link>
        </li>
        <li>
          <Link to="/config/key">keySwitch</Link>
        </li>
        <li>
          <Link to="/config/level">levelMeter</Link>
        </li>
        <li>
          <Link to="/config/lightsOut">lightsOut</Link>
        </li>
      </ul>
    </div>
  )
}

export default config