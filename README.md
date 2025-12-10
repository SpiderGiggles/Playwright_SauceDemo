Project Title: Playwright Automation for SauceDemo
This repository contains an automated test suite for SauceDemo, a sample e-commerce website. The framework is built using Playwright with TypeScript and follows the Page Object Model (POM) design pattern to ensure scalability and maintainability.
Key Features
Page Object Model (POM): Structured code with separate page objects (page-objects/) and components (page-components/) for better organization.
Reusable Steps: Common actions like authentication are modularized in reusable-steps/.
End-to-End Scenarios: Covers critical user flows including:
User Login (Standard & Locked-out users).
Product Browsing & Sorting.
Cart Management & Checkout Process.
Navigation & Social Media Links verification.
Cross-Browser Testing: Configured to run on Chromium, Firefox, and WebKit (playwright.config.ts).
Parallel Execution: Tests utilize Playwright's parallel execution capabilities for faster feedback.
