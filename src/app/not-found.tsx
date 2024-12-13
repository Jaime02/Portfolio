import BaseLayout from "@/components/layouts/BaseLayout";
import {routing} from '@/translations/routing';

export default function NotFound() {
  return (
    <BaseLayout locale={routing.defaultLocale}>
      <p>404: locale: {routing.defaultLocale}</p>
    </BaseLayout>
  );
}