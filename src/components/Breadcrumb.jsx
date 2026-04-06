import './Breadcrumb.css';

/**
 * Breadcrumb Component
 * 
 * Purpose: Display navigation path across all pages
 * - Reusable component for every page
 * - Shows current page location
 * - Clickable for navigation between pages
 * 
 * Props:
 *   - items: Array of breadcrumb items [{ label: 'Home', page: 'home' }, { label: 'User Management', active: true }]
 *   - onNavigate: Callback function to handle page navigation
 */

function Breadcrumb({ items = [], onNavigate }) {
  const handleClick = (page) => {
    if (page && onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="breadcrumbContainer">
          <span 
            className={`breadcrumbItem ${item.active ? 'active' : ''}`}
            onClick={() => handleClick(item.page)}
            style={{ cursor: item.page && !item.active ? 'pointer' : 'default' }}
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <span className="breadcrumbSeparator">›</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;
