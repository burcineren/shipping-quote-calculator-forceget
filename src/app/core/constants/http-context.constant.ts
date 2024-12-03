import { HttpContextToken } from '@angular/common/http';

export const AUTO_ERROR_HANDLING_HTTP_CONTEXT = new HttpContextToken(() => false);
