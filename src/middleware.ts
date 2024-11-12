import createMiddleware from 'next-intl/middleware';
import {routing} from '@/translations/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*']
};