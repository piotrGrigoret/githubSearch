import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { GithubRepo } from '@/types/github';

interface RepoCardProps {
    repo: GithubRepo;
}

export const RepoCard = ({ repo }: RepoCardProps) => {

    const formatDate = (dateString: string) => {

        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
       });
    };
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>
                <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                >
                        {repo.name}
                </a>
                </CardTitle>
                <CardDescription>
                    {repo.description && <p className="mt-2 text-gray-600">{repo.description}</p>}    
                </CardDescription>
            </CardHeader>
            <CardContent>
                <span className="flex items-center">
                    ⭐ {repo.stargazers_count}
                </span>
                <span>
                    Обновлено: {formatDate(repo.updated_at)}
                </span>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Deploy</Button>
            </CardFooter>
        </Card>
    )
}
