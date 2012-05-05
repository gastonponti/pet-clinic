package models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.Constraint;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;


import com.avaje.ebean.*;

@Entity
public class Stadium extends Model {

	@Id
	public Long id;

	@Constraints.Required
	public String name;
	
	public String address;
	
	public String telephone;
	
}
