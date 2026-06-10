jest.mock('@google/generative-ai');

const mockGenerateContent = jest.fn();
const mockGetGenerativeModel = jest.fn();

describe('AI Service Unit Tests', () => {
  beforeEach(() => {
    jest.resetModules();
    mockGenerateContent.mockReset();
    mockGetGenerativeModel.mockReset();

    mockGetGenerativeModel.mockReturnValue({
      generateContent: mockGenerateContent
    });

    const { GoogleGenerativeAI } = require('@google/generative-ai');
    (GoogleGenerativeAI as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: mockGetGenerativeModel
    }));
  });

  it('should return mock summary if GEMINI_API_KEY is not configured', async () => {
    // Mock env with no GEMINI_API_KEY
    jest.doMock('../config/env', () => ({
      env: {
        GEMINI_API_KEY: undefined,
        NODE_ENV: 'test',
        PORT: '5000',
        DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
        JWT_ACCESS_SECRET: 'test-access-secret-1234567890',
        JWT_REFRESH_SECRET: 'test-refresh-secret-1234567890'
      }
    }));

    const { generateProjectSummary } = require('../services/ai.service');
    const brief = 'Build a premium website for a law firm with contact forms and lawyer bios.';
    const result = await generateProjectSummary(brief);

    expect(result).toContain('[Mock AI Summary]');
    expect(mockGetGenerativeModel).not.toHaveBeenCalled();
  });

  it('should generate summary from API if GEMINI_API_KEY is configured', async () => {
    jest.doMock('../config/env', () => ({
      env: {
        GEMINI_API_KEY: 'mocked_gemini_api_key_nexus',
        NODE_ENV: 'test',
        PORT: '5000',
        DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
        JWT_ACCESS_SECRET: 'test-access-secret-1234567890',
        JWT_REFRESH_SECRET: 'test-refresh-secret-1234567890'
      }
    }));

    mockGenerateContent.mockResolvedValue({
      response: {
        text: () => 'The client requests a professional website design. Recommend Next.js and Tailwind. Feasible within 4 weeks.'
      }
    });

    const { generateProjectSummary } = require('../services/ai.service');
    const brief = 'Build a premium website for a law firm with contact forms and lawyer bios.';
    const result = await generateProjectSummary(brief);

    expect(result).toBe('The client requests a professional website design. Recommend Next.js and Tailwind. Feasible within 4 weeks.');
    expect(mockGetGenerativeModel).toHaveBeenCalledWith({ model: 'gemini-1.5-flash' });
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
  });

  it('should fall back gracefully if Gemini API throws an exception', async () => {
    jest.doMock('../config/env', () => ({
      env: {
        GEMINI_API_KEY: 'mocked_gemini_api_key_nexus',
        NODE_ENV: 'test',
        PORT: '5000',
        DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
        JWT_ACCESS_SECRET: 'test-access-secret-1234567890',
        JWT_REFRESH_SECRET: 'test-refresh-secret-1234567890'
      }
    }));

    mockGenerateContent.mockRejectedValue(new Error('API quota limit exceeded'));

    const { generateProjectSummary } = require('../services/ai.service');
    const brief = 'Build a premium website for a law firm with contact forms and lawyer bios.';
    const result = await generateProjectSummary(brief);

    expect(result).toContain('Failed to generate AI summary.');
    expect(result).toContain('Build a premium website for a law firm');
  });
});
