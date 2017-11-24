CREATE TABLE rank (
 id serial primary key,
 time numeric,
 username varchar(32),
 ipaddr   varchar(16),
 country  varchar(32),
 city     varchar(32)
);
