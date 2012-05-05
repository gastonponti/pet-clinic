package models;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.Constraint;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;


import com.avaje.ebean.*;

@Entity
public class Match extends Model {
	
	@Id
	public Long id;

	@OneToOne
	public Stadium stadium;
	
	@OneToMany
	public List<Player> players;

	@Formats.DateTime(pattern="yyyy-MM-dd HH:mm")
	public Date date;
	
}
