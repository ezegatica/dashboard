export interface FileContent {
    filename: string;
    mtime: string;
    contentType: string;
    size: number;
    isDirectory: boolean;
    meta: {
      width: number;
      height: number;
      duration: number;
    };
  }
  
 export interface Files {
    contents: FileContent[];
  }