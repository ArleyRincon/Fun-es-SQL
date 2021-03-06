/**
Arley Rincon - 30/03/2018
**/
CREATE FUNCTION [dbo].[NumeroEndereco](@ENDERECO VARCHAR(8000))
RETURNS VARCHAR(50)
WITH EXECUTE AS CALLER  
AS  
BEGIN
      DECLARE
      @NR_CHAR     INT,
      @COUNT       INT, 
      @INI         INT,
      @CHAR        VARCHAR(1),
      @NUME        VARCHAR(20),
      @CAMPO       VARCHAR(100)

	  SET @NR_CHAR = LEN(@ENDERECO)
	  SET @CAMPO   = @ENDERECO
	  SET @INI     = 0
	  SET @NUME    = ''

      WHILE 
			@INI <= @NR_CHAR
      BEGIN
			SET @CHAR = SUBSTRING(@ENDERECO ,@INI,1)
			IF (ISNUMERIC(@CHAR))> 0
			BEGIN
				IF NOT @CHAR = ','
				BEGIN
					IF @COUNT+1 < @INI
					BEGIN
						SET @NUME = @NUME + '-'
					END
				SET @NUME = @NUME + @CHAR
				SET @COUNT = @INI
				END
			END     
      SET @INI = @INI+1;
      END
	  SET @INI = CHARINDEX('-', @NUME)-1;
	RETURN(LEFT(@NUME,@INI))
END;

