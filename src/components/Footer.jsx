import './Footer.css';

/**
 * Footer Component
 * 
 * Purpose: Consistent footer across all admin pages
 * - Company information and branding
 * - Quick links for support and documentation
 * - Copyright and legal information
 * - Appears at bottom of every page
 * 
 * Props:
 * - sidebarOpen: Boolean to determine footer width based on sidebar state
 * 
 * BEM Classes Used:
 * .footer, .footer__container, .footer__section, .footer__link
 */
function Footer({ sidebarOpen = true }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${sidebarOpen ? 'footerOpen' : 'footerClosed'}`}>
      <div className="footerContainer">
        {/* Left Section - Company Info */}
        <div className="footerSection">
          <h3 className="footerTitle">About Myotronics</h3>
          <p className="footerText">
            Myotronics develops advanced hardware and software solutions 
            for professional EMG systems and clinical applications.
          </p>
          <div className="footerSocials">
            <a href="#facebook" title="Facebook" className="footerSocialLink">f</a>
            <a href="#twitter" title="Twitter" className="footerSocialLink">𝕏</a>
            <a href="#linkedin" title="LinkedIn" className="footerSocialLink">in</a>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footerSection">
          <h4 className="footerSubtitle">Quick Links</h4>
          <ul className="footerLinks">
            <li><a href="#documentation" className="footerLink">Documentation</a></li>
            <li><a href="#support" className="footerLink">Support Center</a></li>
            <li><a href="#faq" className="footerLink">FAQ</a></li>
            <li><a href="#contact" className="footerLink">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Section - Legal & Support */}
        <div className="footerSection">
          <h4 className="footerSubtitle">Support</h4>
          <ul className="footerLinks">
            <li><a href="#privacy" className="footerLink">Privacy Policy</a></li>
            <li><a href="#terms" className="footerLink">Terms of Service</a></li>
            <li><a href="#security" className="footerLink">Security</a></li>
            <li><a href="#accessibility" className="footerLink">Accessibility</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Version Info */}
      <div className="footerBottom">
        <p>&copy; {currentYear} Myotronics. All rights reserved.</p>
        <p className="footerVersion">Admin Portal v1.0.0</p>
      </div>
    </footer>
  );
}

export default Footer;
