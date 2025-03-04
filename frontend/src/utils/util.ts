type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

function validateSignupInput(username: string, password: string, confirmPassword: string): ValidationResult {
  const errors: string[] = [];

  if (username.length < 3) {
    errors.push("Username must have at least 3 characters.");
  }
  if (username.length > 10) {
    errors.push("Username must have at most 10 characters.");
  }
  if (password.length < 8) {
    errors.push("Password must have at least 8 characters.");
  }
  if (password.length > 20) {
    errors.push("Password must have at most 20 characters.");
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()]/.test(password);
  if (!hasUpperCase) {
    errors.push("Password must include at least one uppercase letter.");
  }
  if (!hasLowerCase) {
    errors.push("Password must include at least one lowercase letter.");
  }
  if (!hasNumber) {
    errors.push("Password must include at least one number.");
  }
  if (!hasSpecialChar) {
    errors.push("Password must include at least one special character (!@#$%^&*()).");
  }
  if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

function validateSigninInput(username: string, password: string): ValidationResult {
  const errors: string[] = [];
  if (!username || username.length < 3 || username.length > 10) {
    errors.push("Username is incorrect.");
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()]/.test(password);
  if (!password || password.length < 8 || password.length > 20) {
    errors.push("Password is incorrect.");
  } else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
    errors.push("Password is incorrect.");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}

function validateContentPost(type: string, link: string, title: string): ValidationResult {
  const errors: string[] = [];
  const validTypes = ['Other', 'Tweet', 'YouTube'];
  if (!validTypes.includes(type)) {
    errors.push('Type can only be: Tweet/YouTube/Other');
  }
  try {
    const url = new URL(link);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      errors.push('Please provide a valid URL starting with http:// or https://');
    }
    if (type === 'YouTube') {
      const videoIdMatch = link.match(/v=([^&]+)/) || link.match(/\/embed\/([^/?]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (!videoId && !link.includes('youtube.com')) {
        errors.push('Not a valid YouTube link, try with Other type?');
      }
    } else if (type === 'Tweet') {
      const embedUrl = link.replace('x.com', 'twitter.com');
      if (!embedUrl.match(/twitter\.com\/\w+\/status\/\d+/)) {
        errors.push('Not a valid Twitter/X link, try with Other type?');
      }
    }
  } catch {
    errors.push('Please provide a valid URL starting with http:// or https://');
  }

  if (title.length < 3) {
    errors.push('Title should be of at least 3 characters');
  }
  if (title.length > 200) {
    errors.push('Title should be of at most 200 characters');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}




export {
  validateSignupInput,
  validateSigninInput,
  validateContentPost
};