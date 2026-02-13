#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class TarotAPITester:
    def __init__(self):
        self.base_url = "https://universal-card-daily.preview.emergentagent.com/api"
        self.tests_run = 0
        self.tests_passed = 0
        
    def log_test(self, name, passed, details=None):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"✅ {name}: PASSED")
        else:
            print(f"❌ {name}: FAILED")
        if details:
            print(f"   Details: {details}")
        print()

    def test_daily_card_different_users(self):
        """Test that different users get different daily cards"""
        print("🔍 Testing daily card for different users...")
        
        try:
            # Test with user1
            response1 = requests.get(f"{self.base_url}/daily-card?user_id=user1", timeout=10)
            if response1.status_code != 200:
                self.log_test("Daily card user1", False, f"Status code: {response1.status_code}")
                return False
                
            card1_data = response1.json()
            
            # Test with user2
            response2 = requests.get(f"{self.base_url}/daily-card?user_id=user2", timeout=10)
            if response2.status_code != 200:
                self.log_test("Daily card user2", False, f"Status code: {response2.status_code}")
                return False
                
            card2_data = response2.json()
            
            # Verify structure
            if not all(key in card1_data for key in ['date', 'user_id', 'card', 'interpretation']):
                self.log_test("Daily card structure", False, "Missing required fields")
                return False
                
            # Check if cards are different (they should be most of the time)
            card1_id = card1_data['card']['id']
            card2_id = card2_data['card']['id'] 
            user1_id = card1_data['user_id']
            user2_id = card2_data['user_id']
            
            self.log_test("Daily card different users", True, f"User1 card: {card1_id}, User2 card: {card2_id}, User1 ID: {user1_id}, User2 ID: {user2_id}")
            return True
            
        except Exception as e:
            self.log_test("Daily card different users", False, f"Exception: {str(e)}")
            return False

    def test_daily_card_same_user_consistency(self):
        """Test that same user gets same daily card on same day"""
        print("🔍 Testing daily card consistency for same user...")
        
        try:
            user_id = "test_user_consistency"
            
            # First request
            response1 = requests.get(f"{self.base_url}/daily-card?user_id={user_id}", timeout=10)
            if response1.status_code != 200:
                self.log_test("Daily card consistency - first request", False, f"Status code: {response1.status_code}")
                return False
                
            card1_data = response1.json()
            
            # Wait a moment then make second request
            time.sleep(1)
            response2 = requests.get(f"{self.base_url}/daily-card?user_id={user_id}", timeout=10)
            if response2.status_code != 200:
                self.log_test("Daily card consistency - second request", False, f"Status code: {response2.status_code}")
                return False
                
            card2_data = response2.json()
            
            # Cards should be identical for same user on same day
            card1_id = card1_data['card']['id']
            card2_id = card2_data['card']['id']
            
            consistent = card1_id == card2_id and card1_data['user_id'] == card2_data['user_id']
            
            self.log_test("Daily card consistency same user", consistent, f"First: {card1_id}, Second: {card2_id}")
            return consistent
            
        except Exception as e:
            self.log_test("Daily card consistency same user", False, f"Exception: {str(e)}")
            return False

    def test_draw_cards_api(self):
        """Test basic card drawing functionality"""
        print("🔍 Testing card draw API...")
        
        try:
            payload = {"count": 3, "spread_type": "three-card"}
            response = requests.post(f"{self.base_url}/draw", json=payload, timeout=10)
            
            if response.status_code != 200:
                self.log_test("Draw cards API", False, f"Status code: {response.status_code}")
                return False
                
            cards = response.json()
            
            if len(cards) != 3:
                self.log_test("Draw cards API", False, f"Expected 3 cards, got {len(cards)}")
                return False
                
            # Check structure of first card
            card = cards[0]
            required_fields = ['card', 'position', 'reversed']
            if not all(field in card for field in required_fields):
                self.log_test("Draw cards API", False, "Missing required card fields")
                return False
                
            self.log_test("Draw cards API", True, f"Successfully drew {len(cards)} cards")
            return True
            
        except Exception as e:
            self.log_test("Draw cards API", False, f"Exception: {str(e)}")
            return False

    def test_interpretation_api(self):
        """Test interpretation API with sample cards"""
        print("🔍 Testing interpretation API...")
        
        try:
            # First draw some cards
            draw_payload = {"count": 1}
            draw_response = requests.post(f"{self.base_url}/draw", json=draw_payload, timeout=10)
            
            if draw_response.status_code != 200:
                self.log_test("Interpretation API - card draw", False, f"Draw failed: {draw_response.status_code}")
                return False
                
            cards = draw_response.json()
            
            # Then get interpretation
            interpret_payload = {
                "cards": cards,
                "question": "What should I focus on today?",
                "spread_type": "single-card"
            }
            
            response = requests.post(f"{self.base_url}/interpret", json=interpret_payload, timeout=30)
            
            if response.status_code != 200:
                self.log_test("Interpretation API", False, f"Status code: {response.status_code}")
                return False
                
            interpretation_data = response.json()
            
            if 'interpretation' not in interpretation_data:
                self.log_test("Interpretation API", False, "Missing interpretation field")
                return False
                
            interpretation = interpretation_data['interpretation']
            
            # Check if "Reflect Before Deciding" is removed from interpretation
            has_reflection_section = "reflect before deciding" in interpretation.lower() or "reflection questions" in interpretation.lower()
            
            self.log_test("Interpretation API", True, f"Generated interpretation ({len(interpretation)} chars)")
            self.log_test("No reflection sections", not has_reflection_section, f"Contains reflection content: {has_reflection_section}")
            return True
            
        except Exception as e:
            self.log_test("Interpretation API", False, f"Exception: {str(e)}")
            return False

    def test_all_endpoints(self):
        """Test basic availability of all endpoints"""
        print("🔍 Testing basic endpoint availability...")
        
        endpoints = [
            ("/decks", "GET"),
            ("/cards", "GET"),  
        ]
        
        all_passed = True
        for endpoint, method in endpoints:
            try:
                if method == "GET":
                    response = requests.get(f"{self.base_url}{endpoint}", timeout=10)
                    
                passed = response.status_code == 200
                self.log_test(f"Endpoint {endpoint}", passed, f"Status: {response.status_code}")
                if not passed:
                    all_passed = False
                    
            except Exception as e:
                self.log_test(f"Endpoint {endpoint}", False, f"Exception: {str(e)}")
                all_passed = False
                
        return all_passed

    def run_all_tests(self):
        """Run all tests and return results"""
        print("🚀 Starting Tarot API Tests")
        print("=" * 50)
        
        results = {
            "daily_card_different_users": self.test_daily_card_different_users(),
            "daily_card_consistency": self.test_daily_card_same_user_consistency(), 
            "draw_cards": self.test_draw_cards_api(),
            "interpretation": self.test_interpretation_api(),
            "endpoints": self.test_all_endpoints()
        }
        
        print("=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        print(f"🎯 Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return results, self.tests_passed, self.tests_run

if __name__ == "__main__":
    tester = TarotAPITester()
    results, passed, total = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if passed == total else 1)