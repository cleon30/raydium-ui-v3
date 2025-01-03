import { Box, ColorMode, SimpleGrid, Text, VStack, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import SwapPageThumbnailIcon from '@/icons/pageNavigation/SwapPageThumbnailIcon'
import { colors } from '@/theme/cssVariables'
import { shrinkToValue } from '@/utils/shrinkToValue'
import { useTranslation } from 'react-i18next'

/** only used is Mobile */
export function MobileBottomNavbar() {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'
  const { pathname } = useRouter()
  const swapHref = '/swap'
  const isSwapActive = pathname === swapHref

  return (
    <SimpleGrid
      gridAutoFlow={'column'}
      gridAutoColumns={'1fr'}
      placeItems={'center'}
      height={'54px'}
      py={2}
      bg={colors.backgroundLight}
      borderTop={isLight ? `1px solid rgba(171, 196, 255, 0.2)` : `1px solid transparent`}
    >
      <BottomNavbarItem
        href={swapHref}
        text={t('swap.title')}
        icon={(colorMode) => <SwapPageThumbnailIcon colorMode={colorMode} isActive={isSwapActive} />}
        isActive={isSwapActive}
      />
    </SimpleGrid>
  )
}

function BottomNavbarItem({
  text,
  href,
  isActive,
  icon
}: {
  text: string
  href?: string
  isActive?: boolean
  icon?: ReactNode | ((colorMode: ColorMode) => ReactNode)
}) {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const content = (
    <VStack spacing={0}>
      <Box>{shrinkToValue(icon, [colorMode])}</Box>
      <Text
        color={isActive ? (isDark ? colors.textPrimary : colors.secondary) : colors.textSecondary}
        fontSize="xs"
        fontWeight={isActive ? 500 : 400}
      >
        {text}
      </Text>
    </VStack>
  )
  return href ? (
    <Link href={href}>
      <Box>{content}</Box>
    </Link>
  ) : (
    content
  )
}
