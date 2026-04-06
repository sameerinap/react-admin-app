import './Footer.css';

export default function Footer({ sidebarOpen }) {
  return (
    <footer className={`footer ${sidebarOpen ? 'footerOpen' : 'footerClosed'}`}>
      

      {/* Footer Bottom */}
      <div className="footerBottom">
        <p className="footerCopy">
          &copy; 2024 React Admin Portal. All rights reserved.
        </p>
        <p className="footerStatus">
          Status: <span className="footerStatusOnline">● Online</span>
        </p>
      </div>
    </footer>
  );
}
