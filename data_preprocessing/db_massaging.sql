update  country_ref set flag_source = (select flag_source from flags_ref where country = lower(country_ref.country_name));
update  country_ref set flag_image = (select flag_image from flags_ref where replace(country,'-',' ') = lower(country_ref.country_name));
select replace(country,'-',' ') from flags_ref where country = lower(country_ref.country_name);

CREATE TABLE IF NOT EXISTS "olympics_raw" (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
"City" TEXT,
  "Edition" TEXT,
  "Sport" TEXT,
  "Discipline" TEXT,
  "Athlete" TEXT,
  "NOC" TEXT,
  "Gender" TEXT,
  "Event" TEXT,
  "Event_gender" TEXT,
  "Medal" TEXT,
  'country_id' INTEGER,
  FOREIGN KEY(country_id) REFERENCES country_ref(id)
);
CREATE TABLE IF NOT EXISTS "flags_ref" (
"country" TEXT,
  "flag_source" TEXT,
  "flag_image" TEXT
);
CREATE TABLE IF NOT EXISTS "country_ref" ( id integer primary key autoincrement, code text, country_name text, flag_source text, flag_image text);
CREATE TABLE sqlite_sequence(name,seq);

insert into olympics_raw(city, `Edition`,`Sport`,`Discipline`,`Athlete`,`NOC`,`Gender`,`Event`,`Event_gender`,`Medal`) 
select * from olympics_old;

update olympics_raw set country_id = (select id from country_ref where olympics_raw.NOC = country_ref.code);

 select country_id, medal,count(id) from olympics_raw group by country_id, Medal;