# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table futbol_match (
  id                        bigint auto_increment not null,
  stadium_id                bigint,
  match_date                datetime,
  constraint pk_futbol_match primary key (id))
;

create table player (
  id                        bigint auto_increment not null,
  futbol_match_id           bigint not null,
  name                      varchar(255),
  last_name                 varchar(255),
  email                     varchar(255),
  password                  varchar(255),
  admin                     tinyint(1) default 0,
  constraint pk_player primary key (id))
;

create table stadium (
  id                        bigint auto_increment not null,
  name                      varchar(255),
  address                   varchar(255),
  telephone                 varchar(255),
  constraint pk_stadium primary key (id))
;

alter table futbol_match add constraint fk_futbol_match_stadium_1 foreign key (stadium_id) references stadium (id) on delete restrict on update restrict;
create index ix_futbol_match_stadium_1 on futbol_match (stadium_id);
alter table player add constraint fk_player_futbol_match_2 foreign key (futbol_match_id) references futbol_match (id) on delete restrict on update restrict;
create index ix_player_futbol_match_2 on player (futbol_match_id);



# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table futbol_match;

drop table player;

drop table stadium;

SET FOREIGN_KEY_CHECKS=1;

