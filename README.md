# Swag Labs Functional Testing Project

This repository contains a functional test automation project for the [Swag Labs](https://www.saucedemo.com/) demo online shop.

The objective of this project is to verify that the core workflows of the web application (authentication, menu navigation, product search and details, shopping cart, and checkout) function without unexpected issues using both positive and negative inputs.

## 👥 Team Members

* Katriina Chindjapin
* Kasperi Helin
* Jiro Pärnänen

## 📁 Project Structure

The project is implemented in parallel using two different automation tools, each organized into its own dedicated folder:

```
Swag_Labs_Functional_Testing_Project/
├── robot-framework/        # Test automation implemented with Robot Framework & Browser library
│   ├── tests/              # Test suite files (.robot)
│   ├── resources/          # Custom keywords and variables
├── playwright/             # Test automation implemented with native Playwright
│   ├── tests/              # Playwright test scripts
│   ├── package.json        # Node.js dependencies (or requirements.txt if Python)
│   └── playwright.config.ts
└── README.md               # Project documentation
```

## ⚙️ How the Application Works

The System Under Test (SUT) is **Swag Labs** (`https://www.saucedemo.com/`), a demo e-commerce web application designed specifically for practicing software test automation.

Key features of the application:

1. **Authentication:** Users log in using predefined test accounts.
2. **Product Browsing and Sorting:** After logging in, users are presented with a product catalog that can be sorted by name (A–Z, Z–A) or price (low to high, high to low).
3. **Product Details:** Clicking on a product opens its detail view, displaying the product name, description, price, and an option to add the item to the shopping cart.
4. **Shopping Cart and Checkout:** Users can add and remove items from the cart. During checkout, users enter customer information (first name, last name, postal code) and complete the order.

## 🚀 Getting Started & Running Tests

First, clone this repository to your local machine:

```bash
git clone https://github.com/ParnanenJ/Swag_Labs_Functional_Testing_Project.git
cd Swag_Labs_Functional_Testing_Project
```

### Option 1: Robot Framework (Browser Library)

The Robot Framework Browser library is powered by Playwright under the hood, meaning it requires both Python and Node.js.

**Prerequisites:**
* Python (3.8 or higher)
* Node.js (LTS version)

**Installation and Execution:**

1. Navigate to the Robot Framework directory:
   ```bash
   cd Swag_Labs_Functional_Testing_Project/Robot-Framework
   ```

2. Install the required packages and initialize the Browser library:
   ```bash
   pip install robotframework robotframework-browser
   rfbrowser init
   ```

3. Run the tests:
   ```bash
   robot -d results tests/
   ```
   Test execution reports (`report.html` and `log.html`) will be generated inside the `results` directory.

### Option 2: Playwright

*(Note: The instructions below assume a TypeScript/JavaScript setup. If you are using Python Playwright, install dependencies via `pip install pytest-playwright` and `playwright install`.)*

**Prerequisites:**
* Node.js (LTS version)

**Installation and Execution:**

1. Navigate to the Playwright directory:
   ```bash
   cd playwright
   ```

2. Install dependencies and Playwright browsers:
   ```bash
   npm install
   npx playwright install
   ```

3. Run the tests:
   ```bash
   # Run all tests in headless mode:
   npx playwright test

   # Run tests in interactive UI mode:
   npx playwright test --ui
   ```

4. View the test report:
   ```bash
   npx playwright show-report
   ```

## 🧪 Test Scenarios (TS-01 – TS-12)

The project covers 12 test scenarios divided into three main categories. Test design techniques include Equivalence Partitioning, Boundary Value Analysis, and Positive/Negative Testing.

| ID | Category | Test Scenario | Description & Functionality Tested | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **TS-01** | Authentication and Menu | Login with valid credentials | Test logging in with valid test accounts (e.g., `standard_user`). | User is successfully redirected to the inventory page (`/inventory.html`). |
| **TS-02** | Authentication and Menu | Login with invalid credentials | Test logging in with an invalid username, incorrect password and empty fields. | Login is prevented and an appropriate error message is displayed. |
| **TS-03** | Authentication and Menu | Open menu | Click the hamburger menu icon in the top-left corner. | The side navigation menu opens and displays the navigation links. |
| **TS-04** | Authentication and Menu | Close menu | Click the close button (`X`) inside the open side menu. | The side navigation menu closes and is hidden from view. |
| **TS-05** | Authentication and Menu | Logout via menu | Open the side menu and click the "Logout" link. | User is logged out and redirected back to the login page. |
| **TS-06** | Product Search and Details | Sort products by price | Select *Price (low to high)* and *Price (high to low)* from the sorting dropdown. | Products are sorted on the page in the correct price order. |
| **TS-07** | Product Search and Details | Sort products by name | Select *Name (A to Z)* and *Name (Z to A)* from the sorting dropdown. | Products are sorted on the page in the correct alphabetical order. |
| **TS-08** | Product Search and Details | Open product details | Click on an individual product's name or image on the inventory page. | The product detail page opens, displaying the name, description, price, and "Add to cart" button. |
| **TS-09** | Shopping Cart and Checkout | Add product to cart | Click the "Add to cart" button on the inventory page or product detail page. | The product is added to the cart and the shopping cart badge counter updates. |
| **TS-10** | Shopping Cart and Checkout | Remove product from cart | Click the "Remove" button on the product page or inside the shopping cart view. | The product is removed from the cart and the cart badge counter updates accordingly. |
| **TS-11** | Shopping Cart and Checkout | Checkout with valid information | Navigate from the cart to checkout, enter valid customer details (first name, last name, postal code), and complete the order. | The order succeeds and a confirmation message (*Thank you for your order!*) is displayed. |
| **TS-12** | Shopping Cart and Checkout | Checkout with invalid information | Attempt to proceed through checkout while leaving required fields (first name, last name, or postal code) empty. | Checkout progression is blocked and an error message indicating the missing field is displayed. |

## 🚫 Out-of-Scope Items

The following items are **excluded** from the scope of this testing project:

* User settings
* External links in the menu (e.g., social media links, About page)
* Security testing
* Internal database testing
* Real payment transactions