export class TTGError extends Error {
  name: string;
  stack?: string;
  [key: string]: any;
  message: string;
  codeNumber?: number;
  title?: string;

  constructor(message: string, name?: string, extraProperties?: any) {
    super(message);
    this.message = message;
    this.name = name || 'general';
  }
  // constructor(name: string, message: string, title?: string, code?: string, error?: any)
  // {
  //   super(message)
  //   this.message = message;
  //   this.title = title;
  //   this.code = code;

  //   // if (error) {
  //   //   Object.keys(error).forEach(key => {
  //   //     if (key !== "message" && key !== "title" && key !== code) {
  //   //       this[key] = error[key];
  //   //     }
  //   //   });
  //   // }
  // }
}
