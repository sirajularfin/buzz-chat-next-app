import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use '@/styles/theme.scss' as *;`,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
