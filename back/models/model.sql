

CREATE TABLE public.film (
                             id serial primary key,
                             nameru varchar,
                             nameen varchar,
                             nameoriginal varchar not null,
                             posterurlpreview varchar not null,
                             descriptions varchar not null,
                             ratingkinopoisk varchar not null,
                             year integer not null,
                             type varchar not null,
                             ratingagelimits varchar,
                             filmlength integer not null,
                             countries VARCHAR[],
                             genres VARCHAR[]
);
