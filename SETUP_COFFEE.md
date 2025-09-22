# Support Page Setup Instructions (India-Friendly)

## Quick Setup

To complete the support feature setup, you need to update the payment details in the upgrade page:

### 1. Update UPI ID

In `app/(routes)/dashboard/upgrade/page.jsx`, find this line:
```javascript
const upiId = 'your-upi-id@paytm'; // Change this to your actual UPI ID
```

Replace `'your-upi-id@paytm'` with your actual UPI ID (e.g., `yourname@paytm`, `yourname@phonepe`, etc.).

### 2. Update Paytm Number

In the same file, find this line:
```javascript
const paytmNumber = '9876543210'; // Change this to your actual Paytm number
```

Replace `'9876543210'` with your actual Paytm registered mobile number.

### 3. Setup Razorpay (Optional)

For a complete payment solution, you can integrate Razorpay:
- Visit https://razorpay.com/ and create a business account
- Get your API keys and integrate the payment gateway
- Replace the alert in `handleRazorpay` function with actual Razorpay integration

### 4. Test the Integration

1. Navigate to `/dashboard/upgrade` in your app
2. Select an amount and click either button
3. Verify it opens the correct profile page

## Features Implemented

✅ **Mobile Hamburger Menu**
- Responsive navigation for mobile devices
- Smooth slide-in animation
- Backdrop overlay
- Body scroll prevention when open

✅ **Complete Support Page (India-Friendly)**
- Professional UI with Indian Rupee amounts
- Custom amount input
- Support for UPI, Razorpay, and Paytm
- Responsive design
- User personalization
- Clear call-to-actions

## Usage

The hamburger menu will automatically appear on mobile devices (screens smaller than 768px) and provide access to all navigation items that are available in the desktop sidebar.

The Support page includes:
- Quick select amounts (₹50, ₹100, ₹200, ₹500, ₹1000)
- Custom amount input in Indian Rupees
- Multiple payment options:
  - **UPI**: Direct payment via any UPI app
  - **Razorpay**: Cards, Net Banking, Wallets (integration needed)
  - **Paytm**: Direct Paytm transfer
- Personalized thank you message
- Additional ways to support section