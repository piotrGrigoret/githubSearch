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

    const { data: repos, isLoading, isFetching, error} = useGetUserReposQuery(
        { username, page, per_page: 20 },
        { 
            skip: !username,
            refetchOnMountOrArgChange: true
         }
    );
    const hasMore = repos?.length === 20; 
    useEffect(() => {
        if (inView && !isLoading && !isFetching && repos?.length && hasMore) {
        setPage((prev) => prev + 1);
        }
    }, [inView, isLoading, isFetching, repos?.length]);

    if (!username) {

        return (
            <div>
                <div className='bg-white rounded'>
                    <DotLottieReact
                        className='animation max-w-64 mx-auto'
                        src='/lottie/input.lottie'
                        loop
                        autoplay
                    />
                </div>
                <div className='pt-3'>Enter a username to view repositories.</div>
            </div>
            )
    }

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


    if (error) {
        console.log(error);
        return (
        <div className="text-center py-8">
            <div className="text-red-500 p-4 rounded-lg">
                <DotLottieReact
                    className='animation max-w-64 mx-auto'
                    src='/lottie/networkerror.lottie'
                    loop
                    autoplay
                />
                    
                {error instanceof Error 
                    ? error.message 
                    : 'An error occurred while loading repositories.'
                }
            </div>
        </div>
        );
    }

    if (!repos?.length) {
        return (
        <div className="text-center py-8 text-gray-500">
            <DotLottieReact
                    className='animation max-w-64 mx-auto'
                    src='/lottie/notFound.lottie'
                    loop
                    autoplay
                />
            Repositories not found.
        </div>
        );
    }
    return (
        <div className="grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">

            {repos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
            
            {/* Индикатор загрузки следующей страницы */}
            {isFetching && page > 1 && hasMore && (
                <div className="text-center py-4">
                    <DotLottieReact
                        className='animation max-w-64 mx-auto'
                        src='/lottie/loadGitHub.lottie'
                        loop
                        autoplay
                    />
                </div>
            )}

            {!hasMore && repos?.length > 0 && (
                <div className="col-span-full text-center py-4 text-gray-500">
                    Все репозитории загружены
                </div>
            )}
            
            <div ref={loadMoreRef} />
        </div>
    )
}
