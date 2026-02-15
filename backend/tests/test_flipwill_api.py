"""
FlipWill Tarot API Tests
Tests for deck configuration, card drawing, and clarifier features
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test decks endpoint - verifying Original has 78, Anime has 49 cards
class TestDeckConfiguration:
    """Tests for deck configuration and card counts"""
    
    def test_get_decks_endpoint(self):
        """Verify /api/decks returns all deck options"""
        response = requests.get(f"{BASE_URL}/api/decks")
        assert response.status_code == 200
        decks = response.json()
        
        # Should have 5 deck options
        assert len(decks) == 5
        
        deck_ids = [d['id'] for d in decks]
        assert 'original' in deck_ids
        assert 'anime' in deck_ids
        print("✅ /api/decks returns 5 decks with original and anime")
    
    def test_original_deck_has_78_cards(self):
        """Verify Original deck has 78 cards"""
        response = requests.get(f"{BASE_URL}/api/decks")
        assert response.status_code == 200
        decks = response.json()
        
        original_deck = next((d for d in decks if d['id'] == 'original'), None)
        assert original_deck is not None
        assert original_deck['card_count'] == 78
        assert original_deck['available'] == True
        print("✅ Original deck has 78 cards and is available")
    
    def test_anime_deck_has_49_cards(self):
        """Verify Anime deck has 49 cards (fixed bug)"""
        response = requests.get(f"{BASE_URL}/api/decks")
        assert response.status_code == 200
        decks = response.json()
        
        anime_deck = next((d for d in decks if d['id'] == 'anime'), None)
        assert anime_deck is not None
        assert anime_deck['card_count'] == 49, f"Expected 49 cards for Anime deck, got {anime_deck['card_count']}"
        assert anime_deck['available'] == True
        print("✅ Anime deck has 49 cards and is available")
    
    def test_unavailable_decks(self):
        """Verify alchemy, midnight, ethereal are unavailable"""
        response = requests.get(f"{BASE_URL}/api/decks")
        assert response.status_code == 200
        decks = response.json()
        
        for deck_id in ['alchemy', 'midnight', 'ethereal']:
            deck = next((d for d in decks if d['id'] == deck_id), None)
            assert deck is not None
            assert deck['available'] == False
            assert deck['card_count'] == 0
        print("✅ Alchemy, midnight, ethereal decks are unavailable with 0 cards")


# Test cards endpoint
class TestCardsEndpoint:
    """Tests for /api/cards endpoint"""
    
    def test_get_cards_default(self):
        """Verify /api/cards returns all 78 cards"""
        response = requests.get(f"{BASE_URL}/api/cards")
        assert response.status_code == 200
        cards = response.json()
        
        assert len(cards) == 78
        print("✅ /api/cards returns 78 cards")
    
    def test_get_cards_original_deck(self):
        """Verify /api/cards?deck=original returns cards with image URLs"""
        response = requests.get(f"{BASE_URL}/api/cards?deck=original")
        assert response.status_code == 200
        cards = response.json()
        
        assert len(cards) == 78
        # All cards should have image URLs for original deck
        cards_with_images = [c for c in cards if c.get('image_url')]
        assert len(cards_with_images) == 78, f"Expected 78 cards with images, got {len(cards_with_images)}"
        print("✅ /api/cards?deck=original returns 78 cards with images")
    
    def test_get_cards_anime_deck(self):
        """Verify /api/cards?deck=anime returns cards with appropriate image URLs"""
        response = requests.get(f"{BASE_URL}/api/cards?deck=anime")
        assert response.status_code == 200
        cards = response.json()
        
        # API returns all 78 cards, but only 49 should have image_url
        assert len(cards) == 78  # All cards returned
        cards_with_images = [c for c in cards if c.get('image_url')]
        assert len(cards_with_images) == 49, f"Expected 49 cards with anime images, got {len(cards_with_images)}"
        print(f"✅ /api/cards?deck=anime returns 78 cards, {len(cards_with_images)} with images")
    
    def test_get_single_card(self):
        """Verify /api/cards/{card_id} returns card details"""
        response = requests.get(f"{BASE_URL}/api/cards/m00")  # The Fool
        assert response.status_code == 200
        card = response.json()
        
        assert card['id'] == 'm00'
        assert card['name'] == 'The Fool'
        assert card['arcana'] == 'major'
        assert 'keywords' in card
        assert 'upright_meaning' in card
        print("✅ /api/cards/m00 returns The Fool card details")
    
    def test_get_invalid_card(self):
        """Verify /api/cards/{invalid_id} returns 404"""
        response = requests.get(f"{BASE_URL}/api/cards/invalid123")
        assert response.status_code == 404
        print("✅ /api/cards/invalid123 returns 404")


# Test draw endpoint - critical fix was POST vs GET
class TestDrawEndpoint:
    """Tests for /api/draw endpoint (POST request)"""
    
    def test_draw_single_card(self):
        """Verify POST /api/draw with count=1 returns 1 card"""
        response = requests.post(f"{BASE_URL}/api/draw", json={"count": 1})
        assert response.status_code == 200
        cards = response.json()
        
        assert len(cards) == 1
        assert 'card' in cards[0]
        assert 'position' in cards[0]
        assert 'reversed' in cards[0]
        print("✅ POST /api/draw count=1 returns 1 card")
    
    def test_draw_three_cards(self):
        """Verify POST /api/draw with count=3, three-card spread"""
        response = requests.post(f"{BASE_URL}/api/draw", json={
            "count": 3,
            "spread_type": "three-card"
        })
        assert response.status_code == 200
        cards = response.json()
        
        assert len(cards) == 3
        positions = [c['position'] for c in cards]
        assert positions == ['Past', 'Present', 'Future']
        print("✅ POST /api/draw three-card spread returns Past, Present, Future")
    
    def test_draw_invalid_count(self):
        """Verify draw with invalid count returns 400"""
        response = requests.post(f"{BASE_URL}/api/draw", json={"count": 0})
        assert response.status_code == 400
        
        response = requests.post(f"{BASE_URL}/api/draw", json={"count": 11})
        assert response.status_code == 400
        print("✅ POST /api/draw with invalid count returns 400")
    
    def test_draw_method_is_post(self):
        """Verify draw endpoint requires POST method (fixed bug)"""
        # GET should not work
        response = requests.get(f"{BASE_URL}/api/draw")
        assert response.status_code == 405 or response.status_code == 422
        print("✅ GET /api/draw returns error (POST required)")


# Test interpret endpoint
class TestInterpretEndpoint:
    """Tests for /api/interpret endpoint"""
    
    def test_interpret_three_cards(self):
        """Verify /api/interpret generates interpretation for 3 cards"""
        # First draw cards
        draw_response = requests.post(f"{BASE_URL}/api/draw", json={
            "count": 3,
            "spread_type": "three-card"
        })
        assert draw_response.status_code == 200
        drawn_cards = draw_response.json()
        
        # Then interpret
        response = requests.post(f"{BASE_URL}/api/interpret", json={
            "cards": drawn_cards,
            "question": "TEST_What should I focus on?",
            "spread_type": "three-card"
        })
        assert response.status_code == 200
        data = response.json()
        
        assert 'interpretation' in data
        assert len(data['interpretation']) > 100  # Should be substantial text
        assert 'card_metadata' in data
        assert len(data['card_metadata']) == 3
        print("✅ POST /api/interpret returns interpretation and card_metadata")
    
    def test_interpret_card_metadata(self):
        """Verify card metadata includes lens_keyword and decision_prompts"""
        draw_response = requests.post(f"{BASE_URL}/api/draw", json={"count": 1})
        drawn_cards = draw_response.json()
        
        response = requests.post(f"{BASE_URL}/api/interpret", json={
            "cards": drawn_cards,
            "question": "TEST_Quick test"
        })
        assert response.status_code == 200
        data = response.json()
        
        metadata = data['card_metadata'][0]
        assert 'card_id' in metadata
        assert 'lens_keyword' in metadata
        assert 'core_dynamic' in metadata
        assert 'decision_prompts' in metadata
        print("✅ Card metadata includes lens_keyword, core_dynamic, decision_prompts")


# Test clarifier endpoint - critical fix was POST vs GET in frontend
class TestClarifierEndpoint:
    """Tests for /api/clarifier-interpret endpoint"""
    
    def test_clarifier_interpret(self):
        """Verify /api/clarifier-interpret generates clarifier interpretation"""
        # Setup: draw original cards
        draw_response = requests.post(f"{BASE_URL}/api/draw", json={
            "count": 3,
            "spread_type": "three-card"
        })
        original_cards = draw_response.json()
        
        # Draw clarifier card
        clarifier_response = requests.post(f"{BASE_URL}/api/draw", json={"count": 1})
        clarifier_card = clarifier_response.json()[0]
        
        # Get clarifier interpretation
        response = requests.post(f"{BASE_URL}/api/clarifier-interpret", json={
            "original_question": "TEST_What should I focus on?",
            "original_cards": original_cards,
            "clarifier_focus": "blind_spot",
            "clarifier_focus_label": "What am I not seeing clearly?",
            "clarifier_card": clarifier_card['card']
        })
        assert response.status_code == 200
        data = response.json()
        
        assert 'interpretation' in data
        assert len(data['interpretation']) > 50
        print("✅ POST /api/clarifier-interpret returns interpretation")
    
    def test_clarifier_with_all_focus_types(self):
        """Verify clarifier works with all focus options"""
        draw_response = requests.post(f"{BASE_URL}/api/draw", json={"count": 1})
        original_cards = draw_response.json()
        
        clarifier_response = requests.post(f"{BASE_URL}/api/draw", json={"count": 1})
        clarifier_card = clarifier_response.json()[0]
        
        focus_types = [
            ("influence", "What is influencing this situation?"),
            ("blind_spot", "What am I not seeing clearly?"),
            ("action", "What should I do next?"),
            ("outcome", "What outcome is most likely?")
        ]
        
        for focus_id, focus_label in focus_types:
            response = requests.post(f"{BASE_URL}/api/clarifier-interpret", json={
                "original_question": "TEST_General question",
                "original_cards": original_cards,
                "clarifier_focus": focus_id,
                "clarifier_focus_label": focus_label,
                "clarifier_card": clarifier_card['card']
            })
            assert response.status_code == 200
            print(f"  ✅ Clarifier focus '{focus_id}' works")
        
        print("✅ All clarifier focus types work correctly")


# Test readings/history endpoint
class TestReadingsEndpoint:
    """Tests for /api/readings endpoint"""
    
    def test_get_readings(self):
        """Verify GET /api/readings returns list"""
        response = requests.get(f"{BASE_URL}/api/readings")
        assert response.status_code == 200
        readings = response.json()
        
        assert isinstance(readings, list)
        print(f"✅ GET /api/readings returns {len(readings)} readings")
    
    def test_save_reading(self):
        """Verify POST /api/readings saves a reading"""
        import uuid
        from datetime import datetime
        
        reading = {
            "id": str(uuid.uuid4()),
            "cards": [{"card": {"id": "m00", "name": "The Fool"}, "position": "Past", "reversed": False}],
            "question": "TEST_Should I proceed?",
            "spread_type": "three-card",
            "interpretation": "TEST reading interpretation",
            "timestamp": datetime.now().isoformat()
        }
        
        response = requests.post(f"{BASE_URL}/api/readings", json=reading)
        assert response.status_code == 200
        data = response.json()
        
        assert data['id'] == reading['id']
        print("✅ POST /api/readings saves reading successfully")


# Test daily card endpoint
class TestDailyCardEndpoint:
    """Tests for /api/daily-card and /api/personal-daily-card endpoints"""
    
    def test_daily_card(self):
        """Verify GET /api/daily-card returns daily card"""
        response = requests.get(f"{BASE_URL}/api/daily-card")
        assert response.status_code == 200
        data = response.json()
        
        assert 'date' in data
        assert 'card' in data
        assert 'interpretation' in data
        assert 'name' in data['card']
        print("✅ GET /api/daily-card returns card with interpretation")
    
    def test_personal_daily_card(self):
        """Verify GET /api/personal-daily-card returns unique card"""
        response = requests.get(f"{BASE_URL}/api/personal-daily-card")
        assert response.status_code == 200
        data = response.json()
        
        assert 'card' in data
        assert 'interpretation' in data
        assert 'lens_keyword' in data
        print("✅ GET /api/personal-daily-card returns card with lens_keyword")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
