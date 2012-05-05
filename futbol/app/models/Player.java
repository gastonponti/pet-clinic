package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.Constraint;

import play.db.ebean.*;
import play.data.format.*;
import play.data.validation.*;


import com.avaje.ebean.*;


@Entity
public class Player extends Model {

	@Id
	public Long id;

	public String name;
	
	public String lastName;
	
	@Constraints.Required
	@Constraints.Email
	@Formats.NonEmpty
	public String email;
	
    @Constraints.Required
    public String password;
	
	public boolean admin;
	
    // -- Queries
    
    public static Model.Finder<String,Player> find = new Model.Finder(String.class, Player.class);
    
    /**
     * Retrieve all users.
     */
    public static List<Player> findAll() {
        return find.all();
    }

	
	
}
