export type ReMessageList = Partial<{
  errorCode: string;
  message: string;
  messageLevel: string;
}>;

export interface OperationResult {
  operationResultCode: string;
  reMessageList: ReMessageList[];
  resultCode: string;
  successResult: boolean;
}

export interface GenericError {
  errors: string[];
  message: string;
  ruleMessages: ReMessageList[];
  status: string;
}

export interface GenericResponse<T = unknown> {
  data: T;
  operationResult: OperationResult;
  successResult: boolean;
}
