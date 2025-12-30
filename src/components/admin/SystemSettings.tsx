import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Globe, 
  Mail, 
  Shield, 
  Database,
  Bell,
  Palette,
  Code,
  Server,
  Key,
  AlertTriangle
} from 'lucide-react';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      siteName: 'KaamKhojo.com',
      siteDescription: "India's Premier Job Portal",
      contactEmail: 'contact@kaamkhojo.com',
      supportEmail: 'support@kaamkhojo.com',
      phoneNumber: '+91 9876543210',
      address: 'New Delhi, India',
      timezone: 'Asia/Kolkata',
      language: 'en',
      currency: 'INR'
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUsername: 'noreply@kaamkhojo.com',
      smtpPassword: '••••••••',
      fromEmail: 'noreply@kaamkhojo.com',
      fromName: 'KaamKhojo.com',
      enableEmailNotifications: true,
      enableJobAlerts: true,
      enableNewsletters: true
    },
    security: {
      enableTwoFactor: false,
      sessionTimeout: '30',
      maxLoginAttempts: '5',
      passwordMinLength: '8',
      requireSpecialChars: true,
      enableCaptcha: true,
      enableSslOnly: true,
      enableIpWhitelist: false,
      allowedIps: ''
    },
    notifications: {
      enablePushNotifications: true,
      enableEmailNotifications: true,
      enableSmsNotifications: false,
      jobApplicationNotifications: true,
      newJobNotifications: true,
      systemMaintenanceNotifications: true,
      securityAlerts: true
    },
    api: {
      enableApiAccess: true,
      apiRateLimit: '1000',
      enableApiLogging: true,
      apiVersion: 'v1',
      enableWebhooks: true,
      webhookSecret: '••••••••••••••••'
    },
    maintenance: {
      maintenanceMode: false,
      maintenanceMessage: 'We are currently performing scheduled maintenance. Please check back soon.',
      allowedIps: '127.0.0.1',
      estimatedDowntime: '2 hours'
    }
  });

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API', icon: Code },
    { id: 'maintenance', label: 'Maintenance', icon: Server }
  ];

  const handleSave = (section: string) => {
    // Simulate saving settings
    alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
          <input
            type="email"
            value={settings.general.contactEmail}
            onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
          <input
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) => handleInputChange('general', 'supportEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={settings.general.phoneNumber}
            onChange={(e) => handleInputChange('general', 'phoneNumber', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleInputChange('general', 'timezone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleInputChange('general', 'language', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="bn">Bengali</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          value={settings.general.address}
          onChange={(e) => handleInputChange('general', 'address', e.target.value)}
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleInputChange('email', 'smtpHost', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="text"
            value={settings.email.smtpPort}
            onChange={(e) => handleInputChange('email', 'smtpPort', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
          <input
            type="text"
            value={settings.email.smtpUsername}
            onChange={(e) => handleInputChange('email', 'smtpUsername', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
          <input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => handleInputChange('email', 'smtpPassword', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleInputChange('email', 'fromEmail', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            
            type="text"
            value={settings.email.fromName}
            onChange={(e) => handleInputChange('email', 'fromName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Email Features</h4>
        <div className="space-y-3">
          {[
            { key: 'enableEmailNotifications', label: 'Enable Email Notifications' },
            { key: 'enableJobAlerts', label: 'Enable Job Alerts' },
            { key: 'enableNewsletters', label: 'Enable Newsletters' }
          ].map((item) => (
            <label key={item.key} className="flex items-center">
              <input
                type="checkbox"
                checked={settings.email[item.key as keyof typeof settings.email] as boolean}
                onChange={(e) => handleInputChange('email', item.key, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleInputChange('security', 'sessionTimeout', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleInputChange('security', 'maxLoginAttempts', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleInputChange('security', 'passwordMinLength', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Security Features</h4>
        <div className="space-y-3">
          {[
            { key: 'enableTwoFactor', label: 'Enable Two-Factor Authentication' },
            { key: 'requireSpecialChars', label: 'Require Special Characters in Passwords' },
            { key: 'enableCaptcha', label: 'Enable CAPTCHA' },
            { key: 'enableSslOnly', label: 'Force SSL/HTTPS Only' },
            { key: 'enableIpWhitelist', label: 'Enable IP Whitelist' }
          ].map((item) => (
            <label key={item.key} className="flex items-center">
              <input
                type="checkbox"
                checked={settings.security[item.key as keyof typeof settings.security] as boolean}
                onChange={(e) => handleInputChange('security', item.key, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {settings.security.enableIpWhitelist && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Allowed IP Addresses</label>
          <textarea
            value={settings.security.allowedIps}
            onChange={(e) => handleInputChange('security', 'allowedIps', e.target.value)}
            rows={3}
            placeholder="Enter IP addresses, one per line"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}
    </div>
  );

  const renderMaintenanceSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Maintenance Mode</h4>
            <p className="text-sm text-yellow-700 mt-1">
              When enabled, only administrators can access the site. All other users will see the maintenance message.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.maintenance.maintenanceMode}
            onChange={(e) => handleInputChange('maintenance', 'maintenanceMode', e.target.checked)}
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">Enable Maintenance Mode</span>
        </label>
      </div>

      {settings.maintenance.maintenanceMode && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Message</label>
            <textarea
              value={settings.maintenance.maintenanceMessage}
              onChange={(e) => handleInputChange('maintenance', 'maintenanceMessage', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Allowed IPs (Admin Access)</label>
              <input
                type="text"
                value={settings.maintenance.allowedIps}
                onChange={(e) => handleInputChange('maintenance', 'allowedIps', e.target.value)}
                placeholder="127.0.0.1, 192.168.1.1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Downtime</label>
              <input
                type="text"
                value={settings.maintenance.estimatedDowntime}
                onChange={(e) => handleInputChange('maintenance', 'estimatedDowntime', e.target.value)}
                placeholder="2 hours"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'email':
        return renderEmailSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Notification Settings</h4>
            <div className="space-y-3">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
                <input
                  type="number"
                  value={settings.api.apiRateLimit}
                  onChange={(e) => handleInputChange('api', 'apiRateLimit', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Version</label>
                <select
                  value={settings.api.apiVersion}
                  onChange={(e) => handleInputChange('api', 'apiVersion', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="v1">v1</option>
                  <option value="v2">v2</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Secret</label>
              <input
                type="password"
                value={settings.api.webhookSecret}
                onChange={(e) => handleInputChange('api', 'webhookSecret', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-3">
              {[
                { key: 'enableApiAccess', label: 'Enable API Access' },
                { key: 'enableApiLogging', label: 'Enable API Logging' },
                { key: 'enableWebhooks', label: 'Enable Webhooks' }
              ].map((item) => (
                <label key={item.key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.api[item.key as keyof typeof settings.api] as boolean}
                    onChange={(e) => handleInputChange('api', item.key, e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        );
      case 'maintenance':
        return renderMaintenanceSettings();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-600">Configure system-wide settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="space-y-2">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900 capitalize">
                {activeTab} Settings
              </h3>
              <button
                onClick={() => handleSave(activeTab)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
            
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;