import { HttpInterceptorFn } from '@angular/common/http';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  // יצירת Headers חדשים עם ה-Token
  let headers = req.headers;
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  
  const clonedReq = req.clone({ headers });

  return next(clonedReq);
};
