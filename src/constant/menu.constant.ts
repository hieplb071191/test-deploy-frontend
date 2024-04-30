const manMenuItemsProps = [
    {
        title: 'Xem tất cả',
        url: 'product',
        params: {
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Túi xách',
        url: 'product',
        params: {

            type: 'handBag',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Giày',
        url: 'product',
        params: {
            type: 'shoes',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Quần áo',
        url: 'product',
        params: {
            type: 'clothes',
            page: '1',
            perPage: '8',
        }
    },
    {
        title: '- Phụ kiện',
        url: 'product',
        params: {
            type: 'accessory',
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

export { manMenuItemsProps, notLoggedItems, logginItem}