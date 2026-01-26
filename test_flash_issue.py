"""
Test script to identify flashing/flickering issues during page transitions
"""
from playwright.sync_api import sync_playwright
import time

def test_page_transitions():
    """Test for visual flickering during page transitions and refreshes"""

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)  # Run with visible browser to see flashing
        context = browser.new_context(
            viewport={'width': 375, 'height': 667},  # iPhone SE size
            device_scale_factor=2
        )
        page = context.new_page()

        # Enable console logging to catch any errors
        console_messages = []
        page.on('console', lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))

        print("1. Loading initial page...")
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')

        # Take screenshot of start page
        page.screenshot(path='/tmp/start_page.png')
        print("   ✓ Start page loaded")

        # Wait a moment to observe
        time.sleep(1)

        print("\n2. Testing page transition (Start → Question)...")
        # Click start button
        start_button = page.locator('button:has-text("테스트 시작하기")')
        start_button.wait_for(state='visible')

        # Record network activity during transition
        page.on('response', lambda response: print(f"   Network: {response.url} [{response.status}]"))

        start_button.click()
        page.wait_for_load_state('networkidle')

        # Take screenshot after transition
        page.screenshot(path='/tmp/question_page.png')
        print("   ✓ Question page loaded")

        # Wait to observe flashing
        time.sleep(1)

        print("\n3. Testing page refresh...")
        page.reload()
        page.wait_for_load_state('networkidle')
        page.screenshot(path='/tmp/after_refresh.png')
        print("   ✓ Page refreshed")

        time.sleep(1)

        print("\n4. Testing rapid transitions...")
        # Go back to start
        page.goto('http://localhost:5173')
        page.wait_for_load_state('networkidle')

        # Click through multiple times quickly
        for i in range(3):
            print(f"   Transition {i+1}...")
            start_button = page.locator('button:has-text("테스트 시작하기")')
            start_button.wait_for(state='visible')
            start_button.click()
            time.sleep(0.5)  # Short delay to observe flashing

            # Click an option
            option_button = page.locator('button').nth(0)
            option_button.wait_for(state='visible')
            option_button.click()
            time.sleep(0.5)

        print("\n5. Console messages:")
        for msg in console_messages:
            print(f"   {msg}")

        print("\n✓ Test complete. Check screenshots in /tmp/")
        print("  - start_page.png")
        print("  - question_page.png")
        print("  - after_refresh.png")

        # Keep browser open for manual inspection
        input("\nPress Enter to close browser...")

        browser.close()

if __name__ == '__main__':
    test_page_transitions()
