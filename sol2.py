import requests
import unittest

def find_matching_closing_marker(scroll, start_pos):
    """Find the matching closing marker for an opening marker, handling nested markers."""
    nesting_level = 1
    pos = start_pos + 2  # Skip the opening "{*"
    
    while pos < len(scroll):
        open_pos = scroll.find("{*", pos)
        close_pos = scroll.find("*}", pos)
        
        # If no more closing markers, return -1
        if close_pos == -1:
            return -1
            
        # If we find an opening marker before the next closing marker
        if open_pos != -1 and open_pos < close_pos:
            nesting_level += 1
            pos = open_pos + 2
        # If we find a closing marker
        else:
            nesting_level -= 1
            if nesting_level == 0:
                return close_pos
            pos = close_pos + 2
    
    return -1  # No matching closing marker found

def extract_secrets(scroll):
    """Extract secrets from the scroll."""
    secrets = []  # List to store found secrets
    start = 0  
    while True:
        # Find opening marker "{*" from current position
        start = scroll.find("{*", start)
        if start == -1:  # No more opening markers found
            break
        
        # Find matching closing marker "*}" after opening marker
        end = find_matching_closing_marker(scroll, start)
        if end == -1:  # No closing marker found
            break        # This breaks out of the loop entirely
            
        # Extract and store the secret (text between markers)
        secrets.append(scroll[start + 2:end].strip())
        
        # Move search position past current secret
        start = end + 2
    return secrets

def fetch_scroll():
    """Fetch the scroll from the Great Eldorian Library."""
    url = "https://raw.githubusercontent.com/microsoft/CopilotAdventures/main/Data/scrolls.txt"
    response = requests.get(url)  # Send HTTP GET request
    if response.status_code == 200:  # Check if request was successful
        return response.text  # Return the content of the scroll
    else:
        print(f"No scroll, no secrets! : Status code {response.status_code}")
        return None  # Return None if request failed

def main():
    """Main function to fetch and process the scroll."""
    scroll_content = fetch_scroll()  # Get the scroll content
    if not scroll_content:  # Check if scroll content was retrieved
        return
    
    secrets = extract_secrets(scroll_content)  # Extract secrets from the scroll
    
    # Display extracted secrets
    print("Secrets of Eldoria:")
    for i, secret in enumerate(secrets, 1):
        print(f"{secret}")  

class TestSecretExtraction(unittest.TestCase):
    """Test cases for the secret extraction functionality."""
    
    def test_extract_single_secret(self):
        """Test extracting a single secret."""
        test_scroll = "This is a test with {*one secret*} inside."
        result = extract_secrets(test_scroll)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0], "one secret")
    
    def test_extract_multiple_secrets(self):
        """Test extracting multiple secrets."""
        test_scroll = "First {*secret one*} and then {*secret two*}."
        result = extract_secrets(test_scroll)
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0], "secret one")
        self.assertEqual(result[1], "secret two")
    
    def test_no_secrets(self):
        """Test with no secrets."""
        test_scroll = "No secrets here."
        result = extract_secrets(test_scroll)
        self.assertEqual(len(result), 0)
    
    def test_incomplete_markers(self):
        """Test with incomplete markers."""
        test_scroll = "Incomplete {* marker here."
        result = extract_secrets(test_scroll)
        self.assertEqual(len(result), 0)
    
    def test_nested_markers(self):
        """Test with nested markers - should only get outermost."""
        test_scroll = "Nested {*outer {*inner*} content*} test."
        result = extract_secrets(test_scroll)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0], "outer {*inner*} content")
    
    def test_empty_secret(self):
        """Test with empty secret."""
        test_scroll = "Empty secret {**} here."
        result = extract_secrets(test_scroll)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0], "")

if __name__ == "__main__":
    # Run tests if script is called with test argument
    import sys
    if len(sys.argv) > 1 and sys.argv[1] == "test":
        unittest.main(argv=['first-arg-is-ignored'])
    else:
        main()