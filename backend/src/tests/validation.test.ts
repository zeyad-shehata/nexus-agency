import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  projectSubmitSchema,
  contactRequestSchema,
  reviewSubmitSchema,
  portfolioSchema,
  serviceSchema,
  blogSchema
} from '../utils/validation';

describe('Validation Schemas Unit Tests', () => {
  
  describe('registerSchema', () => {
    it('should pass on valid inputs', () => {
      const valid = { name: 'Sarah Connor', email: 'sarah@skynet.com', password: 'Secure123', phone: '+123456789' };
      const res = registerSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('should reject short name', () => {
      const invalid = { name: 'A', email: 'sarah@skynet.com', password: 'securePass123' };
      const res = registerSchema.safeParse(invalid);
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.errors[0].message).toContain('Name must be at least 2 characters');
      }
    });

    it('should reject invalid email', () => {
      const invalid = { name: 'Sarah Connor', email: 'not-an-email', password: 'securePass123' };
      const res = registerSchema.safeParse(invalid);
      expect(res.success).toBe(false);
    });

    it('should reject short password', () => {
      const invalid = { name: 'Sarah Connor', email: 'sarah@skynet.com', password: '12345' };
      const res = registerSchema.safeParse(invalid);
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.errors[0].message).toContain('Password must be at least 8 characters');
      }
    });
  });

  describe('loginSchema', () => {
    it('should pass on valid credentials', () => {
      const valid = { email: 'user@nexus.agency', password: 'MyPassword1' };
      const res = loginSchema.safeParse(valid);
      expect(res.success).toBe(true);
    });

    it('should reject empty password', () => {
      const invalid = { email: 'user@nexus.agency', password: '' };
      const res = loginSchema.safeParse(invalid);
      expect(res.success).toBe(false);
    });
  });

  describe('forgotPasswordSchema', () => {
    it('should validate email format', () => {
      expect(forgotPasswordSchema.safeParse({ email: 'valid@nexus.agency' }).success).toBe(true);
      expect(forgotPasswordSchema.safeParse({ email: 'invalid-email' }).success).toBe(false);
    });
  });

  describe('resetPasswordSchema', () => {
    it('should require non-empty token and valid password length', () => {
      const valid = { token: 'reset-token-abc', password: 'NewSecure1' };
      expect(resetPasswordSchema.safeParse(valid).success).toBe(true);

      const missingToken = { token: '', password: 'NewSecure1' };
      expect(resetPasswordSchema.safeParse(missingToken).success).toBe(false);

      const shortPass = { token: 'token', password: '123' };
      expect(resetPasswordSchema.safeParse(shortPass).success).toBe(false);
    });
  });

  describe('projectSubmitSchema', () => {
    it('should validate complete project brief details', () => {
      const valid = {
        title: 'New Web Portal',
        description: 'This is a long description describing the scope of the project.',
        budget: '$5,000 — $10,000',
        timeline: '1 Month'
      };
      expect(projectSubmitSchema.safeParse(valid).success).toBe(true);
    });

    it('should reject short description', () => {
      const invalid = {
        title: 'Web',
        description: 'Too short',
        budget: '$1k',
        timeline: '1mo'
      };
      const res = projectSubmitSchema.safeParse(invalid);
      expect(res.success).toBe(false);
      if (!res.success) {
        expect(res.error.errors.some(e => e.path.includes('description'))).toBe(true);
      }
    });
  });

  describe('contactRequestSchema', () => {
    it('should validate form submissions', () => {
      const valid = {
        name: 'Alex Mercer',
        email: 'alex@mercer.com',
        subject: 'General Inquiry',
        message: 'This is a detailed message inquiring about custom pricing options.'
      };
      expect(contactRequestSchema.safeParse(valid).success).toBe(true);
    });

    it('should reject missing fields or short messages', () => {
      const invalid = {
        name: 'Alex',
        email: 'alex@mercer.com',
        subject: 'Hi',
        message: 'Short'
      };
      expect(contactRequestSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe('reviewSubmitSchema', () => {
    it('should pass on ratings 1-5 and substantial comments', () => {
      expect(reviewSubmitSchema.safeParse({ rating: 5, comment: 'Excellent services!' }).success).toBe(true);
      expect(reviewSubmitSchema.safeParse({ rating: 6, comment: 'Excellent' }).success).toBe(false);
      expect(reviewSubmitSchema.safeParse({ rating: 0, comment: 'Excellent' }).success).toBe(false);
      expect(reviewSubmitSchema.safeParse({ rating: 4.5, comment: 'Excellent' }).success).toBe(false); // floats not allowed
    });
  });

  describe('portfolioSchema', () => {
    it('should validate portfolio metadata payload', () => {
      const valid = {
        title: 'Quantum Project',
        description: 'A cutting-edge implementation case study.',
        coverImage: 'https://images.unsplash.com/photo-1',
        technologies: ['React', 'TypeScript'],
        category: 'Web App'
      };
      expect(portfolioSchema.safeParse(valid).success).toBe(true);
    });
  });

  describe('serviceSchema', () => {
    it('should enforce startingPrice positive rule', () => {
      const valid = { title: 'SEO Package', description: 'Monthly search optimization plan.', startingPrice: 499, icon: '📈' };
      expect(serviceSchema.safeParse(valid).success).toBe(true);

      const invalid = { title: 'SEO Package', description: 'Monthly search optimization plan.', startingPrice: -10, icon: '📈' };
      expect(serviceSchema.safeParse(invalid).success).toBe(false);
    });
  });

  describe('blogSchema', () => {
    it('should enforce minimum title length and coverImage format', () => {
      const valid = { title: 'How to Scale Node.js', content: 'Detailed contents of standard length exceeding 20 chars.', coverImage: 'https://cdn.nexus/img.png' };
      expect(blogSchema.safeParse(valid).success).toBe(true);
    });
  });
});
