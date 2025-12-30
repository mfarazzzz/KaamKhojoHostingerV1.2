# 🚀 Hostinger Deployment Guide for KaamKhojo.com

This guide will help you deploy your KaamKhojo.com job portal on Hostinger hosting.

## 📋 Prerequisites

Before starting the deployment, ensure you have:

- ✅ Hostinger hosting account (Premium or Business plan recommended)
- ✅ Domain name configured
- ✅ FTP/SFTP access credentials
- ✅ Node.js project built locally
- ✅ File manager or FTP client (FileZilla recommended)

## 🏗️ Step 1: Prepare Your Project for Production

### 1.1 Build the Project Locally

```bash
# Navigate to your project directory
cd kaamkhojo-job-portal

# Install dependencies (if not already done)
npm install

# Create production build
npm run build
```

This creates a `dist/` folder with all production-ready files.

### 1.2 Verify Build Contents

Your `dist/` folder should contain:
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other-assets]
├── manifest.json
├── robots.txt
├── sitemap.xml
├── sw.js
└── favicon files
```

## 🌐 Step 2: Hostinger Setup

### 2.1 Access Hostinger Control Panel

1. Log in to your Hostinger account
2. Go to **Hosting** → **Manage**
3. Access **File Manager** or note down FTP credentials

### 2.2 Domain Configuration

1. In Hostinger control panel, go to **Domains**
2. Point your domain to your hosting account
3. Ensure DNS propagation is complete (may take 24-48 hours)

## 📁 Step 3: File Upload Methods

### Method A: Using Hostinger File Manager (Recommended)

1. **Access File Manager**
   - In Hostinger control panel → **Files** → **File Manager**
   - Navigate to `public_html` folder

2. **Clear Default Files**
   - Delete default `index.html` and other files in `public_html`
   - Keep `.htaccess` if it exists

3. **Upload Your Files**
   - Click **Upload Files**
   - Select all files from your `dist/` folder
   - Upload them directly to `public_html` (not in a subfolder)

4. **Extract if Needed**
   - If you uploaded a ZIP file, extract it in `public_html`
   - Ensure files are in root, not in a subdirectory

### Method B: Using FTP Client (FileZilla)

1. **Get FTP Credentials**
   - In Hostinger panel → **Files** → **FTP Accounts**
   - Note: Hostname, Username, Password, Port (usually 21)

2. **Connect via FileZilla**
   ```
   Host: your-domain.com or ftp.your-domain.com
   Username: your-ftp-username
   Password: your-ftp-password
   Port: 21
   ```

3. **Upload Files**
   - Navigate to `public_html` on remote server
   - Upload all contents of `dist/` folder to `public_html`
   - Ensure `index.html` is in the root of `public_html`

## ⚙️ Step 4: Configure Server Settings

### 4.1 Create/Update .htaccess File

Create a `.htaccess` file in `public_html` with the following content:

```apache
# Enable GZIP Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/x-icon "access plus 1 year"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType application/x-shockwave-flash "access plus 1 month"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Single Page Application (SPA) Routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle Angular and React Router
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Force HTTPS (Optional but recommended)
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Prevent access to sensitive files
<Files ~ "^\.">
    Order allow,deny
    Deny from all
</Files>

# Block access to source files
<FilesMatch "\.(ts|tsx|jsx|json|md)$">
    Order allow,deny
    Deny from all
</FilesMatch>
```

### 4.2 Set Correct File Permissions

Using File Manager or FTP:
- Folders: 755 permissions
- Files: 644 permissions
- `.htaccess`: 644 permissions

## 🔧 Step 5: SSL Certificate Setup

### 5.1 Enable SSL in Hostinger

1. Go to Hostinger control panel
2. Navigate to **Security** → **SSL**
3. Enable **Free SSL Certificate** for your domain
4. Wait for SSL activation (usually 10-15 minutes)

### 5.2 Force HTTPS Redirect

The `.htaccess` file above includes HTTPS redirect rules. Alternatively, you can enable this in Hostinger control panel under **Security** → **Force HTTPS**.

## 🌍 Step 6: Domain and DNS Configuration

### 6.1 Point Domain to Hostinger

If your domain is not registered with Hostinger:

1. **Get Hostinger Nameservers**
   - In Hostinger panel → **Domains** → **DNS Zone**
   - Note the nameservers (usually ns1.dns-parking.com, ns2.dns-parking.com)

2. **Update Domain Nameservers**
   - Log in to your domain registrar
   - Update nameservers to point to Hostinger
   - Wait for DNS propagation (24-48 hours)

### 6.2 Configure Subdomains (Optional)

For additional features like API or admin panel:
- In Hostinger panel → **Domains** → **Subdomains**
- Create subdomains like `api.kaamkhojo.com` or `admin.kaamkhojo.com`

## 📧 Step 7: Email Setup (Optional)

### 7.1 Create Professional Email Accounts

1. In Hostinger panel → **Emails** → **Email Accounts**
2. Create accounts like:
   - `contact@kaamkhojo.com`
   - `support@kaamkhojo.com`
   - `admin@kaamkhojo.com`
   - `noreply@kaamkhojo.com`

### 7.2 Configure Email Forwarding

Set up email forwarding for better management:
- Forward all emails to your main email address
- Set up auto-responders if needed

## 🔍 Step 8: SEO and Analytics Setup

### 8.1 Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your domain property
3. Verify ownership using HTML file method:
   - Download verification file
   - Upload to `public_html` root
   - Verify in Search Console

### 8.2 Google Analytics

1. Create Google Analytics 4 property
2. Get tracking ID
3. Update your environment variables or directly in code
4. Replace `GA_TRACKING_ID` in `index.html`

### 8.3 Submit Sitemap

1. In Google Search Console
2. Go to **Sitemaps**
3. Submit: `https://kaamkhojo.com/sitemap.xml`

## 🚀 Step 9: Performance Optimization

### 9.1 Enable Hostinger Optimizations

In Hostinger control panel:
- **Performance** → **Website Acceleration**
- Enable **LiteSpeed Cache** if available
- Enable **Cloudflare** integration

### 9.2 Image Optimization

- Ensure all images are optimized
- Use WebP format where possible
- Implement lazy loading (already included in the project)

## 🧪 Step 10: Testing and Verification

### 10.1 Basic Functionality Test

1. **Visit your website**: `https://kaamkhojo.com`
2. **Test all pages**:
   - Home page loads correctly
   - Navigation works
   - Job search functions
   - Service marketplace
   - Freelance platform
   - Learning section
   - Professional connect
   - News section
   - Login/registration

3. **Test responsive design**:
   - Mobile devices
   - Tablets
   - Desktop

### 10.2 Performance Testing

Use these tools to test performance:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

### 10.3 SEO Testing

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- Check meta tags and structured data
- Verify sitemap accessibility
- Test robots.txt: `https://kaamkhojo.com/robots.txt`

## 🔧 Step 11: Troubleshooting Common Issues

### Issue 1: 404 Errors on Page Refresh

**Problem**: React Router pages show 404 when accessed directly or refreshed.

**Solution**: Ensure `.htaccess` file has SPA routing rules (included in Step 4.1).

### Issue 2: CSS/JS Files Not Loading

**Problem**: Assets return 404 errors.

**Solution**: 
- Check file paths in `index.html`
- Ensure all files from `dist/assets/` are uploaded
- Verify file permissions (644 for files)

### Issue 3: SSL Certificate Issues

**Problem**: Mixed content warnings or SSL not working.

**Solution**:
- Wait for SSL activation (up to 24 hours)
- Clear browser cache
- Check HTTPS redirect in `.htaccess`

### Issue 4: Slow Loading Times

**Problem**: Website loads slowly.

**Solution**:
- Enable GZIP compression (in `.htaccess`)
- Optimize images
- Enable Hostinger caching features
- Use Cloudflare if available

### Issue 5: Email Not Working

**Problem**: Contact forms or email features not working.

**Solution**:
- Verify email accounts are created
- Check SMTP settings
- Test email functionality
- Consider using third-party email services

## 📊 Step 12: Monitoring and Maintenance

### 12.1 Set Up Monitoring

1. **Google Analytics**: Monitor traffic and user behavior
2. **Google Search Console**: Track search performance
3. **Uptime Monitoring**: Use services like UptimeRobot
4. **Error Tracking**: Monitor JavaScript errors

### 12.2 Regular Maintenance

- **Weekly**: Check website functionality
- **Monthly**: Review analytics and performance
- **Quarterly**: Update content and check for broken links
- **Annually**: Review hosting plan and upgrade if needed

### 12.3 Backup Strategy

1. **Hostinger Backups**: Enable automatic backups in control panel
2. **Manual Backups**: Download files periodically
3. **Version Control**: Keep source code in Git repository

## 🎯 Step 13: Going Live Checklist

Before announcing your website:

- [ ] All pages load correctly
- [ ] Forms work properly
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Google Analytics tracking
- [ ] Search Console verified
- [ ] Sitemap submitted
- [ ] Social media links work
- [ ] Contact information accurate
- [ ] Legal pages (Privacy Policy, Terms) added
- [ ] Performance optimized
- [ ] Cross-browser testing completed

## 🚀 Step 14: Post-Launch Activities

### 14.1 SEO Optimization

1. **Content Marketing**: Start publishing employment news regularly
2. **Local SEO**: Optimize for Indian cities and regions
3. **Link Building**: Reach out to relevant websites
4. **Social Media**: Create and maintain social profiles

### 14.2 User Acquisition

1. **Job Posting**: Start adding real job listings
2. **Service Providers**: Onboard local service providers
3. **Freelancers**: Attract freelancers to the platform
4. **Marketing**: Launch digital marketing campaigns

### 14.3 Feature Enhancement

1. **User Feedback**: Collect and implement user suggestions
2. **A/B Testing**: Test different layouts and features
3. **Mobile App**: Consider developing mobile applications
4. **API Development**: Build APIs for third-party integrations

## 📞 Support and Resources

### Hostinger Support
- **Live Chat**: Available 24/7 in Hostinger panel
- **Knowledge Base**: [Hostinger Help Center](https://support.hostinger.com/)
- **Community**: Hostinger Community Forum

### Technical Resources
- **React Documentation**: [reactjs.org](https://reactjs.org/)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)

### SEO Resources
- **Google Search Central**: [developers.google.com/search](https://developers.google.com/search)
- **Schema.org**: [schema.org](https://schema.org/)
- **Web.dev**: [web.dev](https://web.dev/)

## 🎉 Congratulations!

Your KaamKhojo.com job portal is now live on Hostinger! 

Remember to:
- Monitor performance regularly
- Keep content updated
- Engage with users
- Continuously improve the platform

For any technical issues or questions, refer to this documentation or contact support.

---

**Happy Deploying! 🚀**