import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Settings.css';

function Settings() {
  const { currentTheme, changeTheme, allThemes } = useContext(ThemeContext);

  return (
    <div className="settings">
      <div className="settingsHeader">
        <h1 className="settingsTitle">⚙️ Settings</h1>
      </div>

      <div className="settingsContainer">
        {/* General Section */}
        <div className="settingsSection">
          <h2 className="sectionTitle">General</h2>
          <div className="sectionContent">
            <div className="settingGroup">
              <label className="settingLabel">Application Theme</label>
              <p className="settingDescription">Choose your preferred color theme. Changes apply instantly across the entire application.</p>
              
              <div className="themeGrid">
                {Object.entries(allThemes).map(([key, theme]) => (
                  <div
                    key={key}
                    className={`themeCard ${currentTheme === key ? 'active' : ''}`}
                    onClick={() => changeTheme(key)}
                    title={`Switch to ${theme.name}`}
                  >
                    <div className="themePreview">
                      <div className="themeColorPrimary" style={{ backgroundColor: theme.primary }}></div>
                      <div className="themeColorAccent" style={{ backgroundColor: theme.accent }}></div>
                    </div>
                    <span className="themeName">{theme.name}</span>
                    {currentTheme === key && (
                      <div className="themeCheckmark">✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="settingGroup">
              <label className="settingLabel">Current Theme</label>
              <div className="currentThemeInfo">
                <div className="themeInfoItem">
                  <span className="themeInfoLabel">Active Theme:</span>
                  <span className="themeInfoValue">{allThemes[currentTheme]?.name}</span>
                </div>
                <div className="themeInfoItem">
                  <span className="themeInfoLabel">Primary Color:</span>
                  <div className="colorDisplay" style={{ backgroundColor: allThemes[currentTheme]?.primary }}></div>
                  <span className="colorCode">{allThemes[currentTheme]?.primary}</span>
                </div>
                <div className="themeInfoItem">
                  <span className="themeInfoLabel">Accent Color:</span>
                  <div className="colorDisplay" style={{ backgroundColor: allThemes[currentTheme]?.accent }}></div>
                  <span className="colorCode">{allThemes[currentTheme]?.accent}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div className="settingsSection">
          <h2 className="sectionTitle">Display Preferences</h2>
          <div className="sectionContent">
            <div className="settingGroup">
              <label className="settingLabel">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="settingCheckbox"
                />
                <span>Auto-apply theme on login</span>
              </label>
            </div>
            <div className="settingGroup">
              <label className="settingLabel">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="settingCheckbox"
                />
                <span>Remember theme preference</span>
              </label>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="settingsSection">
          <h2 className="sectionTitle">About</h2>
          <div className="sectionContent">
            <div className="aboutInfo">
              <p><strong>Application:</strong> React Admin Dashboard</p>
              <p><strong>Version:</strong> 1.0.0</p>
              <p><strong>Built with:</strong> React 18, Vite, CSS3</p>
              <p><strong>Available Themes:</strong> {Object.keys(allThemes).length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
