
import math
import re

COMMON_PASSWORDS = {
    "password",
    "password123",
    "123456",
    "12345678",
    "qwerty",
    "admin",
    "welcome",
    "letmein"
}

def calculate_entropy(password):
    pool = 0

    if re.search(r"[a-z]", password):
        pool += 26
    if re.search(r"[A-Z]", password):
        pool += 26
    if re.search(r"[0-9]", password):
        pool += 10
    if re.search(r"[^A-Za-z0-9]", password):
        pool += 32

    if pool == 0:
        return 0

    return len(password) * math.log2(pool)


def check_password(password):
    length_ok = len(password) >= 8
    upper_ok = bool(re.search(r"[A-Z]", password))
    lower_ok = bool(re.search(r"[a-z]", password))
    number_ok = bool(re.search(r"[0-9]", password))
    special_ok = bool(re.search(r"[^A-Za-z0-9]", password))

    entropy = calculate_entropy(password)
    common = password.lower() in COMMON_PASSWORDS

    score = sum([
        length_ok,
        upper_ok,
        lower_ok,
        number_ok,
        special_ok
    ])

    if common or score <= 2 or entropy < 28:
        strength = "Weak"
    elif score == 3 or entropy < 45:
        strength = "Moderate"
    elif score == 4 or entropy < 60:
        strength = "Strong"
    else:
        strength = "Exceptional"

    print("\n--- Password Strength Checker ---")
    print("Length >= 8:", length_ok)
    print("Uppercase:", upper_ok)
    print("Lowercase:", lower_ok)
    print("Number:", number_ok)
    print("Special character:", special_ok)
    print("Common password:", common)
    print("Estimated entropy:", round(entropy, 2), "bits")
    print("Strength:", strength)

    print("\nFeedback:")

    if common:
        print("- Avoid common or easily guessed passwords.")
    if not length_ok:
        print("- Use at least 8 characters.")
    if not upper_ok:
        print("- Add an uppercase letter.")
    if not lower_ok:
        print("- Add a lowercase letter.")
    if not number_ok:
        print("- Add a number.")
    if not special_ok:
        print("- Add a special character.")

    if (
        length_ok
        and upper_ok
        and lower_ok
        and number_ok
        and special_ok
        and not common
    ):
        print("- Good password! It meets the main security policy criteria.")


password = input("Enter a password: ")
check_password(password)
