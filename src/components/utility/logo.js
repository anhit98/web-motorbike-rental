import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config';

// export default function({ collapsed, styling }) {
const Logo = ({ collapsed }) => {
  return (
    <div className="isoLogoWrapper">
      {collapsed ? (
        <div>
          <h3>
            <Link to="/dashboard">
              <i className={siteConfig.siteIcon} />
            </Link>
          </h3>
        </div>
      ) : (
        <h3>
          <Link to="/dashboard">{siteConfig.siteName}</Link>
        </h3>
      )}
    </div>
  );
};

Logo.propTypes = {
  collapsed: PropTypes.bool,
};

export default Logo;
