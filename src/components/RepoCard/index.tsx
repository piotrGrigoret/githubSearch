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
import { SquareArrowOutUpRight } from 'lucide-react';

interface RepoCardProps {
    repo: GithubRepo;
}

export const RepoCard = ({ repo }: RepoCardProps) => {

    const formatDate = (dateString: string) => {

        return new Date(dateString).toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
       });
    };
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <h2 className="text-primary text-left text-3xl">
                        {repo.name}
                    </h2>
                   
                </CardTitle>
                <CardDescription className='h-6 truncate '>
                    <p className='text-left'>
                    {repo.description && <p className="mt-2 ">{repo.description}</p>}
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex gap-4'>
                   {repo.language && (
                        <span className="flex items-center gap-1">
                            <span className="w-3 h-3 rounded-full bg-gray-400 "></span>
                            {repo.language}
                        </span>
                    )}
                    <div className='text-muted-foreground text-sm flex items-center'>Updated: {formatDate(repo.updated_at)}</div>
                </div>    
            </CardContent>
            <CardFooter className="flex justify-between">
                <span className="flex items-center">
                    ⭐ {repo.stargazers_count}
                </span>
               
               <a   
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                > 
                    <Button variant='link' className='flex items-start'>
                    <SquareArrowOutUpRight /><div>GitHub</div>
                    </Button>
               </a>
            </CardFooter>
        </Card>
    )
}
