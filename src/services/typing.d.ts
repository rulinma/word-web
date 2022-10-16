declare namespace API {
  type WordInfo = {
    id?: number;
    word: string;
    rank?: number;
    star?: number;
    pronunciation?: string;
    say?: string;
    translate?: string[];
    images?: string[];
    image?: string;
  };

  type WordInfoRsp = {
    success: boolean;
    data: WordInfo[];
  };
}
