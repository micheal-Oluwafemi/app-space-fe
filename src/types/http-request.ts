export interface PostRequestProps {
  url: string;
  setState?: (state: boolean) => void;
  body: any;
  errorMessage?: string;
}

export interface GetRequestProps {
  url: string;
  setState?: (state: boolean) => void;
  errorMessage?: string;
}
