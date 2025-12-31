
export enum View {
  IMAGE_GEN = 'IMAGE_GEN',
  VIDEO_SEARCH = 'VIDEO_SEARCH',
  VIDEO_EDITOR = 'VIDEO_EDITOR',
  SETTINGS = 'SETTINGS'
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface StockVideo {
  id: number;
  url: string;
  image: string;
  duration: number;
  user: {
    name: string;
    url: string;
  };
  video_files: {
    link: string;
    quality: string;
    width: number;
    height: number;
  }[];
}

export interface ProjectAsset {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  name: string;
  file?: File;
}
