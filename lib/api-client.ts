import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// We use an empty string for API_URL so requests go to relative path (e.g. /api/v1/auth/login).
// Next.js rewrites (in next.config.mjs) will intercept these and proxy them to the backend,
// completely bypassing CORS issues from the browser.
const API_URL = '';
const AI_API_BASE_URL = 'http://127.0.0.1:8000';

export const axiosClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

if (process.env.NODE_ENV === 'development') {
  console.log(`[axiosClient] Using API base URL: ${API_URL || 'RELATIVE_PROXY (/api/*)'}`);
}

// Request Interceptor: đính kèm token vào header
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user?.id) {
            config.headers['x-user-id'] = user.id;
          }
        }
      }
    } catch (error) {
      console.error('Error getting token from local storage', error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: xử lý chung các lỗi trả về
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Trả về thẳng data để gọi api cho ngắn gọn
    return response.data;
  },
  async (error: AxiosError) => {
    const requestConfig = error.config;

    // Xử lý các lỗi common như 401 Unauthorized (hết hạn token)
    if (error.response?.status === 401) {
      console.log('Token expired or unauthorized');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Custom event for session change could be dispatched here
        window.dispatchEvent(new Event('session-expired'));
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[axiosClient] Request failed: ${requestConfig?.method?.toUpperCase() || 'UNKNOWN'} ${requestConfig?.baseURL || ''}${requestConfig?.url || ''}`,
      );
      console.log(`[axiosClient] Axios error code: ${error.code || 'UNKNOWN'}`);
      console.log(`[axiosClient] HTTP Status: ${error.response?.status || 'NO_STATUS'}`);
      if (error.response?.data) {
        console.log(`[axiosClient] Response data:`, error.response.data);
      }
      if (error.response?.status === 401) {
        console.warn(`[axiosClient] ⚠️ 401 Unauthorized - Token may be expired or invalid. Clearing storage.`);
      }
      if (error.response?.status === 500) {
        console.error(`[axiosClient] ❌ 500 Server Error - Backend service returned error.`);
      }
    }

    // Ném ra lỗi với message từ backend nếu có
    const errorMessage = (error.response?.data as any)?.message || error.message || 'API Error';
    return Promise.reject(new Error(errorMessage));
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface LoginResponse {
  token: string;
  email: string;
  role: string;
  user_id: string;
}

export interface ArticleResponse {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  status: string;
  seoKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  cover_image_url: string;
  aiGenerated: boolean;
  author_name: string;
  views: number;
  scheduledAt: string | null;
  publishedAt: string | null;
  updatedAt: string;
}

export interface ArticleUpsertRequest {
  title: string;
  category: string;
  status?: string;
  summary?: string;
  content?: string;
  seoKeywords?: string[];
  metaTitle?: string;
  metaDescription?: string;
  coverImageUrl?: string;
  aiGenerated?: boolean;
  authorId?: string;
  authorName?: string;
  scheduledAt?: string;
}

export interface GenerateArticleRequest {
  title: string;
  category: string;
}

export interface GenerateArticleResponse {
  content: string;
  title: string;
  category: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  dateOfBirth?: string;
  heightCm?: number;
  weightKg?: number;
  avatarUrl?: string;
  createdAt: string;
}

export interface DashboardOverviewResponse {
  stats: {
    totalUsers: number;
    activeUsers: number;
    newRegistrations: number;
    onlineUsers: number;
    totalArticles: number;
  };
  onlineUsers: Array<{
    userId: string;
    email: string;
    status: string;
    location: string;
    ipAddress: string;
    userAgent: string;
    connectedAt: string;
  }>;
}

class ApiClient {
  // Compatibility methods for auth-context.tsx
  setToken(token: string) {
    // handled by localStorage & interceptor
  }

  clearToken() {
    // handled by localStorage
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return axiosClient.post('/api/v1/auth/login', credentials);
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    return axiosClient.post('/api/v1/auth/register', data);
  }

  // Article endpoints
  async getArticles(): Promise<ArticleResponse[]> {
    return axiosClient.get('/api/v1/articles');
  }

  async createArticle(data: ArticleUpsertRequest): Promise<ArticleResponse> {
    return axiosClient.post('/api/v1/articles', data);
  }

  async updateArticle(id: string, data: ArticleUpsertRequest): Promise<ArticleResponse> {
    return axiosClient.put(`/api/v1/articles/${id}`, data);
  }

  async publishArticle(id: string): Promise<ArticleResponse> {
    return axiosClient.put(`/api/v1/articles/${id}/publish`);
  }

  async generateArticleWithAI(request: GenerateArticleRequest): Promise<GenerateArticleResponse> {
    const response = await axios.post(`${AI_API_BASE_URL}/ai/generate-article`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }

  // User Management endpoints
  async getUsers(): Promise<UserResponse[]> {
    return axiosClient.get('/api/v1/users');
  }

  async changeUserRole(userId: string, role: string): Promise<UserResponse> {
    return axiosClient.put(`/api/v1/users/${userId}/role`, { role });
  }

  // Dashboard endpoints
  async getDashboardOverview(): Promise<DashboardOverviewResponse> {
    return axiosClient.get('/api/v1/dashboard/overview');
  }
}

export const apiClient = new ApiClient();

