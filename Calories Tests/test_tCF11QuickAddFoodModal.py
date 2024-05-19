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

class TestTCF11QuickAddFoodModal():
  def setup_method(self, method):
    self.driver = webdriver.Firefox()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_tCF11QuickAddFoodModal(self):
    self.driver.get("http://localhost:3000/")
    self.driver.set_window_size(1423, 732)
    self.driver.find_element(By.ID, "login-register-button").click()
    self.driver.find_element(By.ID, "email").click()
    self.driver.find_element(By.ID, "email").send_keys("baselchaudry@gmail.com")
    self.driver.find_element(By.ID, "password").send_keys("password")
    self.driver.find_element(By.ID, "sign-in-button").click()
    self.driver.find_element(By.CSS_SELECTOR, ".col:nth-child(1) .card-img-top").click()
    self.driver.find_element(By.CSS_SELECTOR, ".actions > .btn:nth-child(2)").click()
    self.driver.find_element(By.CSS_SELECTOR, ".btn-danger:nth-child(2)").click()
  
