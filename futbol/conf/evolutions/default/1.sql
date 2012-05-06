# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table football_match (
  id                        bigint auto_increment not null,
  stadium_id                bigint,
  match_date                datetime,
  state                     integer,
  constraint ck_football_match_state check (state in (0,1,2,3)),
  constraint pk_football_match primary key (id))
;

create table player (
  id                        bigint auto_increment not null,
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


create table football_match_player (
  football_match_id              bigint not null,
  player_id                      bigint not null,
  constraint pk_football_match_player primary key (football_match_id, player_id))
;
alter table football_match add constraint fk_football_match_stadium_1 foreign key (stadium_id) references stadium (id) on delete restrict on update restrict;
create index ix_football_match_stadium_1 on football_match (stadium_id);



alter table football_match_player add constraint fk_football_match_player_foot_01 foreign key (football_match_id) references football_match (id) on delete restrict on update restrict;

alter table football_match_player add constraint fk_football_match_player_play_02 foreign key (player_id) references player (id) on delete restrict on update restrict;

# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table football_match;

drop table football_match_player;

drop table player;

drop table stadium;

SET FOREIGN_KEY_CHECKS=1;

