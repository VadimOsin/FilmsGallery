create table public.usermeta
(
    id           serial
        primary key,
    name         varchar,
    surname      varchar,
    img varchar,
    user_meta_id integer
        references public."user"
);