import { ChevronDownIcon, ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	BoxProps,
	Collapse,
	Container,
	Flex,
	Heading,
	Icon,
	IconButton,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Stack,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import * as React from 'react';

export const Header = () => {
	const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();

	return (
		<Box minH="60px">
			<Flex
				as={'header'}
				pos="fixed"
				top="0"
				w={'full'}
				minH={'60px'}
				boxShadow={'sm'}
				zIndex="999"
				justify={'center'}
				css={{
					backdropFilter: 'saturate(180%) blur(5px)',
					backgroundColor: useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)'),
				}}
			>
				<Container as={Flex} maxW={'7xl'} align={'center'}>
					<Flex
						flex={{ base: '0', md: 'auto' }}
						ml={{ base: -2 }}
						mr={{ base: 6, md: 0 }}
						display={{ base: 'flex', md: 'none' }}
					>
						<IconButton
							onClick={onToggle}
							icon={isMobileNavOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
							variant={'ghost'}
							size={'sm'}
							aria-label={'Toggle Navigation'}
						/>
					</Flex>

					<Flex flex={{ base: 1, md: 'auto' }} justify={{ base: 'start', md: 'start' }}>
						<NextLink href={'/'} passHref>
							<Stack as={'a'} direction={'row'} alignItems={'center'} spacing={{ base: 2, sm: 4 }}>
								{/* <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} /> */}
								<Heading as={'h1'} fontSize={'xl'} display={{ base: 'block', md: 'none' }}>
									OWL
								</Heading>
								<Heading as={'h1'} fontSize={'xl'} display={{ base: 'none', md: 'block' }}>
									Off Work Loh
								</Heading>
							</Stack>
						</NextLink>
					</Flex>

					<DesktopNav display={{ base: 'none', md: 'flex' }} />
				</Container>
			</Flex>
			<MobileNav isOpen={isMobileNavOpen} />
		</Box>
	);
};

export const DesktopNav = (props: BoxProps) => {
	const primaryLinkColor = useColorModeValue('gray.600', 'gray.200');
	const primaryLinkHoverColor = useColorModeValue('gray.800', 'white');
	const secondaryBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4} {...props}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<NextLink href={navItem.href!} passHref={true}>
								<Link
									p={2}
									fontSize={'sm'}
									fontWeight={500}
									color={primaryLinkColor}
									_hover={{
										textDecoration: 'none',
										color: primaryLinkHoverColor,
									}}
								>
									{navItem.label}
								</Link>
							</NextLink>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={secondaryBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
	return (
		<NextLink href={href!} passHref={true}>
			<Link
				role={'group'}
				display={'block'}
				p={2}
				rounded={'md'}
				_hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
			>
				<Stack direction={'row'} align={'center'}>
					<Box>
						<Text transition={'all .3s ease'} _groupHover={{ color: 'green.400' }} fontWeight={500}>
							{label}
						</Text>
						<Text fontSize={'sm'}>{subLabel}</Text>
					</Box>
					<Flex
						transition={'all .3s ease'}
						transform={'translateX(-10px)'}
						opacity={0}
						_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
						justify={'flex-end'}
						align={'center'}
						flex={1}
					>
						<Icon color={'green.400'} w={5} h={5} as={ChevronRightIcon} />
					</Flex>
				</Stack>
			</Link>
		</NextLink>
	);
};

interface MobileNavProps {
	isOpen: boolean;
}

const MobileNav = ({ isOpen }: MobileNavProps) => {
	const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)');

	if (!isOpen) return null;

	return (
		<Stack
			p={4}
			display={{ md: 'none' }}
			zIndex={9999}
			pos="fixed"
			top="60px"
			w={'full'}
			bg={'white'}
			minH={'calc(100vh - 60px)'}
			css={{
				backdropFilter: 'saturate(180%) blur(5px)',
				backgroundColor: bgColor,
			}}
		>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} />
			))}
		</Stack>
	);
};

const MobileNavItem = ({ href, children, label }: NavItem) => {
	const { isOpen, onToggle } = useDisclosure();

	const handleToggle = (e: React.SyntheticEvent) => {
		if (children) {
			e.preventDefault();
			onToggle();
		}
	};

	return (
		<Stack spacing={4} onClick={handleToggle}>
			<Flex
				py={2}
				as={Link}
				href={href ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}
			>
				<Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}
				>
					{children &&
						children.map((child) => (
							<NextLink href={child.href!} passHref={true} key={child.label}>
								<Link py={2}>{child.label}</Link>
							</NextLink>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
	{
		label: 'About Us',
		href: '/about-us',
	},
	{
		label: 'Community Structure',
		href: '/community-structure',
	},
	{
		label: 'Create Event',
		href: '/create-event',
	},
];
