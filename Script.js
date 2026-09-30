function checkPassword() {
    const password = document.getElementById("password").value;
    const result = document.getElementById("result");
    const entropyText = document.getElementById("entropy");
    const feedback = document.getElementById("feedback");

    if (password.length === 0) {
        result.textContent = "Please enter a password.";
        entropyText.textContent = "";
        feedback.textContent = "";
        return;
    }

    // Security policy checks
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const hasMinimumLength = password.length >= 8;

    // Character pool size
    let poolSize = 0;

    if (hasLowercase) poolSize += 26;
    if (hasUppercase) poolSize += 26;
    if (hasNumber) poolSize += 10;
    if (hasSpecial) poolSize += 32;

    // Entropy calculation
    let entropy = 0;

    if (poolSize > 0) {
        entropy = password.length * Math.log2(poolSize);
    }

    entropyText.textContent =
        "Estimated Entropy: " + entropy.toFixed(2) + " bits";

    // Common/dictionary password check
    const commonPasswords = [
        "password",
        "password123",
        "123456",
        "12345678",
        "qwerty",
        "admin",
        "welcome",
        "letmein"
    ];

    const isCommon = commonPasswords.includes(password.toLowerCase());

    // Count policy rules
    let score = 0;

    if (hasMinimumLength) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Strength classification
    let strength;

    if (isCommon || score <= 2 || entropy < 28) {
        strength = "Weak";
    } else if (score === 3 || entropy < 45) {
        strength = "Moderate";
    } else if (score === 4 || entropy < 60) {
        strength = "Strong";
    } else {
        strength = "Exceptional";
    }

    result.textContent = "Password Strength: " + strength;

    // User feedback
    let suggestions = [];

    if (!hasMinimumLength) {
        suggestions.push("Use at least 8 characters.");
    }

    if (!hasUppercase) {
        suggestions.push("Add an uppercase letter.");
    }

    if (!hasLowercase) {
        suggestions.push("Add a lowercase letter.");
    }

    if (!hasNumber) {
        suggestions.push("Add a number.");
    }

    if (!hasSpecial) {
        suggestions.push("Add a special character.");
    }

    if (isCommon) {
        suggestions.push("Avoid common or easily guessed passwords.");
    }

    if (suggestions.length === 0) {
        feedback.textContent =
            "Good password! It meets the main security policy criteria.";
    } else {
        feedback.textContent =
            "Suggestions: " + suggestions.join(" ");
    }
          }
