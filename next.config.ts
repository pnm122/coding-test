import type { NextConfig } from "next";
import UnpluginIcons from 'unplugin-icons/webpack';

const nextConfig: NextConfig = {
  webpack(config) {
		config.plugins.push(
			UnpluginIcons({
				compiler: 'jsx',
				jsx: 'react',
				autoInstall: true
			})
		)

		return config
	},
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pets',
        permanent: true
      }
    ]
  },
};

export default nextConfig;
