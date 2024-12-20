import React from 'react';
import { useParams } from 'react-router-dom';
import { MEDIA_TYPES } from '../../constants';
import { DetailsProps } from '../../types/tmdb';

const Details: React.FC<DetailsProps> = ({
  genres,
  rating,
  releaseDate,
  runtime,
  firstEpisode,
  lastEpisode,
  numberOfSeasons,
  seasons,
}) => {
  const { mediaType } = useParams();

  return (
    <div className="leading-relaxed">
      <h2 className="mb-2 text-xl font-bold min-[600px]:text-2xl lg:text-[1.6rem]">
        Details
      </h2>
      <ul className="flex flex-col gap-1 text-base text-[#D3D3D3] min-[600px]:text-lg">
        <li>
          <span className="font-bold">Genres:</span>{' '}
          {genres.map((genre) => genre.name).join(', ')}
        </li>
        <li>
          <span className="font-bold">Rating:</span> {rating.toPrecision(2)}/10
        </li>
        <li>
          {mediaType === 'movie' ? (
            <p>
              <span className="font-bold">Release Date: </span>
              {releaseDate}
            </p>
          ) : (
            <>
              <p>
                <span className="font-bold">First episode Release: </span>
                {firstEpisode}
              </p>
              <p className="mt-1">
                <span className="font-bold">Last episode Release: </span>
                {lastEpisode}
              </p>
            </>
          )}
        </li>
        <li>
          {mediaType === MEDIA_TYPES.MOVIE ? (
            <p>
              <span className="font-bold">Runtime: </span>
              {runtime} minutes
            </p>
          ) : (
            <>
              <p>
                <span className="font-bold">Number of Seasons: </span>
                {numberOfSeasons}
              </p>
              <div className="mt-1 gap-2 lg:flex">
                <span className="mb-1 inline-block font-bold">Seasons: </span>
                <div className="gap-1 pl-8 min-[580px]:grid min-[580px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 lg:gap-x-10">
                  {seasons?.map((season, index, arr) =>
                    season?.name !== 'Specials' ? (
                      <div key={index}>
                        <span className="font-bold">{season.name}: </span>
                        <span className="text-[#c4c4c4]">
                          {season.episode_count} episodes
                          {arr.length - 1 !== index ? ', ' : '.'}
                        </span>
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Details;
