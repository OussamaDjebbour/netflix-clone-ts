import { useInfiniteQuery } from '@tanstack/react-query';

interface Project {
  id: number;
  name: string;
}

interface ProjectsResponse {
  items: Project[];
  nextCursor: number | null;
}

const fetchProjects = async ({
  pageParam = 1,
}: {
  pageParam?: number | undefined;
}): Promise<ProjectsResponse> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const response = await fetch(
    // `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
  );
  //   const response = await fetch(`/api/projects?cursor=${pageParam}`);
  console.log(await response.json());
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const ProjectsList: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<ProjectsResponse, Error>({
    queryKey: ['projects'],
    // queryFn: ({ pageParam }: { pageParam: number | undefined }) =>
    //   fetchProjects({ pageParam }),
    queryFn: async ({ pageParam }: { pageParam: unknown }) =>
      fetchProjects({ pageParam: pageParam as number | undefined }),
    getNextPageParam: (lastPage) => lastPage.nextCursor, // Assuming nextCursor is the next page parameter
    initialPageParam: 0, // Assuming the initial page parameter is 0
  });

  if (isError) {
    return <div className="text-white">Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.items.map((project) => (
            <div key={project.id}>{project.name}</div>
          ))}
        </div>
      ))}
      <div>
        {isFetchingNextPage ? (
          <span>Loading more...</span>
        ) : hasNextPage ? (
          <button onClick={() => fetchNextPage()}>Load More</button>
        ) : (
          <span>No more projects</span>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;
