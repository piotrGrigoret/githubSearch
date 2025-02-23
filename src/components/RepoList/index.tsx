import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetUserReposQuery } from '@/redux/api';
import { RepoCard } from '../RepoCard';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { GithubRepo } from '@/types/github';
interface RepoListProps {
    username: string;
}

export const RepoList = ({ username }: RepoListProps) => {
    const [page, setPage] = useState(1);
    const [allRepos, setAllRepos] = useState<GithubRepo[]>([]);
    const [previousUsername, setPreviousUsername] = useState(username);

    // Сброс при смене пользователя
    useEffect(() => {
        if (previousUsername !== username) {
            setPage(1);
            setAllRepos([]);
            setPreviousUsername(username);
        }
    }, [username, previousUsername]);

    const { ref: loadMoreRef, inView } = useInView({
        rootMargin: '100px',
        threshold: 0,
        delay: 100 
    });

    const { data: currentPageRepos, isLoading, isFetching, error } = useGetUserReposQuery(
        { username, page, per_page: 20 },
        { 
            skip: !username,
            refetchOnMountOrArgChange: true
        }
    );

    useEffect(() => {
        if (currentPageRepos) {
            setAllRepos(prev => {
                if (page === 1) return currentPageRepos;
                const newRepos = currentPageRepos.filter(
                    newRepo => !prev.some(existingRepo => existingRepo.id === newRepo.id)
                );
                return [...prev, ...newRepos];
            });
        }
    }, [currentPageRepos, page]);

    const handleLoadMore = useCallback(() => {
        if (inView && !isLoading && !isFetching && currentPageRepos?.length === 20) {
            setPage(prev => prev + 1);
        }
    }, [inView, isLoading, isFetching, currentPageRepos?.length]);

    useEffect(() => {
        handleLoadMore();
    }, [handleLoadMore]);

    if (!username) {
        return (
            <div>
                <div className='bg-white rounded'>
                    <DotLottieReact
                        className='animation max-w-87 mx-auto'
                        src='/lottie/input.lottie'
                        loop
                        autoplay
                    />
                </div>
                <div className='pt-3'>Enter a username to view repositories.</div>
            </div>
        );
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
        return (
            <div className="text-center py-8">
                <div className="text-red-500 p-4 rounded-lg">
                    <DotLottieReact
                        className='animation max-w-87 mx-auto'
                        src='/lottie/networkerror.lottie'
                        loop
                        autoplay
                    />
                    {error instanceof Error ? error.message : 'User not found'}
                </div>
            </div>
        );
    }

    if (!allRepos.length) {
        return (
            <div className="text-center py-8 text-gray-500">
                <DotLottieReact
                    className='animation max-w-87 mx-auto'
                    src='/lottie/notFound.lottie'
                    loop
                    autoplay
                />
                This user has no repositories.
            </div>
        );
    }

    const hasMore = currentPageRepos?.length === 20;

    return (
        <div className="grid grid-cols-1 gap-4 pt-10 lg:grid-cols-2 w-full">
            {allRepos.map(repo => (
                <RepoCard key={repo.id} repo={repo} />
            ))}
            
            {isFetching && page > 1 && (
                <div className="text-center py-4 col-span-full">
                    <DotLottieReact
                        className='animation max-w-64 mx-auto'
                        src='/lottie/loadGitHub.lottie'
                        loop
                        autoplay
                    />
                </div>
            )}

            {!hasMore && allRepos.length > 0 && (
                <div className="col-span-full text-center py-4 text-gray-500">
                    All repositories are loaded
                </div>
            )}
            
            {hasMore && <div ref={loadMoreRef} className="h-10 col-span-full" />}
        </div>
    );
};