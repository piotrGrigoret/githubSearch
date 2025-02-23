export interface GithubRepo {
    id: number
    name: string
    description: string | null
    html_url: string
    stargazers_count: number
    updated_at: string
    language: string | null;
    languages_url: string;
  }
  
  export interface SearchParams {
    username: string
    page: number
    per_page: number
  }
  
  export interface GithubError {
    message: string;
    documentation_url?: string;
    status?: number;
  }
  