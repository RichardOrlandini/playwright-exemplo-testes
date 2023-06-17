import { test, expect } from '@playwright/test';

test('webapp deve estar online', ({ page }) => {
    page.goto('http://localhost:3000');
    
})