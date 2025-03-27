'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from '@/components/NavigationLink';
import { useRouter } from '@/i18n/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import {
  RiSideBarLine as Menu,
  RiHomeLine,
  RiInformationLine,
  RiHotelLine,
  RiShoppingCartLine,
  RiUserLine,
  RiBarChart2Line,
  RiLogoutBoxLine
} from '@remixicon/react';

export default function Sidebar() {
  const t = useTranslations('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  // Updated SIDEBAR_ITEMS with additional routes for a complete dashboard.
  const SIDEBAR_ITEMS = [
    {
      name: t('Sidebar.overview'),
      icon: RiHomeLine,
      color: '#6366f1',
      href: '/dashboard/overview'
    },
    {
      name: t('Sidebar.sales'),
      icon: RiInformationLine,
      color: '#8B5CF6',
      href: '/dashboard/sales'
    },
    {
      name: t('Sidebar.createProduct'),
      icon: RiHotelLine,
      color: '#EC4899',
      href: '/dashboard/add-product'
    },
    {
      name: t('Sidebar.orders'),
      icon: RiShoppingCartLine,
      color: '#FBBF24',
      href: '/dashboard/orders'
    },
    {
      name: t('Sidebar.analytics'),
      icon: RiBarChart2Line,
      color: '#3B82F6',
      href: '/dashboard/analytics'
    }
  ];

  const handleLogout = () => {
    // Remove cookies
    Cookies.remove('isAuthenticated');
    Cookies.remove('authExpiry');
    Cookies.remove('token');

    // Show success message and redirect
    toast.success('Redirecting to Welcome...');
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <>
      <motion.div
        className={`relative z-10 transition-all duration-150 ease-in-out flex-shrink-0 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        }`}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
      >
        <div className="h-full bg-[#F8F9FA] bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1, ease: 'easeInOut' }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-[#E4E7EB] transition-colors max-w-fit"
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Menu size={24} />
                </TooltipTrigger>
                <TooltipContent align="center" avoidCollisions={true}>
                  {isSidebarOpen ? t('closeMenu') : t('openMenu')}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.button>

          {/* Scrollable menu */}
          <nav
            className="mt-8 flex-grow overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: 'calc(100vh - 200px)' }}
          >
            {SIDEBAR_ITEMS.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#E4E7EB] transition-colors mb-2"
                  whileHover={{ scale: 1.02 }}
                >
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: '20px' }}
                  />
                  <AnimatePresence>
                    {isSidebarOpen && (
                      <motion.span
                        className="ml-4 whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.1, delay: 0.1 }}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="mt-4 flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#E4E7EB] transition-colors"
          >
            <RiLogoutBoxLine
              size={20}
              style={{ minWidth: '20px', color: '#F87171' }}
            />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  className="ml-4 whitespace-nowrap"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
