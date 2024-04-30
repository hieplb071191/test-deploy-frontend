import style from '@/style/news-item.module.scss'
import clsx from 'clsx'
import { useRouter } from 'next/navigation';

export type NewsItemProps = {
    title: string;
    lstContent: string;
    imageTheme: string;
    id: string;
}

const NewsItem = (props: NewsItemProps) => {
    const router = useRouter()

    return (
        <div className="w-full p-3">
            <div className="w-full mb-4">
                <img src={props.imageTheme} alt={'image_theme_news'} className="w-full h-full object-cover" />   
            </div>
            <div className={clsx('w-full mb-4', style['title'])}>
                {props.title}
            </div>
            <div className={clsx(style['content'])}>
                {props.lstContent}
            </div>
            <div className={clsx(style['text-decorator'], 'mt-4')}>
                <a href={`/news-detail?${props.id}`} className={clsx('text-')}>xem thêm</a>
            </div>
        </div>
    )
}

export default NewsItem