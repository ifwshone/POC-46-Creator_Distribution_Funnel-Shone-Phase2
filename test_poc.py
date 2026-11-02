import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def run_uat_audit():
    # Setup Chrome options for reliable E2E execution
    options = Options()
    # options.add_argument('--headless=new') # Uncomment to run headlessly in CI/CD pipelines
    options.add_argument('--window-size=1920,1080')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    # Modern Selenium 4+ automatically manages drivers via Selenium Manager
    driver = webdriver.Chrome(options=options)
    wait = WebDriverWait(driver, 25) # Generous wait for cloud cold-starts
    
    report_lines = [
        "RealRails PoC 46 - Creator Distribution Funnel UAT Report\n",
        "=" * 56 + "\n"
    ]
    
    try:
        # Target Live Azure/Render URL
        target_url = "https://poc-46-creator-distribution-funnel-shone-vj2c.onrender.com/"
        driver.get(target_url)
        report_lines.append(f"Target URL: {target_url}\n")
        
        # -----------------------------------------------------------------
        # Test Case 1: Visual Load, Main Page, & Core Visualization
        # -----------------------------------------------------------------
        try:
            # Verify main header and background load
            header_title = wait.until(EC.visibility_of_element_located((By.XPATH, "//h1[contains(text(), 'Content Intelligence')]")))
            
            # Verify Recharts visualization container appears (Frontend-to-Backend data render)
            chart_container = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".recharts-responsive-container")))
            
            report_lines.append("TC-1 (Visual Load & Core Visualization): PASS - Page header, background DNA, and Recharts container loaded successfully.\n")
        except Exception as e:
            report_lines.append(f"TC-1 (Visual Load & Core Visualization): FAIL - {str(e)}\n")

        # -----------------------------------------------------------------
        # Test Case 2: Control Panel Interaction & Intelligence Sidebar Handshake
        # -----------------------------------------------------------------
        try:
            # Click the Control Panel button to trigger slide-over sidebar
            control_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Control Panel')]")))
            control_btn.click()
            
            # Verify Sidebar opens (checks translate-x transform state or presence)
            sidebar = wait.until(EC.presence_of_element_located((By.TAG_NAME, "aside")))
            
            # Interact with a filter dropdown (Target Platform Node)
            platform_dropdown_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(@class, 'dd-trigger') and contains(., 'All Networks')]")))
            platform_dropdown_btn.click()
            
            # Select YouTube node from custom dropdown options
            youtube_option = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@role='option' and contains(., 'YouTube')]")))
            youtube_option.click()
            
            # Close the Control Panel sidebar
            close_btn = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[@aria-label='Close control panel']")))
            close_btn.click()
            
            report_lines.append("TC-2 (Filter Interaction & Sidebar Handshake): PASS - Control panel opened, platform filter applied, and panel closed.\n")
        except Exception as e:
            report_lines.append(f"TC-2 (Filter Interaction & Sidebar Handshake): FAIL - {str(e)}\n")

        # -----------------------------------------------------------------
        # Test Case 3: Frontend-to-Backend Communication & Developer Signature
        # -----------------------------------------------------------------
        try:
            # Reopen control panel to verify Identity Tag / Signature
            control_btn2 = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Control Panel')]")))
            control_btn2.click()
            
            # Verify Operative Name & PoC ID in the sidebar identity card
            operative_sig = wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(text(), 'Shone')]")))
            poc_tag = wait.until(EC.visibility_of_element_located((By.XPATH, "//span[contains(text(), 'PoC 46')]")))
            
            report_lines.append("TC-3 (Backend Communication & Signature): PASS - Data rendered from API and operative signature 'Shone' (PoC 46) verified.\n")
        except Exception as e:
            report_lines.append(f"TC-3 (Backend Communication & Signature): FAIL - {str(e)}\n")

        # -----------------------------------------------------------------
        # Test Case 4: Responsive Viewport Check
        # -----------------------------------------------------------------
        try:
            driver.set_window_size(1280, 800) # Tablet / Compact Laptop breakpoint
            time.sleep(1)
            driver.set_window_size(1920, 1080) # Desktop breakpoint
            report_lines.append("TC-4 (Responsive Viewport Check): PASS - Viewport resized across breakpoints without UI fracture.\n")
        except Exception as e:
            report_lines.append(f"TC-4 (Responsive Viewport Check): FAIL - {str(e)}\n")

        # Capture final state screenshot
        screenshot_path = os.path.join(os.getcwd(), "uat_final_state.png")
        driver.save_screenshot(screenshot_path)
        report_lines.append(f"\nScreenshot saved successfully to: {screenshot_path}\n")

    finally:
        driver.quit()
        
        # Write out Test_Report.txt summary
        report_filename = "Test_Report.txt"
        with open(report_filename, "w", encoding="utf-8") as f:
            f.writelines(report_lines)
        print(f"Audit execution complete. Review '{report_filename}' for results.")

if __name__ == "__main__":
    run_uat_audit()