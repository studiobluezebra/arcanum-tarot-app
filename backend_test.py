import requests
import sys
import json
from datetime import datetime

class TarotAPITester:
    def __init__(self, base_url="https://flipwill-tarot.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                
                # Try to parse JSON response
                try:
                    response_data = response.json()
                    if isinstance(response_data, list):
                        print(f"Response: List with {len(response_data)} items")
                        if len(response_data) > 0:
                            print(f"First item keys: {list(response_data[0].keys()) if isinstance(response_data[0], dict) else 'Not a dict'}")
                    elif isinstance(response_data, dict):
                        print(f"Response keys: {list(response_data.keys())}")
                    else:
                        print(f"Response type: {type(response_data)}")
                except:
                    print("Response: Not JSON or parsing failed")
                    print(f"Raw response: {response.text[:200]}...")
                    
                return True, response_data if 'response_data' in locals() else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:500]}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_get_all_cards(self):
        """Test getting all 78 tarot cards"""
        success, response = self.run_test(
            "Get All Cards",
            "GET",
            "cards",
            200
        )
        if success and isinstance(response, list):
            print(f"Found {len(response)} cards")
            return len(response) == 78
        return False

    def test_get_single_card(self):
        """Test getting a single card by ID"""
        success, response = self.run_test(
            "Get Single Card (The Fool)",
            "GET",
            "cards/0",
            200
        )
        if success and isinstance(response, dict):
            return response.get('name') == 'The Fool'
        return False

    def test_draw_single_card(self):
        """Test drawing a single card"""
        success, response = self.run_test(
            "Draw Single Card",
            "POST",
            "draw",
            200,
            data={"count": 1}
        )
        if success and isinstance(response, list) and len(response) == 1:
            card = response[0]
            return 'card' in card and 'reversed' in card
        return False

    def test_draw_three_card_spread(self):
        """Test drawing three card spread"""
        success, response = self.run_test(
            "Draw Three Card Spread",
            "POST",
            "draw",
            200,
            data={"count": 3, "spread_type": "three-card"}
        )
        if success and isinstance(response, list) and len(response) == 3:
            # Check if positions are assigned correctly
            positions = [card.get('position') for card in response]
            expected_positions = ['Past', 'Present', 'Future']
            return all(pos in expected_positions for pos in positions)
        return False

    def test_interpret_reading(self):
        """Test AI interpretation of a reading"""
        # First draw a card
        draw_success, draw_response = self.run_test(
            "Draw Card for Interpretation",
            "POST", 
            "draw",
            200,
            data={"count": 1}
        )
        
        if not draw_success:
            return False
            
        # Now test interpretation
        interpret_data = {
            "cards": draw_response,
            "question": "What should I focus on today?",
            "spread_type": "single-card"
        }
        
        success, response = self.run_test(
            "Get AI Interpretation",
            "POST",
            "interpret", 
            200,
            data=interpret_data
        )
        
        if success and isinstance(response, dict):
            return 'interpretation' in response and len(response['interpretation']) > 50
        return False

    def test_daily_card(self):
        """Test daily card endpoint"""
        success, response = self.run_test(
            "Get Daily Card",
            "GET",
            "daily-card",
            200
        )
        if success and isinstance(response, dict):
            return 'date' in response and 'card' in response and 'interpretation' in response
        return False

    def test_save_reading(self):
        """Test saving a reading"""
        reading_data = {
            "id": "test-reading-123",
            "cards": [
                {
                    "card": {
                        "id": "0",
                        "name": "The Fool",
                        "arcana": "major",
                        "suit": None,
                        "number": 0,
                        "keywords": ["new beginnings"],
                        "upright_meaning": "New beginnings",
                        "reversed_meaning": "Recklessness"
                    },
                    "reversed": False,
                    "position": None
                }
            ],
            "question": "Test question",
            "spread_type": "single-card",
            "interpretation": "Test interpretation",
            "timestamp": datetime.utcnow().isoformat()
        }
        
        success, response = self.run_test(
            "Save Reading",
            "POST",
            "readings",
            200,
            data=reading_data
        )
        return success and isinstance(response, dict)

    def test_get_readings(self):
        """Test getting reading history"""
        success, response = self.run_test(
            "Get Reading History",
            "GET",
            "readings",
            200
        )
        return success and isinstance(response, list)

def main():
    print("🔮 Starting Tarot Reading API Tests")
    print("=" * 50)
    
    tester = TarotAPITester()
    
    # Run all tests
    results = {}
    results['cards'] = tester.test_get_all_cards()
    results['single_card'] = tester.test_get_single_card()
    results['draw_single'] = tester.test_draw_single_card()
    results['draw_three'] = tester.test_draw_three_card_spread()
    results['daily_card'] = tester.test_daily_card()
    results['save_reading'] = tester.test_save_reading()
    results['get_readings'] = tester.test_get_readings()
    
    # AI interpretation test (might be slow due to LLM)
    print("\n⚠️  Testing AI interpretation (this may take 10-30 seconds)...")
    results['interpret'] = tester.test_interpret_reading()

    # Print results
    print(f"\n📊 Test Results")
    print("=" * 50)
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:20} {status}")
    
    print(f"\nTests passed: {tester.tests_passed}/{tester.tests_run}")
    
    # Identify critical failures
    critical_tests = ['cards', 'single_card', 'draw_single', 'daily_card']
    critical_failures = [test for test in critical_tests if not results[test]]
    
    if critical_failures:
        print(f"\n🚨 CRITICAL FAILURES: {critical_failures}")
        return 1
    elif results['interpret'] == False:
        print(f"\n⚠️  AI interpretation failed - check LLM integration")
    else:
        print(f"\n🎉 All critical backend functionality working!")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())