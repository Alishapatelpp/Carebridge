Project Name: CareBridge

Tech Stack:
- React + Vite
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication

Current Modules Completed:

✅ Authentication
- Login
- Register
- JWT
- Role Based Access

✅ Pharmacy Module
- Dashboard
- Inventory Management
- Orders Page
- Prescriptions Page
- Revenue Page
- Profile Page

✅ Medicine Module
Medicine fields:
- name
- description
- manufacturer
- prescriptionRequired
- dosageInfo

CRUD completed.

✅ Pharmacy Inventory Module
Inventory fields:
- pharmacy
- medicine
- stock
- price
- expiryDate
- storageInstruction

CRUD completed.

✅ Inventory Features
- Add Medicine Modal
- Search Existing Medicine
- Create Medicine If Missing
- Create Inventory Entry
- View Details Modal
- Edit Inventory Modal
- Delete Inventory
- Manufacturer Column
- Dark Mode

✅ Search API Started

Goal:
Patient searches medicine name.

Example:

Azithromycin

Result should show:

- Pharmacies having medicine in stock
- Price
- Stock
- Distance
- Nearest Pharmacy First

Planned Features:

1. Pharmacy Location
Fields:
- address
- city
- pincode
- latitude
- longitude

2. Patient Search Medicine Page

3. Browser Geolocation

navigator.geolocation.getCurrentPosition()

4. Distance Calculation

Nearest pharmacy first.

5. Prescription Upload

6. Pharmacy Approval Workflow

7. Payment Gateway

8. Order Tracking

Current Task:
Implement nearest pharmacy finder using geolocation and medicine search.