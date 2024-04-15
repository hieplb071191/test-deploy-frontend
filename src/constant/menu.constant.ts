const manMenuItemsProps = [
    {
        title: 'Xem tất cả "Nam',
        url: 'product',
        params: {
            topic: 'Man',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Túi xách',
        url: 'product',
        params: {
            topic: 'Man',
            type: 'handBag',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Giày',
        url: 'product',
        params: {
            topic: 'Man',
            type: 'shoes',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Quần áo',
        url: 'product',
        params: {
            topic: 'Man',
            type: 'clothes',
            page: '1',
            perPage: '8',
        }
    },
]

const womanMenuItemsProps = [
    {
        title: 'Xem tất cả "Nữ',
        url: 'product',
        params: {
            topic: 'Man',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Túi xách',
        url: 'product',
        params: {
            topic: 'woman',
            type: 'handBag',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Giày',
        url: 'product',
        params: {
            topic: 'woman',
            type: 'shoes',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Quần áo',
        url: 'product',
        params: {
            topic: 'woman',
            type: 'clothes',
            page: '1',
            perPage: '8',
        }
    },
]

const notLoggedItems = [
    {
        title: 'Sign In',
        url: '/login'
    },
    {
        title: 'Sign up',
        url: '/signup'
    },
]

const logginItem = [
    {
        title: 'Logout',
        url: 'logout'
    },
]

export { manMenuItemsProps, womanMenuItemsProps, notLoggedItems, logginItem}