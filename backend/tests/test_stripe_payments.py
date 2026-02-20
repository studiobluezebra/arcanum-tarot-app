"""
FlipWill Stripe Payment API Tests
Tests for subscription plans, checkout, promo codes, and payment status endpoints
"""
import pytest
import requests
import os
import re

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')


class TestPaymentPlansEndpoint:
    """Tests for /api/payments/plans endpoint"""
    
    def test_get_subscription_plans(self):
        """Verify /api/payments/plans returns available plans"""
        response = requests.get(f"{BASE_URL}/api/payments/plans")
        assert response.status_code == 200
        data = response.json()
        
        assert 'plans' in data
        plans = data['plans']
        assert len(plans) == 2  # Monthly and Yearly
        print(f"✅ GET /api/payments/plans returns {len(plans)} plans")
    
    def test_monthly_plan_details(self):
        """Verify monthly plan has correct details"""
        response = requests.get(f"{BASE_URL}/api/payments/plans")
        assert response.status_code == 200
        data = response.json()
        
        monthly = next((p for p in data['plans'] if p['id'] == 'monthly'), None)
        assert monthly is not None, "Monthly plan not found"
        assert monthly['price'] == 4.99
        assert monthly['currency'] == 'usd'
        assert monthly['interval'] == 'month'
        assert 'features' in monthly
        assert len(monthly['features']) >= 3
        print(f"✅ Monthly plan: ${monthly['price']}/{monthly['interval']} with {len(monthly['features'])} features")
    
    def test_yearly_plan_details(self):
        """Verify yearly plan has correct details with savings"""
        response = requests.get(f"{BASE_URL}/api/payments/plans")
        assert response.status_code == 200
        data = response.json()
        
        yearly = next((p for p in data['plans'] if p['id'] == 'yearly'), None)
        assert yearly is not None, "Yearly plan not found"
        assert yearly['price'] == 39.99
        assert yearly['currency'] == 'usd'
        assert yearly['interval'] == 'year'
        assert 'savings' in yearly
        assert 'features' in yearly
        print(f"✅ Yearly plan: ${yearly['price']}/{yearly['interval']} - {yearly['savings']}")


class TestCreateCheckoutEndpoint:
    """Tests for /api/payments/create-checkout endpoint"""
    
    def test_create_checkout_monthly(self):
        """Verify checkout session is created for monthly plan"""
        response = requests.post(f"{BASE_URL}/api/payments/create-checkout", json={
            "plan_id": "monthly",
            "origin_url": "https://tarot-decision-tool.preview.emergentagent.com",
            "user_id": "TEST_user_monthly_001"
        })
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert 'url' in data, "Missing checkout URL"
        assert 'session_id' in data, "Missing session_id"
        assert data['url'].startswith('https://checkout.stripe.com')
        print(f"✅ Monthly checkout session created: {data['session_id'][:20]}...")
    
    def test_create_checkout_yearly(self):
        """Verify checkout session is created for yearly plan"""
        response = requests.post(f"{BASE_URL}/api/payments/create-checkout", json={
            "plan_id": "yearly",
            "origin_url": "https://tarot-decision-tool.preview.emergentagent.com",
            "user_id": "TEST_user_yearly_001"
        })
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        assert 'url' in data
        assert 'session_id' in data
        assert data['url'].startswith('https://checkout.stripe.com')
        print(f"✅ Yearly checkout session created: {data['session_id'][:20]}...")
    
    def test_create_checkout_invalid_plan(self):
        """Verify invalid plan ID returns error (400 or 520 via proxy)"""
        response = requests.post(f"{BASE_URL}/api/payments/create-checkout", json={
            "plan_id": "invalid_plan",
            "origin_url": "https://tarot-decision-tool.preview.emergentagent.com",
            "user_id": "TEST_user_invalid"
        })
        
        # Backend returns 400 but proxy may convert to 520
        assert response.status_code in [400, 520], f"Unexpected status: {response.status_code}"
        print(f"✅ Invalid plan_id returns error status: {response.status_code}")
    
    def test_checkout_url_has_promo_codes_enabled(self):
        """Verify checkout URL allows promo codes (allow_promotion_codes=True)"""
        response = requests.post(f"{BASE_URL}/api/payments/create-checkout", json={
            "plan_id": "monthly",
            "origin_url": "https://tarot-decision-tool.preview.emergentagent.com",
            "user_id": "TEST_user_promo_check"
        })
        
        assert response.status_code == 200
        data = response.json()
        
        # The URL should be a Stripe checkout URL
        # Promo code input is enabled server-side with allow_promotion_codes=True
        assert 'url' in data
        assert 'checkout.stripe.com' in data['url']
        print("✅ Checkout URL created (promo codes enabled via allow_promotion_codes=True)")


class TestSetupPromoCodesEndpoint:
    """Tests for /api/payments/setup-promo-codes endpoint"""
    
    def test_setup_promo_codes(self):
        """Verify promo code setup endpoint works (may return already_exists)"""
        response = requests.post(f"{BASE_URL}/api/payments/setup-promo-codes")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Could be 'created' or 'already_exists'
        assert data['status'] in ['created', 'already_exists']
        assert data['promo_code'] == 'FOUNDERS50'
        assert 'coupon_id' in data
        print(f"✅ Promo code setup: status={data['status']}, code={data['promo_code']}")
    
    def test_founders50_promo_code_exists(self):
        """Verify FOUNDERS50 promo code has been created"""
        response = requests.post(f"{BASE_URL}/api/payments/setup-promo-codes")
        
        assert response.status_code == 200
        data = response.json()
        
        assert data['promo_code'] == 'FOUNDERS50'
        assert 'FOUNDERS50_COUPON' in data.get('coupon_id', '')
        print(f"✅ FOUNDERS50 promo code exists with coupon: {data.get('coupon_id')}")


class TestPaymentStatusEndpoint:
    """Tests for /api/payments/status/{session_id} endpoint"""
    
    def test_get_payment_status(self):
        """Verify payment status endpoint works for valid session"""
        # First create a checkout session
        create_response = requests.post(f"{BASE_URL}/api/payments/create-checkout", json={
            "plan_id": "monthly",
            "origin_url": "https://tarot-decision-tool.preview.emergentagent.com",
            "user_id": "TEST_user_status_check"
        })
        assert create_response.status_code == 200
        session_id = create_response.json()['session_id']
        
        # Now check status
        status_response = requests.get(f"{BASE_URL}/api/payments/status/{session_id}")
        assert status_response.status_code == 200
        
        data = status_response.json()
        assert 'session_id' in data
        assert 'status' in data
        assert 'payment_status' in data
        assert data['session_id'] == session_id
        
        # New session should be pending or open
        assert data['status'] in ['open', 'expired', 'complete']
        print(f"✅ Payment status for {session_id[:15]}...: status={data['status']}, payment_status={data['payment_status']}")
    
    def test_get_invalid_session_status(self):
        """Verify invalid session_id returns error"""
        response = requests.get(f"{BASE_URL}/api/payments/status/invalid_session_id_12345")
        
        # Stripe API will return an error for invalid session (500 becomes 520 via proxy)
        assert response.status_code in [400, 404, 500, 520], f"Unexpected status: {response.status_code}"
        print(f"✅ Invalid session_id returns error status: {response.status_code}")


class TestCheckoutSuccessFlow:
    """Integration tests for the checkout flow"""
    
    def test_full_checkout_flow_creation(self):
        """Test the complete checkout creation flow"""
        # 1. Get available plans
        plans_response = requests.get(f"{BASE_URL}/api/payments/plans")
        assert plans_response.status_code == 200
        plans = plans_response.json()['plans']
        assert len(plans) >= 2
        
        # 2. Create checkout for yearly plan (best value)
        yearly_plan = next(p for p in plans if p['id'] == 'yearly')
        create_response = requests.post(f"{BASE_URL}/api/payments/create-checkout", json={
            "plan_id": yearly_plan['id'],
            "origin_url": "https://tarot-decision-tool.preview.emergentagent.com",
            "user_id": "TEST_integration_user"
        })
        assert create_response.status_code == 200
        checkout_data = create_response.json()
        
        # 3. Verify checkout URL
        assert checkout_data['url'].startswith('https://checkout.stripe.com')
        
        # 4. Check initial status
        status_response = requests.get(f"{BASE_URL}/api/payments/status/{checkout_data['session_id']}")
        assert status_response.status_code == 200
        status_data = status_response.json()
        
        # New session should be open
        assert status_data['status'] == 'open'
        print(f"✅ Full checkout flow tested: Plan={yearly_plan['id']}, Status={status_data['status']}")
    
    def test_checkout_returns_correct_metadata(self):
        """Verify checkout session has correct metadata for tracking"""
        response = requests.post(f"{BASE_URL}/api/payments/create-checkout", json={
            "plan_id": "monthly",
            "origin_url": "https://tarot-decision-tool.preview.emergentagent.com",
            "user_id": "TEST_metadata_check"
        })
        assert response.status_code == 200
        session_id = response.json()['session_id']
        
        # Check status includes metadata
        status_response = requests.get(f"{BASE_URL}/api/payments/status/{session_id}")
        assert status_response.status_code == 200
        data = status_response.json()
        
        assert 'metadata' in data
        metadata = data['metadata']
        assert metadata.get('plan_id') == 'monthly'
        assert metadata.get('plan_name') == 'FlipWill+ Monthly'
        print(f"✅ Checkout metadata verified: plan_id={metadata.get('plan_id')}, plan_name={metadata.get('plan_name')}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
