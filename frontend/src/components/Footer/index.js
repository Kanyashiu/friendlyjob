import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './footer.scss';
import { Link } from 'react-router-dom';

// Footer reusable component

const Footer = () => (

  <footer className="footer">
    <div className="footer_content">
      &copy; 2020 - FriendlyJob All right reserved
    </div>
    <div className="footer_link">
      <div className="footer_link_text">
        <Link to="">Qui nous sommes</Link>
      </div>
      <div className="footer_icon">
        <Button classNames="footer_icon_item" circular color='facebook' icon='facebook' />
        <Button classNames="footer_icon_item" circular color='twitter' icon='twitter' />
        <Button classNames="footer_icon_item" circular color='linkedin' icon='linkedin' />
        <Button classNames="footer_icon_item" circular color='google plus' icon='google plus' />
      </div>
    </div>
  </footer>
);

// Export
export default Footer;
