# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

class TestTCF4ViewDateChange():
  def setup_method(self, method):
    self.driver = webdriver.Firefox()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_tCF4ViewDateChange(self):
    self.driver.get("http://localhost:3000/")
    self.driver.set_window_size(1423, 732)
    self.driver.find_element(By.ID, "login-register-button").click()
    element = self.driver.find_element(By.ID, "login-register-button")
    actions = ActionChains(self.driver)
    actions.move_to_element(element).perform()
    element = self.driver.find_element(By.CSS_SELECTOR, "body")
    actions = ActionChains(self.driver)
    actions.move_to_element(element, 0, 0).perform()
    self.driver.find_element(By.ID, "email").click()
    self.driver.find_element(By.ID, "email").send_keys("baselchaudry@gmail.com")
    self.driver.find_element(By.ID, "password").send_keys("password")
    self.driver.find_element(By.ID, "sign-in-button").click()
    self.driver.find_element(By.CSS_SELECTOR, ".col:nth-child(1) .card-img-top").click()
    self.driver.find_element(By.CSS_SELECTOR, ".form-control").click()
    self.driver.find_element(By.CSS_SELECTOR, ".form-control").send_keys("2024-05-01")
    self.driver.close()
  
