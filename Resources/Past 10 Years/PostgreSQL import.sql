DROP TABLE IF EXISTS population;

-- Create the table
CREATE TABLE population(
	"Series Name" VARCHAR,
	"Series Code" VARCHAR,
	"Country Name" VARCHAR,
	"Country Code" VARCHAR,
	"2013" BIGINT,
	"2014" BIGINT,
	"2015" BIGINT,
	"2016" BIGINT,
	"2017" BIGINT,
	"2018" BIGINT,
	"2019" BIGINT,
	"2020" BIGINT,
	"2021" BIGINT,
	"2022" BIGINT
);

COPY population("Series Name", "Series Code", "Country Name", "Country Code", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022")
-- this file path is mine - just find the file in your file explorer and copy your computer's path to it to replace this
FROM 'D:\Data Course\GitHub Repository\PopulationVisualizationStation\Resources\Past 10 Years\5f7abe17-be9b-4011-940d-2af69fe8ccb7_Data.csv'
DELIMITER ','
CSV HEADER;

-- references to column names for this table (at least within postgres, I'm not yet sure about JS) need to use quotes and correct capitalization
	-- https://stackoverflow.com/questions/33506606/create-table-with-multiple-words-in-a-single-column

SELECT * FROM population