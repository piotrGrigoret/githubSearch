import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetUserReposQuery } from '@/redux/api';
import { RepoCard } from '../RepoCard';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

interface RepoListProps {
    username: string;
}
export const RepoList = ({ username }: RepoListProps) => {
    const [page, setPage] = useState(1);

    const { ref: loadMoreRef, inView } = useInView({
        rootMargin: '100px'
    });

    const {
        data: repos,
        isLoading,
        isFetching,
        error
      } = useGetUserReposQuery(
        { username, page, per_page: 20 },
        { skip: !username }
    );

    // Эффект для загрузки следующей страницы
    useEffect(() => {
        if (inView && !isLoading && !isFetching && repos?.length) {
        setPage((prev) => prev + 1);
        }
    }, [inView, isLoading, isFetching, repos?.length]);

        // Если username пустой, ничего не показываем
    if (!username) {
        return <div>Input username to view their repositories</div>;
    }

        // Показываем индикатор первичной загрузки
    if (isLoading && page === 1) {
        return (
            <DotLottieReact
                className='animation max-w-64 mx-auto'
                src='/lottie/loadGitHub.lottie'
                loop
                autoplay
            />

        );
    }


        // Показываем ошибку
    if (error) {
        return (
        <div className="text-center py-8">
            <div className="text-red-500 bg-red-50 p-4 rounded-lg">
            {error instanceof Error 
                ? error.message 
                : 'Произошла ошибка при загрузке репозиториев'}
            </div>
        </div>
        );
    }

        // Если репозитории не найдены
    if (!repos?.length) {
        return (
        <div className="text-center py-8 text-gray-500">
            Репозитории не найдены
        </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">

            {/* Список репозиториев */}
            {repos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
            
            {/* Индикатор загрузки следующей страницы */}
            {isFetching && page > 1 && (
                <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto" />
                </div>
            )}
            
            {/* Элемент-триггер для бесконечной прокрутки */}
            <div ref={loadMoreRef} />
        </div>
    )
}
