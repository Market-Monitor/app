export type ActionReturnType =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };
